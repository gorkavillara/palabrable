import { useEffect, useState } from "react";
import { Modal } from "react-responsive-modal";
import 'react-responsive-modal/styles.css';
import { palabras } from "./utils/palabras";
import { successGifs, failGifs } from "./utils/list";
import Keyboard from "./components/Keyboard";
import AdSense from 'react-adsense';

export default function App() {
  const [successKeys, setSuccessKeys] = useState([]);
  const [misplacedKeys, setMisplacedKeys] = useState([]);
  const [failedKeys, setFailedKeys] = useState([]);
  const [secretWordIndex, setSecretWordIndex] = useState(0);
  const [secretWord, setSecretWord] = useState("");
  const [word, setWord] = useState("");
  const [tries, setTries] = useState(["", "", "", "", "", ""]);
  const [tryNumber, setTryNumber] = useState(0);
  const [update, setUpdate] = useState(false);
  const [status, setStatus] = useState("");
  const [modalOpen, setModalOpen] = useState(false)
  const [juego, setJuego] = useState("Juego")

  useEffect(() => {
    const index = Math.floor(Math.random() * palabras.length);
    setSecretWordIndex(index);
  }, [update]);

  useEffect(() => {
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  }, [])

  useEffect(() => {
    const newSecretWord = palabras[secretWordIndex]
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
    setSecretWord(newSecretWord);
  }, [secretWordIndex]);

  const sendWord = () => {
    setTryNumber(tryNumber + 1);
    const newTries = tries;
    newTries[tryNumber] = word;
    if (word.toLowerCase() === secretWord.toLowerCase()) {
      setStatus("success")
      setModalOpen(true)
    } else if (tryNumber === 5) {
      setStatus("fail")
      setModalOpen(true)
    } else {
      setTries(newTries);
    }
    setWord("");
    updateKeyboard();
  };

  const updateKeyboard = () => {
    const lastTry = tries[tries.filter(t => t !== "").length - 1];
    let newSuccessKeys = []
    let newMisplacedKeys = []
    let newFailedKeys = []
    const chars = [0, 1, 2, 3, 4]
    chars.forEach(i => {
      const char = lastTry.at(i);
      if (char.toLowerCase() === secretWord.at(i).toLowerCase()) {
        newSuccessKeys.push(char)
      } else if (secretWord.toLowerCase().indexOf(char.toLowerCase()) === -1) {
        newFailedKeys.push(char)
      } else {
        newMisplacedKeys.push(char)
      }
    })
    setSuccessKeys([...successKeys, ...newSuccessKeys])
    setMisplacedKeys([...misplacedKeys, ...newMisplacedKeys])
    setFailedKeys([...failedKeys, ...newFailedKeys])
  }

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
    setTries(["", "", "", "", "", ""]);
    setWord("");
    setUpdate(!update)
    setModalOpen(false)
    setStatus("")
    setSuccessKeys([])
    setMisplacedKeys([])
    setFailedKeys([])
  }

  const type = key => {
    if (key === "send") {
      return sendWord();
    }
    if (key === "back") {
      return setWord(word.substring(0, word.length - 1))
    }
    return setWord(word + key)
  }

  return (
    <div className="flex flex-col justify-between items-center min-h-screen">
      <div
        onClick={(e) => {
          console.log(e.key);
          if (e.key === "enter") return alert("hola");
        }}
        className="flex flex-col items-center p-6 gap-8"
      >
        <div className="flex items-center justify-center gap-8">
          <picture className="w-12 h-12 flex justify-center items-center"><img src="/palabrable_64.png" alt="logo" /></picture>
          <div className="flex flex-col items-baseline">
            <h1 className="text-center font-semibold text-2xl">PALABRA-BLE</h1>
            <h2 className="text-sm font-semibold italic text-orange-500">A que no puedes jugar sólo una</h2>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center gap-2 max-w-2xl">
          {tries.map((tr, i) => i !== tryNumber ? (
            <div key={i} className="w-full grid grid-cols-5 gap-2">
              {[0, 1, 2, 3, 4].map((j) => (
                <div
                  key={j}
                  className={`border w-14 sm:w-24 h-14 sm:h-24 flex justify-center items-center uppercase font-bold text-4xl 
                ${typeof tr.at(j) === "undefined"
                      ? "bg-white"
                      : tr.at(j).toLowerCase() === secretWord.at(j).toLowerCase()
                        ? "bg-green-400 text-white"
                        : secretWord.toLowerCase().indexOf(tr.at(j).toLowerCase()) === -1
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
            <div key={i} className="w-full grid grid-cols-5 gap-2">
              {[0, 1, 2, 3, 4].map((j) => (
                <div
                  key={j}
                  className={`border w-14 sm:w-24 h-14 sm:h-24 flex justify-center items-center uppercase bg-white font-bold text-4xl`}
                >
                  {word.at(j)}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <Keyboard type={type} reset={reset} status={status} tries={tries} successKeys={successKeys} misplacedKeys={misplacedKeys} failedKeys={failedKeys} />
      <AdSense.Google
        client='ca-pub-7313475970210959'
        slot='9893978370'
      />
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
