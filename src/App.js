import { useRef, useEffect, useState } from "react";
import { Modal } from "react-responsive-modal";
import 'react-responsive-modal/styles.css';
import { palabras } from "./utils/palabras";
import { successGifs, failGifs } from "./utils/list";

export default function App() {
  const [secretWordIndex, setSecretWordIndex] = useState(0);
  const [secretWord, setSecretWord] = useState("");
  const [word, setWord] = useState("");
  const [tries, setTries] = useState(["", "", "", "", ""]);
  const [tryNumber, setTryNumber] = useState(0);
  const [update, setUpdate] = useState(false);
  const [status, setStatus] = useState("");
  const [modalOpen, setModalOpen] = useState(false)
  const [juego, setJuego] = useState("Juego")

  const inputRef = useRef(null);

  useEffect(() => {
    const index = Math.floor(Math.random() * palabras.length);
    setSecretWordIndex(index);
  }, [update]);

  useEffect(() => {
    const newSecretWord = palabras[secretWordIndex]
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
    setSecretWord(newSecretWord);
    inputRef.current.focus();
  }, [secretWordIndex]);

  const sendWord = () => {
    setTryNumber(tryNumber + 1);
    const newTries = tries;
    newTries[tryNumber] = word;
    if (word === secretWord) {
      setStatus("success")
      setModalOpen(true)
    } else if (tryNumber === 4) {
      setStatus("fail")
      setModalOpen(true)
    } else {
      setTries(newTries);
    }
    setWord("");
    inputRef.current.focus();
  };

  const getGifUrl = status => {
    let url = "/gifs/";
    if (status === "success") {
      const index = Math.floor(Math.random() * successGifs.length)
      url += successGifs[index]
    } else {
      const index = Math.floor(Math.random() * failGifs.length)
      url += failGifs[index]
    }
    return url
  }

  const reset = () => {
    setTryNumber(0);
    setTries(["", "", "", "", ""]);
    setWord("");
    setUpdate(!update)
    setModalOpen(false)
    setStatus("")
    inputRef.current.focus();
  }

  return (
    <div className="flex flex-col justify-between items-center min-h-screen">
      <div
        onClick={(e) => {
          console.log(e.key);
          if (e.key === "enter") return alert("hola");
        }}
        className="flex flex-col items-center p-4 gap-8"
      >
        <div className="flex items-center justify-center gap-8">
          <picture className="w-12 h-12 flex justify-center items-center"><img src="/palabrable_64.png" alt="logo" /></picture>
          <div className="flex flex-col items-baseline">
            <h1 className="text-center font-semibold text-2xl">PALABRA-BLE</h1>
            <h2 className="text-sm font-semibold italic text-orange-500">A que no puedes jugar sólo una</h2>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center gap-4 max-w-2xl">
          {tries.map((tr, i) => i !== tryNumber ? (
            <div key={i} className="w-full grid grid-cols-5 gap-4">
              {[0, 1, 2, 3, 4].map((j) => (
                <div
                  key={j}
                  className={`border w-16 sm:w-24 h-16 sm:h-24 flex justify-center items-center uppercase text-5xl 
                ${typeof tr.at(j) === "undefined"
                      ? "bg-white"
                      : tr.at(j) === secretWord.at(j)
                        ? "bg-green-400 text-white"
                        : secretWord.indexOf(tr.at(j)) === -1
                          ? "bg-gray-500 text-white"
                          : "bg-yellow-400"
                    }
                    ${i > tryNumber && "opacity-40"
                    }
                    `}
                >
                  {tr.at(j)}
                </div>
              ))}
            </div>
          ) : (
            <div key={i} className="w-full grid grid-cols-5 gap-4">
              {[0, 1, 2, 3, 4].map((j) => (
                <div
                  key={j}
                  className={`border w-16 sm:w-24 h-16 sm:h-24 flex justify-center items-center uppercase bg-white text-5xl`}
                >
                  {word.at(j)}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="flex gap-2 px-4 items-center w-full max-w-2xl">
        <input
          type="text"
          className="outline-none py-2 px-4 m-4 ml-0 shadow-lg rounded-lg focus:ring ring-green-200 flex-grow"
          placeholder="Escribe una palabra de 5 letras"
          ref={inputRef}
          autoFocus={true}
          value={word}
          disabled={status !== ""}
          onChange={(e) => setWord(e.target.value.substr(0, 5))}
          onKeyDown={(e) => e.key === "Enter" && sendWord()}
        />
        {status === "" ? <button
          className="bg-green-400 border-none shadow-lg rounded-lg py-2 px-4 text-white"
          onClick={sendWord}
        >
          Enviar
        </button> : <button
          className="bg-blue-400 border-none shadow-lg rounded-lg py-2 px-4 text-white"
          onClick={reset}
        >
          Reiniciar
        </button>}
      </div>
      <span className="mb-4 text-center italic text-sm text-slate-500"><span onClick={() => setJuego(secretWord)}>{juego}</span> desarrollado por <a href="https://gorkavillar.dev" target="_blank noreferrer" className="underline">Gorka Villar</a></span>
      <Modal
        showCloseIcon={false}
        open={modalOpen}
        center
        closeOnOverlayClick={true}
        onClose={() => setModalOpen(false)}>
        {status === "success" && <div className="flex flex-col justify-center items-center gap-4">
          <img src={getGifUrl("success")} alt="¡Enhorabuena!" />
          <h1 className="text-lg font-semibold text-green-600 text-center">¡Enhorabuena! ¿Quieres volver a intentarlo?</h1>
          <div className="flex gap-4">
            <button className="border border-red-500 text-red-500 rounded-lg py-1 px-2" onClick={() => setModalOpen(false)}>No por ahora...</button>
            <button className="bg-green-500 text-white border border-green-500 rounded-lg py-1 px-2" onClick={reset}>¡Pues claro!</button></div>
        </div>}
        {status === "fail" && <div className="flex flex-col justify-center items-center gap-4">
          <img src={getGifUrl("fail")} alt="¡Fallaste!" />
          <h1 className="text-lg font-semibold text-red-600 text-center">¡Noooo!¡Fallaste! ¿Quieres volver a intentarlo?</h1>
          <h1 className="text-lg text-slate-600 text-center">La respuesta correcta era... <span className="uppercase font-bold">{secretWord}</span></h1>
          <div className="flex gap-4">
            <button className="border border-red-500 text-red-500 rounded-lg py-1 px-2" onClick={() => setModalOpen(false)}>No por ahora...</button>
            <button className="bg-green-500 text-white border border-green-500 rounded-lg py-1 px-2" onClick={reset}>¡Pues claro!</button></div>
        </div>}
      </Modal>
    </div>
  );
}
