import React, { useEffect ,useState} from 'react';
import { Card,Container } from 'semantic-ui-react';
import {Music,web3} from '../Music';
import Navbar2 from '../components/Navbar2'

const Explore = () => {
  
  const [role,setRole] =  useState('');
  const [lastSong,setlastSong] =  useState('');
  const [songlist,setSonglist] = useState([]);

  useEffect(()=>{
    const loadData = async()=>{
      try{
          
          let accounts = await web3.eth.getAccounts();
          const role = await Music.methods.getRole().call({from:accounts[0]});
          setRole(role)

          if(role === '2' || role=== '1'){
            let songlist = [];
            const lastSong = await Music.methods.lastSong().call({from:accounts[0]});
            
            if(lastSong > 0){
              for(var i =1;i<= lastSong ;i++){
                  let {artistId, id, name,cost, releaseDate} = await Music.methods.songDetails(i).call({from:accounts[0]});
                  songlist.push([id,name,cost,releaseDate,artistId]);
              }
            }
            setSonglist(songlist);
            console.log(songlist)
            setlastSong(lastSong);
          }
      }catch(error){
          console.log(error)
      }
  }
  loadData();
  },[])

  const renderSongs = () =>{
    let items;
    if(lastSong>0){

      items = songlist.map((song,id) =>{
        var date = new Date(song[3]*1000);
        var year = date.getFullYear();
        var month = "0"+(date.getMonth()+1);
        var day = date.getDate();

        var formattedDate = day + '-'+month.substring(-2)+"-"+year;

        return (
          <Card key={id} href={'/explore/'+song[0]}>
          <Card.Content>
            <Card.Header>{song[1].split('.').slice(0, -1).join('.')}</Card.Header>
            <Card.Meta>
              <span>Cost: {web3.utils.fromWei(song[2], 'ether')} ETH</span>
            </Card.Meta>
            <Card.Description>Release Date: {formattedDate}</Card.Description>
          </Card.Content>
        </Card>
        )
      });
    }
    else{
      return (
        <Card>
          <Card.Content>
            <Card.Header>No Songs yet!</Card.Header>
          </Card.Content>
        </Card>
      );
    }

    return <Card.Group>{items}</Card.Group>;
  }
  
  return (
   <div style={{background:'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(0,191,166,1) 35%, rgba(0,212,255,1) 100%)',height:'100vh'}}>
   <Navbar2 />
   <div >
    <Container style={{marginTop:'10px'}}>
    <div>
      {(role === '1' || role === '2') && 
      <div >
      
        {renderSongs()}
      </div>
      }
      {
        role === '0' && 
        <h2>You are not registered!</h2>
      }
    </div>

    </Container>
    </div>
    </div>
  )
}

export default Explore