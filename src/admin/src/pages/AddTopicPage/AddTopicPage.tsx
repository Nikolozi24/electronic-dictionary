import React, { useState } from 'react';
// import { Button, Input, Modal } from 'antd';
// import TranslationComponent from '../../components/TranslationComponent/TranslationComponent.tsx';
import Thematic from '../../components/TematicTable.tsx';
import "./AddTopicPage.css"
import Header from '../../components/Header/Header.tsx';


const AddTopic: React.FC = () => {
  const [modalIsOpen, setModalOpen] = useState<boolean>(false);

    function onSave(georgianName: string, englishName: string, id?: number){
    
        localStorage
        setModalOpen(false);
    }


    return ( 
            <div className='thematic'>
            <Header/>
            <Thematic />
            </div>
                        /* <Button type="primary" onClick={() => setModalOpen(true)}>
                Vertically centered modal dialog
            </Button>

            <TranslationComponent
                georgianName="ქართული"
                englishName="english"
                title={"თემა"}
                isOpen={modalIsOpen}
                onSave={onSave}
                onCancel={() => setModalOpen(false)}
            /> */
        
    )
}


export default AddTopic;
