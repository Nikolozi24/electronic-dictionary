import React from "react";
import { useState, useEffect } from "react";
import "./AddSubTopic.css";
import Header from "../../components/Header/Header";
import "./InputStyle.scss";
import axios from "axios";

import GetCookie from "../../components/Utilities/Coookies/GetCookie";
import { useNavigate, useNavigation, Link } from "react-router-dom";
import {
  CloseCircleTwoTone,
  EditTwoTone,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { Button, Flex, Layout, Table, TableColumnsType } from "antd";
import TranslationComponent from "../../components/TranslationComponent/TranslationComponent";
import AxiosErrorHandling from "../../components/Utilities/ErrorHandling/AxiosErrorHandling";
// just for testing thematic list
interface dataType {
  key: number;
  GeorgianMeaning: string;
  EnglishMeaning: string;
  status:string;
}

const AddSubTopic: React.FC = () => {
  const [isViewer, setIsViewer] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Simulating a 2 second loading delay
    return () => clearTimeout(timer);
  }, []);
  const jwt = GetCookie("jwt");
  useEffect(() => {
    const fun = async () => {

      try{
      const response = await axios.get("http://localhost/api/identity/user", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + jwt,
        },
      });
      const user = response.data;
      const isVie= user.isViewer
      setIsViewer(isVie)
      }

      catch(err:any){
        AxiosErrorHandling(err);
      }
    };
    fun();
  }, []);
  useEffect(() => {
    const fun = async () => {
      try {
        const response = await axios.get("http://localhost/api/topic", {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + jwt,
          },
        });
        const thematis = response.data;
        setThematic(thematis);
      } catch (err: any) {
        AxiosErrorHandling(err);
      }
    };
    fun();
  }, []);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isOpen1, setIsOpen1] = useState<boolean>(false);

  const onSave1 = (geo: string, english: string, id: any) => {
    try {
      const fun = async ()=>{
        console.log(geo, english, id)
      const response =  await axios.put(
        "http://localhost/api/topic/subTopic",
        {
          georgianName: geo,
          englishName: english,
          id:parseInt(id)
        },
        {
          headers: {
            "Content-Type": "application/json",
            'Authorization': "Bearer " + jwt,
          },
        }
      ).then(dat=>{setIsOpen()});
     
    }
    fun();
    } catch (err: any) {
      AxiosErrorHandling(err);
    }
  };
  const [currentEdit, setCurrentEdit] = useState({id:1, englishName:"", georgianName:""})
  const columns: TableColumnsType<dataType> = [
    {
      title: "ქვეთემატიკა", // რაც  გამოჩნდება ცხრილის სვეტის სათაურში
      // ეს დანარჩენი ორი იგივე სახელისა რაც თემატიკის ობიექტში ველს ქვია
      dataIndex: "GeorgianMeaning",
      key: "GeorgianMeaning",
    },
    {
      title: "subthematic",
      dataIndex: "EnglishMeaning",
      key: "EnglishMEaning",
    },
    {
      title:<span style={{ color: 'black',fontFamily:"monospace" , fontSize:"16px" }}>სტატუსი</span>,
      dataIndex:"functionalLabel",
      key:"status",
      render:(_,record)=>{
          if(record.status==="InActive")
              return<>არა აქტიური</>
              else
              return<>აქტიური</>

      }
    },
      
    {
      key:"status",
      title: !isViewer && <span style={{ color: 'black',fontFamily:"monospace" , fontSize:"16px" }}>აქტივაცია/დეაქტივაცია</span>,
      dataIndex:"status",
      render: (_,record)=>{

        if(record.status=='InActive')
          return (!isViewer && <><Button onClick={()=>{
                try{
                  const fun  = async ()=>{
              const response = await  axios.put(`http://localhost/api/topic/subTopic/activate/${record.key}`,{},
                {
                  headers:{
                    'Content-Type':'application/json',
                    'Authorization':"Bearer "+jwt
                  }
                }
              );
              location.reload();
            }
            fun();
            }
            catch(err:any){
              AxiosErrorHandling(err);
            }
              
            }}>გააქტიურება</Button>
           
            
            </>)
        else
           return ( !isViewer && <><Button onClick={()=>{
            try{
              const fun  = async ()=>{
            const response = await axios.put(`http://localhost/api/topic/subTopic/deactivate/${record.key}`,{},
              {
                headers:{
                  'Content-Type':'application/json',
                  'Authorization':"Bearer "+jwt
                }
              }
            );
            location.reload();
          }
          fun();
            }
            catch(err:any){
              AxiosErrorHandling(err);
            }
          } 
          }>დეაქტივაცია</Button></>)

      }
    },
    {
      key:"update",
      title:!isViewer && "რედაქტირება",
      dataIndex:"update",
      render:(_,record)=>{
          return !isViewer&& <button onClick={()=>{    setCurrentEdit({id:record.key, georgianName: record.GeorgianMeaning , englishName:record.EnglishMeaning}); setIsOpen1(true)}}>
              <EditTwoTone width={10}/>
          </button>
      }
    },
    {
      key: "delete",
      title: !isViewer&&"წაშლა",
      dataIndex: "delete",
      render: (_, record) => {
        return (
         !isViewer && <button
            style={{ width: "100%" }}
            onClick={() => {
              const func = async () => {
                try {
                  const response = await axios.delete(
                      `http://localhost/api/topic/subTopic/${record.key}`,
                      {
                        headers: {
                          "Content-Type": "application/json",
                          'Authorization': "Bearer " + jwt,
                        },
                        withCredentials: true,
                      }
                    )
                    .then((res) => {
                      document.location.reload();
                    });
                } catch (err: any) {
                  AxiosErrorHandling(err);
                }
              };
              func();
            }}
          >
            {" "}
            <CloseCircleTwoTone width={10} />
          </button>
        );
      },
    },
  ];
  const [thematic, setThematic] = useState([
    {
      id: 1,
      georgianName: "",
      englishName: "",
    },
  ]);
  const [SubThematics, setSubThematics] = useState([]);
  //   useEffect(()=>{
  //     const fun = async ()=>{
  //       try{
  //         const response = await axios.get('http://localhost/api/topic',{
  //             headers:{
  //                 'Content-Type':'application/json',
  //                 'Authorization':"Bearer "+jwt
  //             }
  //           })

  //     const thematis = response.data.map((items)=>
  //     {
  //           const Subitem = items.subTopics;
  //         const respo = Subitem.map(item=>{
  //             return  {
  //             id:item.id,
  //             georgianName:item.georgianName,
  //             englishName: item.englishName
  //           }
  //         })
  //       return respo;
  //     }
  //     )
  //     console.log(thematis)

  //     const last = thematis.map(item=>{
  //       return  item.map(it=>{
  //                 setSubThematics(prev=>[...prev,it])
  //       })

  //     })

  //     console.log("Last ",SubThematics)

  //   }
  //   catch(err:any){
  //     AxiosErrorHandling(err);
  //   }
  // }
  //   fun()
  //   }
  //   ,[])
  useEffect(() => {
    const fun = async () => {
      try {
        const response = await axios.get("http://localhost/api/topic", {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + jwt,
          },
        });

        const thematis = response.data;
        // Flatten the array of subTopic arrays and remove duplicates
        const flattenedSubTopics = thematis
          .flatMap((item) => item.subTopics)
          .map((subTopic) => ({
            id: subTopic.id,
            georgianName: subTopic.georgianName,
            englishName: subTopic.englishName,
            status:subTopic.status
          }));
        const uniqueSubTopics = Array.from(
          new Set(flattenedSubTopics.map((subTopic) => subTopic.id))
        ).map((id) => {
          return flattenedSubTopics.find((subTopic) => subTopic.id === id);
        });

        setSubThematics(uniqueSubTopics);
      } catch (err) {
        AxiosErrorHandling(err);
      }
    };
    fun();
  }, []); // Empty dependency array ensures this effect runs only once

  // აქ ცხრილის მონაცემების მასივს ვქმნი
  const data: dataType[] = SubThematics.map((item) => {
    // ამოვიღებ დესტრუქტურიზაციით იმ ველებს რომლებიც მჭირდება
    const { id, georgianName, englishName, status } = item;
    // ვქმნი ობიექტს შესაბბამისი ველებით და ვაბრუნებ
    const obj = {
      key: id,
      GeorgianMeaning: georgianName,
      EnglishMeaning: englishName,
      status:status,
    };
    return obj;
  });
  const [isFilled, setIsFilled] = useState<Boolean>(false);

  function removeDublicates(subThematics) {}
  const navigate = useNavigate();
  // იღებს ინფორმაციას ველებიდან და  უბრალოდდ აკონსოლებს მათ
  const HandleSubmit: React.FC = (e: any) => {
    e.preventDefault();
    const elem = document.getElementById("thematic");
    const selectedValue = elem.value;
    const subThematicGeo = document.getElementById("subtopic").value;
    const subThematicEng = document.getElementById("sub").value;
    const obj = {
      topicId: selectedValue,
      georginName: subThematicGeo,
      englishName: subThematicEng,
    };
    try {
      const response = axios.post(
        "http://localhost/api/topic/subTopic",
        {
          topicId: selectedValue,
          georgianName: subThematicGeo,
          englishName: subThematicEng,
        },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + jwt,
          },
        }
      ).then(res=>setIsOpen(false)).then(res=>navigate('/added')).catch(err=>alert(err?.message));
    } catch (err: any) {
      AxiosErrorHandling(err);
    }
  };

  console.log(SubThematics)
  return  isLoading? <h1>Loading...</h1> : <>
      <div className="add-sub-topic-header">
      <TranslationComponent

  georgianName={currentEdit.georgianName}
  englishName={currentEdit.englishName}
  id={currentEdit.id}
  title="სიტყვის რედაქტირება"
  isOpen={isOpen1}
  onSave={onSave1}
  onCancel={()=>{setIsOpen1(false)}}
