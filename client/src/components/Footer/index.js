import React from 'react'
import { FooterContainer, FooterItems } from './FooterElements'
import {MdCopyright} from 'react-icons/md'
const Footer = () => {
  return (
    <>
    <FooterContainer>
        <FooterItems>
        TEAM SOTHEBY <br/>
        HACKNITP 4.0 <br/>
       Created by Sakshi and Sania <MdCopyright/> 2022 
        
        </FooterItems>
    </FooterContainer>
    </>
  )
}

export default Footer