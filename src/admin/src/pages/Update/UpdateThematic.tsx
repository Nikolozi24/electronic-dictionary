import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TranslationComponent from "../../components/TranslationComponent/TranslationComponent";

import GetCookie from "../../components/Utilities/Coookies/GetCookie";
import axios from "axios";
import AxiosErrorHandling from "../../components/Utilities/ErrorHandling/AxiosErrorHandling";
import { Topic } from "../../components/TypeDef/Types";
const UpdateThematic: React.FC = () => {

  const jwt = GetCookie("jwt");
  const { ID } = useParams();

  let geo, eng;
  const [thematic, setThematic] = useState<Topic>();
  useState(() => {
    const fun = async () => {
      try {
        const response = await axios.get(`http://localhost/api/topic/${ID}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + jwt,
          },
        });

        geo = response.data.englishName;
        eng = response.data.georgiaName;
      } catch (err: any) {
        AxiosErrorHandling(err);
      }
    };
    fun();
  }, [ID, thematic?.georgianName]);
  ///useParam-ით გავიგოთ თუ რა აიდის მატარებელი ელემენტი უნდა დააბდეითდეს
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);
  const onSave = (Georgian: any, English: any, id?: any) => {
    const fun = async () => {
      try {
        const response = await axios.put(
          "http://localhost/api/topic",
          {
            georgianName: Georgian,
            englishName: English,
            id: ID,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + jwt,
            },
          }
        );
        setThematic(response.data);
      } catch (err: any) {
        AxiosErrorHandling(err);
      }
    };
    fun();
    navigate("/added");
  };
  const onCancel = () => {
    navigate(-1);
    setIsOpen(false);
    //navigate(-1)
  };
  return (
    <div>
      <h1>სიტყვა: {thematic?.georgianName}</h1>
      <TranslationComponent
        georgianName={thematic.georgianName}
        englishName={thematic.englishName}
        title="სიტყვის რედაქტირება"
        isOpen={isOpen}
        onSave={onSave}
        onCancel={onCancel}
      />
    </div>
  );
};
export default UpdateThematic;
