import React, { useState } from 'react';
import {Form,Input,Dropdown,Button,Message} from 'semantic-ui-react';
import {Music,web3} from '../Music';
import { useNavigate } from 'react-router-dom';
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
        <div>
            <h3>Add new music</h3>

            <Form onSubmit={onSubmit} error={!!errorMessage}>
                <Form.Field>
                    <label>Upload Sognfile</label>
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
        </div>
    </>
  )
}

export default Publish