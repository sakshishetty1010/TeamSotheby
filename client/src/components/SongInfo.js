import React,{useState,useEffect} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {Music,web3} from '../Music';
import { Card, Container ,Form,Input,Button,Message} from 'semantic-ui-react';
import Navbar2 from '../components/Navbar2'
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

const SongInfo = () => {
  
    
    const [role,setRole] =  useState('');
    const [artistId,setArtistId] =  useState('');
    const [id,setId] =  useState('');
    const [name,setName] =  useState('');
    const [artistname,setArtistName] =  useState('');
    const [cost,setCost] =  useState('');
    const [releaseDate,setreleaseDate] =  useState('');
    const [ipfshash,setIpfshash] =  useState('');
    const [userAccount,setUserAccount] =  useState('');
    const[value,setValue] = useState('')
    const[loading,setLoading] = useState(false)
    const[errorMessage,setErrorMessage] = useState('')
    
    const params = useParams(); 
    const navigate = useNavigate();
    
  

    useEffect(()=>{
        const loadData = async()=>{
          try{
              
           
            let accounts = await web3.eth.getAccounts();
              const role = await Music.methods.getRole().call({from:accounts[0]});
              setRole(role)
 
              setUserAccount(accounts[0]);
              if(role === '1' || role==='2'){
                  const {id,_artistId,name,cost,releaseDate,ipfshash} = await Music.methods.songDetails(params.id).call({from:accounts[0]});

                  if(id !== '0'){
                      //song exists
                      //get artists detilas 
                      let artistdets = await Music.methods.artistDetail(_artistId).call({from:accounts[0]});
                      let userDetails = await Music.methods.userDetail().call({from:accounts[0]});
                    setArtistId(_artistId);
                    setId(id);
                    setName(name);
                    setCost(cost)
                    setArtistId(releaseDate);
                    setIpfshash(ipfshash);
                    setArtistName(artistdets[0])
                  }
              }
              
          }catch(error){
              console.log(error.message)
          }
      }
      loadData();
      },[])

      const renderSong = () =>{
        var date = new Date(releaseDate * 1000);
        var year = date.getFullYear();
        var month = "0" + (date.getMonth() + 1);
        var day = date.getDate();
        var formattedDate = day + '-' + month.substring(-2) + '-' + year;

        return (
            <Card>
           
                <Card.Content>
                <Card.Header>Artist : {artistname}</Card.Header>
            {/* <Card.Meta>Released on : {formattedDate}</Card.Meta> */}
                    <AudioPlayer 
                        autoPlay
                        src={ `https://ipfs.infura.io/ipfs/${ipfshash}`}
                    />
                    <Card.Description>
                        Cost : {cost} Wei
                    </Card.Description>
                </Card.Content>
            </Card>
        )
      }

      const onSubmit = async (e)=>{
        e.preventDefault();
        setLoading(true);
        setErrorMessage('');
        try {
            await Music.methods.donate(artistId).send({
                from:userAccount,
                value:web3.utils.toWei(value,'ether')
            });
            setValue('');
            navigate(`/explore/${params.id}`)
        } catch (error) {
            setErrorMessage(error.message)
        }
        setLoading(false)
      }
    return (
    <div style={{height:'100vh',background:'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(0,191,166,1) 35%, rgba(0,212,255,1) 100%)'}} >
    
        <Navbar2/>
        <Container style={{marginTop:'20px'}}>
        
   
        {renderSong()}
       
      
        <Form onSubmit={onSubmit} error={!!errorMessage}>
            <Form.Field width={4}>
               
                <Input 
                    value = {value}
                    onChange = {e=> setValue(e.target.value)}
                    label="ether"
                    labelPosition='right'
                />
                <Form.Field style={{marginTop:'10px'}}>
                <Message
              error
              header="OOPS!"
              content={errorMessage}
            ></Message>
                <Button style={{background:'#000',color:'#00bfa6',width:'100px',height:"30px",textAlign:'center',fontSize:'15px',paddingTop:'5px',fontWeight:'bold',borderRadius:'10px'}}>
                    Donate
                </Button>
                </Form.Field>

               
            </Form.Field>
        </Form>

      
        </Container>
   
    </div>
  )
}

export default SongInfo