import React, { useState } from "react";
import { Language, Translation } from "../../../shared/DictionaryModels.ts";
import { Input, Modal } from "antd";

interface Props {
  id?: number;
  nameTranslations: Translation[];
  title: string;
  isOpen: boolean;
  onSave: (nameTranslations: Translation[], id?: number) => void;
  onCancel: () => void;
}

const TranslationComponent = (props: Props) => {
  const [georgianText, setGeorgianText] = useState(props.nameTranslations.find(t => t.Language == Language.Ka)?.Value ?? '');
  const [englishText, setEnglishText] = useState(props.nameTranslations.find(t => t.Language == Language.En)?.Value ?? '');

  const handleGeorgianInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setGeorgianText(event.target.value);
  };

  const handleEnglishInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setEnglishText(event.target.value);
  };

  return (
    <>
      <Modal
        title={props.title}
        centered
        open={props.isOpen}
        cancelText="გაუქმება"
        okText="შენახვა"
        onOk={() => {
          const nameTranslations = [
            new Translation(Language.Ka, georgianText),
            new Translation(Language.En, englishText),
          ];
          props.onSave(nameTranslations, props.id);
        }}
        onCancel={props.onCancel}
      >
        <Input
          placeholder="ქართულად"
          value={georgianText}
          onChange={handleGeorgianInputChange}
        />
        <br />
        <br />
        <Input
          placeholder="ინგლისურად"
          value={englishText}
          onChange={handleEnglishInputChange}
        />
      </Modal>
    </>
  );
};

export default TranslationComponent;
