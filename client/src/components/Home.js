import React, { useEffect, useState } from 'react';
// import getWeb3 from '../getWeb3';
// import Music from "../contracts/Music.json";
import {Music,web3} from '../Music'
import { Link } from 'react-router-dom';


const Home = () => {
  const [role,setRole] =  useState('');
  const [name,setName] =  useState('');
  const [open, setOpen] = React.useState(false)

  useEffect(()=>{
    const loadData = async()=>{
        try{
            
            let accounts = await web3.eth.getAccounts();
            const role = await Music.methods.getRole().call({from:accounts[0]});
            let userDetail = await Music.methods.userDetail().call({from:accounts[0]});
            setName(userDetail[1])
            console.log(role);
            setRole(role)
        }catch(error){
            console.log(error)
        }
    }
    loadData();

  },[])


  const displayRole = ()=>{
      if(role === '0'){
          return (<div>
              <Link to="/registerUser">Register as User</Link>
              or
              <Link to="/registerArtist">Register as Artist</Link>
          </div>)
      }else {
          return(
            <div>Welcome back {name}</div>
          )
      }
  }
  
  
    return (
  <div>{displayRole()}</div>
        )
}

export default Home