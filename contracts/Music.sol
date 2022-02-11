// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.5.0;

contract Music{   
    address public owner;
    uint public lastUser;
    uint public lastArtist;
    uint public lastSong;

    struct User{
        uint uId;
        string name;
    }

    struct Artist{
        uint aId;
        uint uId;
        address payable artistAddress;
        string name;
        uint[] songsUploaded;
    }

    struct Song{
        uint aId;
        uint sId;
        uint cost;
        uint genre;
        uint releaseDate;
        string songName;
        string songhash;
    }

    enum ROLE{UNREGISTERED,ARTIST,USER}      //keep track of type of user

    mapping(uint => Artist) idToArtist;
    mapping(address => uint)artistId;
    mapping (address => User) userId;
    mapping (uint => Song) idToSong;
    mapping(string => Song) hashToSong;     //to keep track of uploads

    modifier onlyUser{
        require(userId[msg.sender].uId != 0,"Not a user");
        _;
    }

    modifier onlyArtist{
        require(artistId[msg.sender] !=0,"Not an artists");
        _;
    }

    constructor() public{
        owner = msg.sender;
        lastSong = 0;
        lastUser = 0;
        lastArtist = 0;
    }
    
    //returns type of user
    function getRole() external view returns(ROLE) {
        return ((artistId[msg.sender]!=0) ? ROLE.ARTIST : (userId[msg.sender].uId != 0) ? ROLE.USER : ROLE.UNREGISTERED);
    }

    function checkSongisUnique(string calldata _hash) external view returns(uint){
        return hashToSong[_hash].sId;
    }

    function userRegister(string memory name) public{
        require(userId[msg.sender].uId == 0,"Already registered!");
        lastUser+=1;
        User memory newUser = User(lastUser,name);
       userId[msg.sender] = newUser;
    }

    function artistRegister(string calldata _name) external payable{
        require(msg.value == 0.05 ether, "Artist Registration fee");
        require(artistId[msg.sender] == 0,"Already register");
        lastArtist++;

        //every artists is also a user
        if(userId[msg.sender].uId == 0){
            userRegister(_name);
        }

        Artist memory newArtist = Artist(lastArtist,userId[msg.sender].uId,msg.sender,_name,new uint[](0));
        artistId[msg.sender] = lastArtist;
        idToArtist[lastArtist] = newArtist;
    }

    function artistUploadSong(uint _cost,string calldata _name,uint _genre,string calldata songHash,string calldata ipfshash) external onlyArtist{
        require(hashToSong[songHash].sId == 0,"cant upload duplicate");
        lastSong++;

        Artist storage artistInstance = idToArtist[artistId[msg.sender]];
        artistInstance.songsUploaded.push(lastSong);

        idToSong[lastSong] = Song(artistInstance.aId,lastSong,_cost,_genre,block.timestamp,_name,ipfshash);
        hashToSong[songHash] = idToSong[lastSong];
    }
    
    //return use profile
    function userDetail() external view returns(uint,string memory){
        return (userId[msg.sender].uId,userId[msg.sender].name);
    }

    //return artistsProfile
    function artistDetail(uint _artistId) external view returns (string memory,uint[] memory){
        return (idToArtist[_artistId].name,idToArtist[_artistId].songsUploaded);
    }

    //return song details
    function songDetails(uint songId) external view returns(uint _artistId,uint id,string memory name,uint cost,uint releaseDate,uint genre){
        Song storage song = idToSong[songId];
        id = song.sId;
        _artistId = song.aId;
        name = song.songName;
        cost = song.cost;
        genre = song.genre;
        releaseDate = song.releaseDate;

    }

    //donate to artists
    function donate(uint _artistId) public payable{
        idToArtist[_artistId].artistAddress.transfer(msg.value);
    }
    
}