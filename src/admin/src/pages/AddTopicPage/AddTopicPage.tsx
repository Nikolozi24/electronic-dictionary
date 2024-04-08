import React, { useState } from 'react';
// import { Button, Input, Modal } from 'antd';
// import TranslationComponent from '../../components/TranslationComponent/TranslationComponent.tsx';
import Thematic from '../../components/TematicTable.tsx';
import "./AddTopicPage.css"

const AddTopic: React.FC = () => {
  const [modalIsOpen, setModalOpen] = useState(false);

    function onSave(georgianName: string, englishName: string, id?: number){
        console.log(id);
        console.log(georgianName);
        console.log(englishName);
        localStorage
        setModalOpen(false);
    }

    return ( 
            <div className='thematic'>

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
