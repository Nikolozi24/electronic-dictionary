import React, { useEffect, useState } from 'react'

import { motion } from 'framer-motion'
import Content from './Content'

const WordPage:React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Simulating a 2 second loading delay
    return () => clearTimeout(timer);
  }, []);
  return  isLoading? <>
       <motion.div
  className="loader"
  initial={{ opacity: 0, scale: 0 }}
  animate={{ opacity: 1, scale: 1, rotate: 360 }}
  transition={{
    repeat:Infinity,
    type: 'spring',
    delay:0.2,
    stiffness: 260,
    damping: 20,
  }}
> </motion.div>
  Loading...
  </> : (<Content/>)
}

export default WordPage