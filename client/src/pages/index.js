import React,{useState} from 'react'
import Navbar from '../components/Navbar'
import First from '../components/First'

import { homeObj1,homeObj2,homeObj3 } from '../components/First/Data'
import Services from '../components/Services'

const Home = () => {
    const [isOpen,setIsOpen]=useState(false)

    const toggle=()=>{
        setIsOpen(!isOpen)
    }
  return (
    <>
        
        <Navbar toggle={toggle} />
        <First {...homeObj1} />
        <First {...homeObj2} />
        <Services />
        <First {...homeObj3} />
    </>
  )
}

export default Home