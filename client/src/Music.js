import Web3 from 'web3'
import * as MusicContract from './contracts/Music.json';
//const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
const web3 = new Web3(window.web3.currentProvider);
const abi = MusicContract.abi;
const address = '0xd07C9699ea0ad1C77567aD95A4e5e7025B8dE663';
const Music = new web3.eth.Contract(abi, address);
export {Music, web3}