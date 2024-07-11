
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
const WrongPage = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    useEffect(() => {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 2000); // Simulating a 2 second loading delay
      return () => clearTimeout(timer);
    }, []);
  return  isLoading?<h1>Loading ...</h1>: <>
    <h2>გვერდი ვერ მოიძებნა </h2>
  <button onClick={()=>{navigate(-1)}}>უკან დაბრუნება</button>
   </>
  
}

export default WrongPage