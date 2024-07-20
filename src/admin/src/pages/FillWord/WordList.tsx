import React, { useEffect, useState } from 'react';
// import { Button, Input, Modal } from 'antd';
// import TranslationComponent from '../../components/TranslationComponent/TranslationComponent.tsx';
import Header from '../../components/Header/Header.tsx';
import { Link, useNavigate } from 'react-router-dom';
import GetCookie from '../../components/Utilities/Coookies/GetCookie.ts';
import axios from 'axios';
import AxiosErrorHandling from '../../components/Utilities/ErrorHandling/AxiosErrorHandling.tsx';
import type { PaginationProps } from 'antd';
import { Pagination } from 'antd';
import { Button, Flex, Layout, Table, TableColumnsType } from 'antd';
import { CloseCircleTwoTone, EditTwoTone} from '@ant-design/icons';
import TranslationComponent from '../../components/TranslationComponent/TranslationComponent.tsx';
import Search from '../../components/Search/Search.tsx';
import { Entry } from '../../components/TypeDef/Types.tsx';
interface dataType {
    key:number;
    GeorgianMeaning:string;
    EnglishMeaning:string;
    functionalLabel:string;
    status:string;
    }
const WordList: React.FC = () => {
  const [current, setCurrent] = useState<number>(1);
  const [value, setValue] = useState<string>("")
  const[isViewer, setIsViewer] = useState<boolean>(false);
    const navigate = useNavigate();
    const [WordList, setWordList] = useState<dataType[]>([]);

    const jwt = GetCookie('jwt');
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
    useEffect(()=>{
      const fun = async ()=>{     
        try{
          const response = await axios.get(`http://localhost/api/entry?pageNumber=${current}&pageSize=${10}&searchText=${value}`,{
              headers:{
                  'Content-Type':'application/json',
                  'Authorization':"Bearer "+jwt
              }
      })
  const respData:Entry[] = response.data;
const WordLis:dataType[]= (respData)?.map(item=>{
  const obj ={
    key:item.id,
  GeorgianMeaning:item.georgianHeadword,
EnglishMeaning:item.englishHeadword,
functionalLabel:item.functionalLabel,
status:item.status

}
return obj


})
      setWordList(WordLis)
  }
  catch(err:any){
       AxiosErrorHandling(err);    
  }
  }
fun()
}

,[current,value])

  const [WordCount , setWordCount] = useState<number>(0);
  useEffect(()=>{
      const fun =async ()=>{
        try{
        await axios.get(`http://localhost/api/entry/count?searchText=${value}`,{

         headers:{
                  'Content-Type':'application/json',
                  'Authorization':"Bearer "+jwt
              }
        }).then(res=>res.data).then(res=>{setWordCount(res);console.log(res)});
      }
      catch(err:any){
        AxiosErrorHandling(err);
      }
      }
      fun();
    }

  ,[value])
  const [modalIsOpen, setModalOpen] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    useEffect(() => {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 2000); // Simulating a 2 second loading delay
      return () => clearTimeout(timer);
    }, []);
    function onSave(georgianName:string, englishName: string, id?: number){
       // localStorage
        setModalOpen(false);
        console.log(georgianName, englishName,id )
    }
    const  columns: TableColumnsType<dataType> = [
      {
        title:<span style={{ color: 'black',fontFamily:"monospace" , fontSize:"16px" }}>ქართული მნიშვნელობა</span>,// რაც  გამოჩნდება ცხრილის სვეტის სათაურში
        // ეს დანარჩენი ორი იგივე სახელისა რაც თემატიკის ობიექტში ველს ქვია
        dataIndex:"GeorgianMeaning",
        key:"GeorgianMeaning",
      },
      {
        title:<span style={{ color: 'black',fontFamily:"monospace" , fontSize:"16px" }}>ინგლისური მნიშვნელობა</span>,
        dataIndex:"EnglishMeaning",
        key:"EnglishMEaning",
      },
      {
        title:<span style={{ color: 'black',fontFamily:"monospace" , fontSize:"16px" }}>მეტყველების ნაწილი</span>,
        dataIndex:"functionalLabel",
        key:"functionalLabel",
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
        title:!isViewer &&<span style={{ color: 'black',fontFamily:"monospace" , fontSize:"16px" }}>აქტივაცია/დეაქტივაცია</span>,
        dataIndex:"status",
        render:  (_,record)=>{

          if(record.status==='InActive')
            return (!isViewer && <><Button onClick={()=>{
                  try{
                    const fun  = async ()=>{
                          await  axios.put(`http://localhost/api/entry/activate/${record.key}`,{},
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
             return (!isViewer && <><Button onClick={()=>{
              try{
                const fun  = async ()=>{
                   await axios.put(`http://localhost/api/Entry/deactivate/${record.key}`,{},
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
        title:!isViewer && <span style={{ color: 'black',fontFamily:"monospace" , fontSize:"16px" }}>რედაქტირება</span>,
        dataIndex:"update",
        render:(_,record)=>{
            return !isViewer && <Link to={`/update/Entry/${record.key}`} onClick={()=>{}}><EditTwoTone width={10}/></Link>
        }
      },
      {
        key:"delete",
        title:!isViewer&& <span style={{ color: 'black',fontFamily:"monospace" , fontSize:"16px" }}>წაშლა</span>,
        dataIndex: "delete",
        render:(_,record)=>{
          return !isViewer && <button style={{width:'100%'}}  onClick={()=>{
            try{
              const fun = async() =>{
               await axios.delete(`http://localhost/api/entry/${record.key}`,
      {
          headers:{
            "Content-Type":"application/json",
            'Authorization':"Bearer "+jwt
          },
      }).then(res=>location.reload())
   
    }
    fun()
    }
    catch(err:any){
      AxiosErrorHandling(err);
    }
    }}><CloseCircleTwoTone width={10}/></button>
    }
  }
  ]
  

  
    const onChange: PaginationProps['onChange'] = (page) => {
      setCurrent(page);
    }
    const handleChange= (e:any)=>{
          const val = e.target.value;
          setValue(val)
    }
    
    
    
    
    return isLoading?<h1>Loading..</h1>: <div className='thematic'>
            <Header/>
            {/* <input type='text' value={value} onChange={(e)=>handleChange(e)}/> */}
          

            <Search value={value} handleChange={handleChange}/>
       
            
            <div style={ {marginLeft: '',  width:'80vw'}} >
            <TranslationComponent

            georgianName=""
            englishName=""
            title="სიტყვის დამატება"
            isOpen={false}
            onSave={onSave}
            onCancel={()=>{}}
  />
    <Flex  gap={'20px'} vertical  style={{}} justify='center'>
    <Layout >
 
      {
        <>
        <Table  onChange={()=>{navigate("#")}} columns={columns} pagination={false} dataSource={WordList}></Table> 
        <Pagination current={current} onChange={onChange} total={WordCount} />
        </>
        
        
        
        
        }
    
      
      </Layout>
 
    </Flex>
            
            
            </div>

            <TranslationComponent
                georgianName="ქართული"
                englishName="english"
                title={"თემა"}
                isOpen={modalIsOpen}
                onSave={onSave}
                onCancel={() => setModalOpen(false)}
            /> 
        </div>
    
}


export default WordList;
