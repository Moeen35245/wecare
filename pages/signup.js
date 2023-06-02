import styled from 'styled-components';
import { MaxContainer, MobileContainer } from '../components/Container.styled';
import { FiMail, FiKey, FiUserCheck, FiCheckCircle, FiClipboard } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { useState } from 'react';
import axios from 'axios';
import { hostName } from '../helper/configue';
const Container = styled.div`
    min-height: 630px;
    height: 100%;
    width: 100%;
    color: #fff;
    padding: 10px;
    position: relative;
    /* background-color: red; */
    background: url('/2.jpg') no-repeat center center;
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
    height: 60%;
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
            color: #023047;
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
    const [confirm, setConfirm] = useState('');
    const [otp, setOtp] = useState('');
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isVerifyLoading, setIsVerifyLoading] = useState(false);

    const submitHandler = (e) => {
        setIsLoading(true);
        console.log('clicked');
        e.preventDefault();
        // router.push('/onboard');
        if (password !== confirm) return;
        axios
            .post(
                `${hostName}/users/signup`,
                { email: email, password: password },
                { 'Content-Type': 'application/json' }
            )
            .then((res) => {
                if (res.status === 201) setIsOtpSent(true);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    const verifyOtp = (e) => {
        setIsVerifyLoading(true);
        console.log('clicked');
        e.preventDefault();
        // router.push('/onboard');

        axios
            .post(`${hostName}/users/verify_otp`, { email: email, otp: otp }, { 'Content-Type': 'application/json' })
            .then((res) => {
                console.log(res);
                if (res.status === 201) router.push('/login');
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    return (
        <MaxContainer>
            <MobileContainer>
                <Container>
                    <LoginContainer>
                        {isOtpSent ? (
                            <form className='form'>
                                <div className='form--group'>
                                    <Label>Verify Otp</Label>
                                    <div className='input--group'>
                                        <FiClipboard className='icon' />
                                        <Input
                                            value={otp}
                                            onChange={(e) => {
                                                setOtp(e.target.value);
                                            }}
                                            placeholder='OTP'
                                            type='text'
                                        />
                                    </div>
                                </div>
                                <Submit onClick={(e) => verifyOtp(e)}>
                                    Verify {!isVerifyLoading && <FiCheckCircle className='icon' />}
                                </Submit>
                            </form>
                        ) : (
                            <form className='form'>
                                <div className='form--group'>
                                    <Label>Email</Label>
                                    <div className='input--group'>
                                        <FiMail className='icon' />
                                        <Input
                                            value={email}
                                            onChange={(e) => {
                                                setEmail(e.target.value);
                                            }}
                                            placeholder='email'
                                            type='email'
                                        />
                                    </div>
                                </div>
                                <div className='form--group'>
                                    <Label>Password</Label>
                                    <div className='input--group'>
                                        <FiKey className='icon' />
                                        <Input
                                            value={password}
                                            onChange={(e) => {
                                                setPassword(e.target.value);
                                            }}
                                            placeholder='password'
                                            type='password'
                                        />
                                    </div>
                                </div>
                                <div className='form--group'>
                                    <Label>Confirm</Label>
                                    <div className='input--group'>
                                        <FiKey className='icon' />
                                        <Input
                                            value={confirm}
                                            onChange={(e) => {
                                                setConfirm(e.target.value);
                                            }}
                                            placeholder='confirm'
                                            type='password'
                                        />
                                    </div>
                                </div>
                                <Submit onClick={(e) => submitHandler(e)}>
                                    Sign Up {!isLoading && <FiUserCheck className='icon' />}
                                </Submit>
                            </form>
                        )}
                    </LoginContainer>
                </Container>
            </MobileContainer>
        </MaxContainer>
    );
};

export default Auth;
