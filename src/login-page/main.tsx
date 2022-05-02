import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { ErrorToaster, SuccessToaster } from '../assets/toast';

import { useUserId, useToken } from '../auth';
import { Container, FormContainer, Form, Header, Input, Label, SignInButton, SignInButtonWrapper, Section } from './styled';

export const LoginPage = () => {
    const navigate = useNavigate();

    const { token, setToken, removeToken } = useToken();
    const { userId, setUserId, removeUserId } = useUserId();

    const handleSubmit = (event: any) => {
        event.preventDefault();

        const username = event.target[0].value;
        const password = event.target[1].value;
        
        let credentials = {
            'username': username,
            'password': password,
        }

        fetch('/api/login', {
            method: 'POST',
            body: JSON.stringify(credentials)
        }).then((r) => r.json()).then((response) => {
            if (response.error) {
                ErrorToaster(`${response.status_code}: ${response.error}- ${response.message}`);
                return;
            } else {
                setToken(response.access_token);
                setUserId(response.user_id);
                navigate('/');
                window.location.reload();
            }
        });
    }

    return (
        <Container>
            <FormContainer>
                <Header>
                    Login
                </Header>
                <Form onSubmit={handleSubmit} noValidate>
                    <Section className={'username'}>
                        <Label htmlFor={'username'}>
                            Username
                        </Label>
                        <Input type='username' name='username' />
                    </Section>
                    <Section className={'password'}>
                        <Label htmlFor={'password'}>
                            Password
                        </Label>
                        <Input type='password' name='password' />
                    </Section>
                    <SignInButtonWrapper className={'submit'}>
                        <SignInButton>
                            Sign In
                        </SignInButton>
                    </SignInButtonWrapper>
                </Form>
            </FormContainer>
            <ToastContainer />
        </Container>
    );
}
