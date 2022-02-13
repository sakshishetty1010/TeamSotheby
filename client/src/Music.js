import Web3 from 'web3'
import * as MusicContract from './contracts/Music.json';
//const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
const web3 = new Web3(window.web3.currentProvider);
const abi = MusicContract.abi;
const address = '0x53CB08C4815D1e8c5e501b609fB6fEaaE40c4F34';
const Music = new web3.eth.Contract(abi, address);
export {Music, web3}