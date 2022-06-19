import { useState, useEffect } from "react"
import { Modal } from "react-responsive-modal";
import Char from "./components/Char"
import Keyboard from "./components/Keyboard"
import NumBox from "./components/NumBox"
import { successGifs, failGifs } from "./utils/list";
import { eliminogramas } from "./utils/eliminogramas";

export default function Eliminograma() {
    const [misplacedKeys, setMisplacedKeys] = useState([]);
    const [failedKeys, setFailedKeys] = useState([]);
    const [word, setWord] = useState("")
    const [status, setStatus] = useState("");
    const [modalOpen, setModalOpen] = useState(false)
    const [clues, setClues] = useState([])
    const [solution, setSolution] = useState("")
    const [update, setUpdate] = useState(false)

    useEffect(() => {
        const index = Math.floor(Math.random() * eliminogramas.length);
        setClues(eliminogramas[index].clues)
        return setSolution(eliminogramas[index].solution)
    }, [update])

    const onClick = char => {
        if (failedKeys.includes(char)) {
            let newKeys = failedKeys.filter(k => k !== char)
            setFailedKeys(newKeys)
            return setMisplacedKeys([...misplacedKeys, char])
        }
        if (misplacedKeys.includes(char)) {
            let newKeys = misplacedKeys.filter(k => k !== char)
            return setMisplacedKeys(newKeys)
        }
        return setFailedKeys([...failedKeys, char])
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

    const sendWord = () => {
        if (word.toLowerCase() === solution.toLowerCase()) {
            setStatus("success")
            setModalOpen(true)
        }
        setWord("");
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
        setModalOpen(false)
        setFailedKeys([])
        setMisplacedKeys([])
        setWord("")
        setUpdate(!update)
    }
    return clues.length > 0 ? (
        <>
            <div className="flex flex-col justify-between items-center min-h-screen">
                <div className="flex flex-col items-center p-6 gap-8">
                    <div className="flex flex-col items-center justify-center gap-2 max-w-2xl">
                        {clues.map(clue => (
                            <div key={clue.word} className="w-full grid grid-cols-7 gap-2">
                                {[1, 2, 3, 4, 5].map((p, j) => (
                                    <Char key={j} char={clue.word.toUpperCase().charAt(j)} misplacedKeys={misplacedKeys} failedKeys={failedKeys} onClick={onClick} />
                                ))}
                                <span></span>
                                <NumBox num={clue.correct} />
                            </div>
                        ))}
                    </div>
                    <div className="flex flex-col items-center justify-center gap-2 max-w-2xl">
                        <div className="w-full grid grid-cols-7 gap-2">
                            {[1, 2, 3, 4, 5].map((p, j) => (
                                <Char key={j} char={word.charAt(j)} misplacedKeys={[]} failedKeys={[]} onClick={null} />
                            ))}
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                    <Keyboard type={type} reset={reset} misplacedKeys={misplacedKeys} failedKeys={failedKeys} />
                </div>
            </div>
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
                        <button className="bg-green-500 text-white border border-green-500 rounded-lg py-1 px-2" onClick={reset}>¡Pues claro!</button>
                    </div>
                    {/* <AdSense /> */}
                </div>}
                {status === "fail" && <div className="flex flex-col justify-center items-center gap-4">
                    <img src={getGifUrl("fail")} alt="¡Fallaste!" />
                    <h1 className="text-lg font-semibold text-red-600 text-center">¡Noooo!¡Fallaste! ¿Quieres volver a intentarlo?</h1>
                    <div className="flex gap-4">
                        <button className="border border-red-500 text-red-500 rounded-lg py-1 px-2" onClick={() => setModalOpen(false)}>No por ahora...</button>
                        <button className="bg-green-500 text-white border border-green-500 rounded-lg py-1 px-2" onClick={reset}>¡Pues claro!</button>
                    </div>
                    {/* <AdSense /> */}
                </div>}
            </Modal>
        </>
    ) : null
}