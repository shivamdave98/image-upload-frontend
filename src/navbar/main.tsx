import React from 'react';
import {
    Nav,
    NavLink,
    Bars,
    NavMenu,
    NavBtn,
    NavBtnLink
} from './styled';
import logo from '../assets/logo.svg';

export const Navbar = () => {
    return (
        <Nav>
            <NavLink to='/'>
                <img src={logo} alt='logo' width={'50px'} height={'50px'} />
            </NavLink>
            <Bars />
            <NavMenu>
                <NavLink to='/upload'>
                    Upload
                </NavLink>
                <NavLink to='/'>
                    Gallery
                </NavLink>
                <NavLink to='/sign-up'>
                    Sign Up
                </NavLink>
                <NavLink to='/logout'>
                    Logout
                </NavLink>
            </NavMenu>
            <NavBtn>
                <NavBtnLink to='/login'>Sign In</NavBtnLink>
            </NavBtn>
        </Nav>
    );
};