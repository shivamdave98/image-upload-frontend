import styled from 'styled-components';

export const Container = styled.div`
    height: 97vh;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: rgb(181, 43, 121);
`;

export const FormContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 280px;
    max-width: 80%;
    min-width: 100px;
    min-height: 400px;
    padding: 20px 40px;
    margin-top: -15%;
    border-radius: 6px;
    box-shadow: 0px 8px 36px #222;
    background-color: #fefefe;
`;

export const Form = styled.form`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
`;

export const Header = styled.h1`
    display: flex;
    justify-content: center;
    font-family: "Segoe UI", "Ubuntu", "Roboto", "Open Sans", "Helvetica Neue", sans-serif;
    font-size: 2em;
    font-weight: lighter;
    margin-top: 0.25em;
    color: #222;
`;

export const Input = styled.input`
    padding: 10px 10px;
    border-radius: 5px;
    outline: none;
    border: 1px solid #d6d1d5;
`;

export const Label = styled.label`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    font-size: 1.0em;
    font-weight: lighter;
`;

export const SignInButton = styled.button`
    min-width: 100%;
    cursor: pointer;
    margin-right: 0.25em;
    margin-top: 0.5em;
    padding:  0.938em;
    border: none;
    border-radius: 4px;
    background-color: rgb(181, 43, 121);
    color: #fefefe;
`;

export const SignInButtonWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
`;

export const Section = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 15px;
    width: 100%;
`;