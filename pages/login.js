import styled from 'styled-components';
import { MaxContainer, MobileContainer } from '../components/Container.styled';
import { FiMail, FiKey, FiLogIn } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { useState } from 'react';
import axios from 'axios';
import { hostName } from '../helper/configue';
import nookies, { setCookie, destroyCookie } from 'nookies';
import Loader from '../components/Loader';
import { toast } from 'react-toastify';
import { toastConfig } from '../helper/toastify';

const Container = styled.div`
    min-height: 600px;
    height: 100%;
    width: 100%;
    color: #fff;
    padding: 10px;
    position: relative;
    background-color: red;
    background: url('/3.jpg') no-repeat;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
    color: #000;
    position: relative;
`;

const LoginContainer = styled.div`
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(5px);
    position: absolute;
    left: 0;
    bottom: 0;
    height: 50%;
    width: 100%;
    border-top-right-radius: 40px;
    border-top-left-radius: 40px;
    box-shadow: 0 0 40px rgba(8, 7, 16, 0.08);

    & .form {
        max-width: 85%;
        margin-left: auto;
        margin-right: auto;
    }

    & .input--group {
        position: relative;
        /* background-color: orangered; */

        & > .icon {
            height: 18px;
            width: 18px;
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            left: 3%;
        }
    }
`;

const Label = styled.label`
    color: #023047;
    display: block;
    margin-top: 20px;
    font-size: 16px;
    font-weight: 500;
    margin-left: 4px;
`;

const Input = styled.input`
    display: block;
    height: 50px;
    width: 100%;
    /* background-color: rgba(255, 255, 255, 0.07); */
    border-radius: 10px / 13px;
    padding: 0 40px;
    margin-top: 8px;
    font-size: 14px;
    font-weight: 300;
    border: none;
    outline: none;
    font-weight: bold;
    font-size: 14px;
    color: #023047;
`;

const Submit = styled.button`
    height: 50px;
    width: 100%;
    /* background-color: rgba(255, 255, 255, 0.07); */
    border-radius: 10px / 13px;
    padding: 0 10px;
    margin-top: 30px;
    border: none;
    outline: none;
    background-color: #1554f6;
    font-size: 18px;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    cursor: pointer;

    & > .icon {
        height: 20px;
        width: 20px;
    }
`;

const Auth = () => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const submitHandler = (e) => {
        e.preventDefault();
        if (!email || !password) {
            toast.error('All fields required', toastConfig());
            return;
        }

        // const re = /^[w-.]+@([w-]+.)+[w-]{2,4}$/;
        // if (re.test(email)) {
        //     toast.error('Email X', toastConfig());
        //     return;
        // }

        // if(password.length<4)
        // {
        //     toast.error('All fields required', toastConfig());
        //     return;
        // }

        setIsLoading(true);

        axios
            .post(
                `${hostName}/users/login`,
                { email: email, password: password },
                { 'Content-Type': 'application/json' }
            )
            .then((res) => {
                console.log(res.data.token);
                if (res.status === 200) {
                    toast.success('Login Successfully', toastConfig());
                    destroyCookie(null, 'token');
                    destroyCookie(null, 'email');
                    setCookie(null, 'token', res.data.token);
                    setCookie(null, 'email', email);
                    router.push(`/onboard/${email}`);
                }
            })
            .catch((err) => toast.error('Incorrect Credentials', toastConfig()))
            .finally(() => {
                setIsLoading(false);
            });
    };
    return (
        <MaxContainer>
            <MobileContainer>
                <Container>
                    <LoginContainer>
                        <form className='form'>
                            <div className='form--group'>
                                <Label>Email</Label>
                                <div className='input--group'>
                                    <FiMail className='icon' />
                                    <Input
                                        onChange={(e) => {
                                            setEmail(e.target.value);
                                        }}
                                        value={email}
                                        placeholder='Email'
                                        type='email'
                                    />
                                </div>
                            </div>
                            <div className='form--group'>
                                <Label>Password</Label>
                                <div className='input--group'>
                                    <FiKey className='icon' />
                                    <Input
                                        onChange={(e) => {
                                            setPassword(e.target.value);
                                        }}
                                        value={password}
                                        placeholder='password'
                                        type='password'
                                    />
                                </div>
                            </div>
                            <Submit disable={isLoading} onClick={(e) => submitHandler(e)}>
                                {isLoading ? <Loader /> : 'Submit'}
                            </Submit>
                            {/* <div className='form--group'>
                                <Label>Password Confirm</Label>
                                <Input />
                            </div> */}
                        </form>
                    </LoginContainer>
                </Container>
            </MobileContainer>
        </MaxContainer>
    );
};

export default Auth;
