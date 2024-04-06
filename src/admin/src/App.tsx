import './App.css'
import {Button } from "antd";
import {useState} from "react";
import TranslationComponent from "./components/TranslationComponent.tsx";
import {Language, Translation} from "../../shared/DictionaryModels.ts";

function App() {

    const [modalIsOpen, setModalOpen] = useState(false);

    function getId() {
        return 1;
    }

    function onSave(id: number, nameTranslations: Translation[]){
        console.log(id);
        console.log(nameTranslations);
        setModalOpen(false);
    }

    return (
    <>
        <Button type="primary" onClick={() => setModalOpen(true)}>
            Vertically centered modal dialog
        </Button>

        <TranslationComponent
            id={getId()}
            nameTranslations={[new Translation(Language.Ka,"ქართული"), new Translation(Language.En,"English")]}
            title={"თემა"}
            isOpen={modalIsOpen}
            onSave={onSave}
            onCancel={() => setModalOpen(false)}
        />
    </>
  )
}

export default App
