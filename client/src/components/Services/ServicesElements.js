import styled from "styled-components";

export const ServicesContainer=styled.div`
    display: flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    background: #000;
    height:800px;
`
export const ServicesWrapper=styled.div`
    display:grid;
    grid-template-columns:1fr 1fr 1fr;
    margin:0 auto;
    padding: 0 50px;
    align-items:center;
    max-width:1000px;
    grid-gap:16px;

` 
export const ServiceCard=styled.div`
    background: #fff;
    display: flex;
    flex-direction:column;
    justify-content:flex-start;
    align-items:center;
    max-height:340px;
    border-radius:10px;
    padding: 30px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.2);
    transition: all 0.2s ease-in-out;

    &:hover{
        transform:scale(1.02);
        transition: all 0.2s ease-in-out;
        cursor: pointer;


    }
`
export const ServiceIcon=styled.img`
    height:160px;
    width:160px;
    margin-bottom:10px;
`
export const ServicesH1=styled.h1`
    font-size:2.5 rem ;
    color:#fff;
    margin-bottom: 64px ;
`
export const ServicesH2=styled.h2`
    font-size:2 rem ;
    margin-bottom: 44px ;
`
export const ServicesP=styled.p`
    font-size:1 rem ;
   text-align:center;
`