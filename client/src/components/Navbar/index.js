import React,{useState,useEffect} from 'react'
import {FaBars} from 'react-icons/fa';
import {Music,web3} from '../../Music'
import {animateScroll as scroll} from 'react-scroll'
import { Link } from 'react-router-dom';

import { 
    Nav,
    NavbarContainer,
    NavLogo,
    MobileIcon ,
    NavMenu,
    NavLinks,
    NavItem,
    NavBtn,
    NavBtnLink} from './NavbarElements'
const Navbar = ({toggle}) => {
    const [scrollNav,setScrollNav]=useState(false);
    const [role,setRole] =  useState('');
    const [name,setName] =  useState('');
    const [open, setOpen] =useState(false)
  

    const changeNav=() => {
        if (window.scrollY >= 80){
            setScrollNav(true);
        }else{
            setScrollNav(false);
        }
    };

    useEffect(() =>{
        window.addEventListener('scroll',changeNav);
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
    },[]

    );

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

    const toggleHome=() =>{
        scroll.scrollToTop();
    };
  return (
    <>
        <Nav>
            <NavbarContainer>
                <NavLogo to='/' onClick={toggleHome}>Aria</NavLogo>
                <MobileIcon onClick={toggle}>
                    <FaBars />
                </MobileIcon >
                <NavMenu>
                    <NavItem>
                        <NavLinks to="about" 
                        smooth={true}
                         duration={500}
                         spy={true}
                         exact='true'
                         offset={-80}>About</NavLinks>
                    </NavItem>
                    <NavItem>
                        <NavLinks to="services"
                        smooth={true}
                        duration={500}
                        spy={true}
                        exact='true'
                        offset={-80}>Services</NavLinks>
                    </NavItem>
                    <NavItem>
                        <NavLinks to="discover"
                        smooth={true}
                        duration={500}
                        spy={true}
                        exact='true'
                        offset={-80}><Link to="/explore">Discover</Link></NavLinks>
                    </NavItem>
                    <NavItem>
                        <NavLinks to="signup"
                        smooth={true}
                        duration={500}
                        spy={true}
                        exact='true'
                        offset={-80}>Sign up</NavLinks>
                    </NavItem>
                </NavMenu>
                <NavBtn>
                    <NavBtnLink to="/signin">{displayRole()}</NavBtnLink>
                </NavBtn>
            </NavbarContainer>
        </Nav>
    </>
  )
}

export default Navbar