/>
        <Header />
      </div>
      <div className="add sub-tematic">
        <div className="add-sub-thematic">
          <div style={{ marginLeft: "", width: "80vw" }}>
            <Flex gap={"20px"} vertical style={{}} justify="center">
              <Layout>
                {<Table columns={columns} dataSource={data}></Table>}
              </Layout>
              {!isViewer &&<button
                style={{
                  width: "510px",
                  margin: "auto",
                  backgroundColor: "green",
                }}
                onClick={() => {
                  setIsOpen(true);
                }}
                onAbort={()=>{setIsOpen(false)}}
              >
                <PlusCircleOutlined /> ქვეთემატიკის დამატება{" "}
              </button>}
            </Flex>
          </div>

          {isOpen && (
            <form>
              <select name="thematic" className="minimal" id="thematic">
                {thematic.map((item) => {
                  return (
                    <option
                      onClick={() => {
                        setIsFilled(true);
                      }}
                      key={item.id}
                      value={item.id}
                    >
                      {item.georgianName}
                    </option>
                  );
                })}
              </select>
              <div className="form__group field">
                <input
                  type="input"
                  className="form__field"
                  placeholder="ქვეთემატიკა ქართულად"
                  name="subtopic"
                  id="subtopic"
                  required
                />
                <label htmlFor="subtopic" className="form__label">
                  ქვეთემატიკა ქართულად
                </label>
              </div>
              <div className="form__group field">
                <input
                  type="input"
                  className="form__field"
                  placeholder="ქვეთემატიკა ინგლისურად"
                  name="sub"
                  id="sub"
                  required
                />
                <label htmlFor="sub" className="form__label">
                  ქვეთემატიკა ინგლისურად
                </label>
              </div>
              <div className="subtopic-close-add-button">

              {<button onClick={(e) => {setIsOpen(false)}}>დახურვა</button>}
              {<button onClick={(e) => HandleSubmit(e)}>დამატება</button>}
              </div>
            </form>
          )}
        </div>
      </div>
    </>
  
};

export default AddSubTopic;
