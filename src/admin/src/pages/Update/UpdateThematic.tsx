import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TranslationComponent from "../../components/TranslationComponent/TranslationComponent";
import UseAxiosPrivate from "../../components/Hooks/UseAxiosPrivate";
import { axiosPrivate } from "../../components/API/axios";
import GetCookie from "../../components/Utilities/Coookies/GetCookie";
import axios from "axios";

const UpdateThematic: React.FC = () => {
  const BASE_URL = "http://localhost:5173/";
  const jwt = GetCookie("jwt");
  const { ID } = useParams();
  
  let geo, eng;
 const [thematic, setThematic] = useState({
   id: ID,
   georgianName:"",
   englishName:"",
   subTopics: [""],
 });
  useState(() => {
    
    const fun = async () => {
      console.log(jwt);
      const response = await axios.get(`http://localhost/api/topic/${ID}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + jwt,
          },
          });
          console.log(response.data);
          geo= response.data.englishName;
          eng = response.data.georgiaName;
          };
          fun();
          }, [ID , thematic.georgianName]);
          ///useParam-ით გავიგოთ თუ რა აიდის მატარებელი ელემენტი უნდა დააბდეითდეს
        console.log((thematic.englishName, thematic.georgianName))
          const navigate = useNavigate();
  console.log(useParams()?.ID);
  const [isOpen, setIsOpen] = useState(true);
  const onSave = (Georgian: any, English: any, id?: any) => {
    const fun = async () => {
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
      console.log(response.data);
      setThematic(response.data);
    };
    fun();
    navigate('/added')
  };
  const onCancel = () => {
    navigate(-1);
    setIsOpen(false);
    //navigate(-1)
  };
  console.log(ID);
  return (
    <div>
      <h1>სიტყვა: {thematic.georgianName}</h1>
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
