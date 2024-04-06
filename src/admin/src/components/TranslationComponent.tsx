import React, { useState } from "react";
import { Input, Modal } from "antd";

interface Props {
  id?: number;
  georgianName: string;
  englishName: string;
  title: string;
  isOpen: boolean;
  onSave: (georgianName: string, englishName: string, id?: number) => void;
  onCancel: () => void;
}

const TranslationComponent = (props: Props) => {
  const [georgianText, setGeorgianText] = useState(props.georgianName);
  const [englishText, setEnglishText] = useState(props.englishName);

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
          props.onSave(georgianText, englishText, props.id);
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
