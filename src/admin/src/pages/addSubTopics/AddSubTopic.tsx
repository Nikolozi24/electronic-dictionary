import React from "react";
import { useState } from "react";
import "./AddSubTopic.css";
import Header from "../../components/Header/Header";
import "./InputStyle.scss";
import { useNavigate, useNavigation } from "react-router-dom";
// just for testing thematic list

const AddSubTopic: React.FC = () => {
    const [isFilled, setIsFilled] = useState<Boolean>(false);
  const [Thematics, setThematic] = useState([
    {
      id: 1,
      value: "თემატიკა 1",
    },
    {
      id: 2,
      value: " თემატიკა  2",
    },
    {
      id: 3,
      value: " თემატიკა  3",
    },
    {
      id: 4,
      value: " თემატიკა  4",
    },
    {
      id: 5,
      value: " თემატიკა  5",
    },
    {
      id: 6,
      value: " თემატიკა  6",
    },
    {
      id: 7,
      value: " თემატიკა  7",
    },
  ]);
  const navigate = useNavigate();
  // იღებს ინფორმაციას ველებიდან და  უბრალოდდ აკონსოლებს მათ
  const HandleSubmit: React.FC = (e: any) => {
    e.preventDefault();
    const elem = document.getElementById("thematic");
    const selectedValue = elem.value;
    const subThematic = document.getElementById("subtopic").value;
    const obj = {
      Thematic: selectedValue,
      subThematic: subThematic,
    };
    console.log(obj);
    navigate('/added')


  };

  return (<>
  <div className="add-sub-topic-header">

        <Header/>
  </div>
    <div className="add sub-tematic">
      <div className="add-sub-thematic">
        <form>
          <select name="thematic" className="minimal" id="thematic">
            {Thematics.map((item) => {
                return <option onClick={()=>{setIsFilled(true)}}key={item.id} value={item.value}>{item.value}</option>;
            })}
          </select>
          <div className="form__group field">
            <input
              type="input"
              className="form__field"
              placeholder="ქვეთემატიკა"
              name="subtopic"
              id="subtopic"
              
              required
              />
            <label htmlFor="subtopic" className="form__label">
              ქვეთემატიკა
            </label>
          </div>
          <button onClick={(e) => HandleSubmit(e)}>დამატება</button>
        </form>
      </div>
    </div>
              </>
  );
};

export default AddSubTopic;
