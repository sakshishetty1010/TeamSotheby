import React, { useEffect, useState } from 'react';
import {Form, Message,Input,Button, Dropdown } from 'semantic-ui-react'
import getWeb3 from '../getWeb3';

import {Music,web3} from '../Music'

const RegisterUser = (props) => {
  
  const[open,setOPen] = useState(false)
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
     
      if(role === '0'){
        if(name === '')setErrorMessage("Kindly enter your name")
        else{
          await Music.methods.userRegister(name).send({from:accounts[0]});
          let userDetail = await Music.methods.userDetail().call({from:accounts[0]});
          console.log(userDetail)
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

export default RegisterUser