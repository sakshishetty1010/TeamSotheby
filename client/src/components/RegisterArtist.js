import React, { useEffect, useState } from 'react';
import {Form, Message,Input,Button, Container } from 'semantic-ui-react'
import {Music,web3} from '../Music';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar2';
const RegisterArtist = () => {
  
  const navigate = useNavigate();
  const [role,setRole] =  useState('');
  const[loading,setLoading] = useState(false)
  const[errorMessage,setErrorMessage] = useState('');
  const[name,setName] = useState('');
  const[msg,setMessage] = useState('');
 

  
   

const onSubmit = async (e) =>{
    e.preventDefault();
    setErrorMessage('');
    setLoading(true);
    setMessage('');
   
    try {
      
      let accounts = await web3.eth.getAccounts();
      const role = await Music.methods.getRole().call({from:accounts[0]});
     setRole(role)
      if(role === '0'){
        if(name === '')setErrorMessage("Kindly enter your name")
        else{
          await Music.methods.artistRegister(name).send({from:accounts[0],value:web3.utils.toWei('0.05','ether')});
         navigate('/');
          
        }
      }
    } catch (error) {
      setErrorMessage(error.message)
    }
  }
 

  return (
   <div style={{background:'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(0,191,166,1) 35%, rgba(0,212,255,1) 100%)',height:'100vh'}}>
   <Navbar/>
    <Container style={{marginTop:"50px",border:'1px solid',padding:'10px',height:'150px',background:'#fff',borderRadius:'10px'}}>
    <Form onSubmit={onSubmit} error={!!errorMessage}>
    <Form.Field width={12}>
      <label>Name</label>
      <Input onChange={event =>setName(event.target.value)} />
    </Form.Field>
  
     
      <Form.Field width={12}>
      <Button  basic floated='left' loading={loading} disabled={loading}>
        Register as Artist
      </Button>
      </Form.Field>

    <Message error header="Oops!" content={errorMessage} />
  
  </Form>
  </Container>
  </div>
  )
}

export default RegisterArtist;