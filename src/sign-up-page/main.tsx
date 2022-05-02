import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { ErrorToaster, SuccessToaster } from '../assets/toast';
import { useUserId, useToken } from '../auth';

import { Container, FormContainer, Form, Header, Input, Label, RegisterButton, RegisterButtonWrapper, Section } from './styled';

export const SignUpPage = () => {
    const navigate = useNavigate();

    const { setToken } = useToken();
    const { setUserId } = useUserId();

    const [username, setUsername] = useState<string>();
    const [password, setPassword] = useState<string>();
    const [errors, setErrors] = useState<{ username: string, password: string }>({ username: '', password: '' });

    const handleSubmit = (event: any) => {
        event.preventDefault();
        let validity = true;
        Object.values(errors).forEach(
            (val) => val.length > 0 && (validity = false)
        );
        if (validity === true) {
            let credentials = {
                'username': username,
                'password': password,
            }
            fetch('/api/register', {
                method: 'POST',
                body: JSON.stringify(credentials)
            }).then((r) => r.json()).then((response) => {
                if (response.error) {
                    ErrorToaster(`${response.status_code}: ${response.error}- ${response.message}`);
                    return;
                } else {
                    setToken(response.access_token);
                    setUserId(response.user_id);
                    SuccessToaster("User succcessfully registered and logged in!", 3000);
                    navigate('/');
                    window.location.reload();
                }
            })
        } else {
            ErrorToaster(`Error: Cannot register user. Please resolve in-line errors!`);
        }
    }

    const handleChange = (event: any) => {
        event.preventDefault();
        const { name, value } = event.target;
        let err = { username: '', password: '' };
        switch (name) {
            case 'username':
                err.username = value.length < 5 ? 'Username must be 5 characters long!' : '';
                if (err.username === '') {
                    setUsername(value);
                }
                break;
            case 'password':
                err.password = value.length < 8 ? 'Password must be eight characters long!' : '';
                if (err.password === '') {
                    setPassword(value);
                }
                break;
            default:
                break;
        }
        setErrors(err);
    }

    return (
        <Container>
            <FormContainer>
                <Header>
                    Sign Up
                </Header>
                <Form onSubmit={handleSubmit} noValidate>
                    <Section className={'username'}>
                        <Label htmlFor={'username'}>
                            Username
                        </Label>
                        <Input type='username' name='username' onChange={handleChange} />
                        {errors.username.length > 0 && <span style={{ color: "red" }}>{errors.username}</span>}
                    </Section>
                    <Section className={'password'}>
                        <Label htmlFor={'password'}>
                            Password
                        </Label>
                        <Input type='password' name='password' onChange={handleChange} />
                        {errors.password.length > 0 && <span style={{ color: "red" }}>{errors.password}</span>}
                    </Section>
                    <RegisterButtonWrapper className={'submit'}>
                        <RegisterButton>
                            Register me
                        </RegisterButton>
                    </RegisterButtonWrapper>
                </Form>
            </FormContainer>
            <ToastContainer />
        </Container >
    );
}