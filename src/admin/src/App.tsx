import './App.css'
import {Button } from "antd";
import {useState} from "react";
import TranslationComponent from "./components/TranslationComponent.tsx";

function App() {

    const [modalIsOpen, setModalOpen] = useState(false);

    function onSave(georgianName: string, englishName: string, id?: number){
        console.log(id);
        console.log(georgianName);
        console.log(englishName);
        setModalOpen(false);
    }

    return (
    <>
        <Button type="primary" onClick={() => setModalOpen(true)}>
            Vertically centered modal dialog
        </Button>

        <TranslationComponent
            georgianName="ქართული"
            englishName="english"
            title={"თემა"}
            isOpen={modalIsOpen}
            onSave={onSave}
            onCancel={() => setModalOpen(false)}
        />
    </>
  )
}

export default App
