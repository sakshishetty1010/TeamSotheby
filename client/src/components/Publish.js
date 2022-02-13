import React, { useState } from 'react';
import {Form,Input,Container,Button,Message} from 'semantic-ui-react';
import {Music,web3} from '../Music';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar2'
import {create} from 'ipfs-http-client'
const client = create('https://ipfs.infura.io:5001/api/v0');


const Publish = () => {

    const [errorMessage,setErrorMessage] = useState('');
    const[file,setFile] = useState(null);
    const[cost,setCost] = useState('');
    const[name,setName] = useState('');
    const[loading,setLoading] = useState(false);
    const navigate = useNavigate();


    const captureSong = (event)=>{
       
        
        const data = event.target.files[0];
        setName(data.name);
        console.log(name)
        const reader = new window.FileReader();
        reader.readAsArrayBuffer(data);
        reader.onloadend = () => {
            setFile(Buffer(reader.result));
        }

        event.preventDefault();

    }
    
    
let hash 
   const onSubmit = async (e)=>{
       e.preventDefault();
       try {
           const created = await client.add(file);
           hash = created.path
           console.log(created.path)
           let accounts = await web3.eth.getAccounts();

        console.log(accounts);
          let upload =   Music.methods.artistUploadSong(cost,name,hash)
          console.log("Uploading songss",upload);
          await upload.send({from:accounts[0]})
           navigate("/")
       } catch (error) {
          console.log(error.message) 
       }
   }

    

  return (
    <>
        <div style={{background:'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(0,191,166,1) 35%, rgba(0,212,255,1) 100%)',height:'100vh'}}>
        <Navbar/>
        <Container style={{marginTop:"50px",border:'1px solid',padding:'10px',height:'300px',background:'#fff',borderRadius:'10px'}}>
            <h3>Add new music</h3>

            <Form onSubmit={onSubmit} error={!!errorMessage}>
                <Form.Field>
                    <label>Upload Songfile</label>
                    <input type="file" accept=".mp3" onChange={captureSong}/>
                </Form.Field>
                <Form.Field>
                    <label>Cost</label>
                    <Input 
                    label="wei" 
                    labelPosition="right"
                    value={cost} 
                    onChange = {e => setCost(e.target.value)}
                    />
                </Form.Field>
                <Form.Field>
                {/* <Dropdown 
                onChange = {handleChange}
                placeholder='Genres' 
                search 
                selection 
                options={options} /> */}
                </Form.Field>
                <Message error header="OOPS!" content={errorMessage} />
                <Button loading={loading}>Publish</Button>
            </Form>
            </Container>
        </div>
    </>
  )
}

export default Publish