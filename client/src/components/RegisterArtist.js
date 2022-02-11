import React, { useEffect, useState } from 'react';
import {Form, Message,Input,Button } from 'semantic-ui-react'
import {Music,web3} from '../Music';
import { useNavigate } from 'react-router-dom';

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
   
    <Form onSubmit={onSubmit} error={!!errorMessage}>
    <Form.Field width={12}>
      <label>Name</label>
      <Input onChange={event =>setName(event.target.value)} />
    </Form.Field>
  
     
      <Form.Field width={12}>
      <Button primary basic floated='left' loading={loading} disabled={loading}>
        Register
      </Button>
      </Form.Field>

    <Message error header="Oops!" content={errorMessage} />
  
  </Form>
  )
}

export default RegisterArtist;