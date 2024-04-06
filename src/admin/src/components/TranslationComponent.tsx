import React, { useState } from 'react';
import {Language, Translation} from "../../../shared/DictionaryModels.ts";

interface Props {
    id: number;
    nameTranslations: Translation[];
    onSave: (id: number, nameTranslations: Translation[]) => void;
}

const TranslationComponent = (props: Props) => {
    const [georgianText, setGeorgianText] = useState('');
    const [englishText, setEnglishText] = useState('');

    const handleGeorgianInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setGeorgianText(event.target.value);
    };

    const handleEnglishInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEnglishText(event.target.value);
    };

    return (
        <>
            <div>
                <div>
                    <label htmlFor="georgianInput">Enter Georgian Translation: </label>
                    <input
                        type="text"
                        id="georgianInput"
                        value={georgianText}
                        onChange={handleGeorgianInputChange}
                    />
                </div>
                <div>
                    <label htmlFor="englishInput">Enter English Translation: </label>
                    <input
                        type="text"
                        id="englishInput"
                        value={englishText}
                        onChange={handleEnglishInputChange}
                    />
                </div>
                <div>
                    <button onClick={() => {
                        props.onSave(props.id, [new Translation(Language.Ka,georgianText),new Translation(Language.En,englishText)]);
                    }}>Save</button>
                </div>
            </div>
        </>
    );
};

export default TranslationComponent;
