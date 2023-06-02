import styled from 'styled-components';
import { FlexContainer, MaxContainer, MobileContainer } from '../../components/Container.styled';
import { useRouter } from 'next/router';
import { FiCheck } from 'react-icons/fi';
import { useState } from 'react';
import axios from 'axios';
import { hostName } from '../../helper/configue';
import nookies from 'nookies';

const LoginContainer = styled.div`
    padding: 30px;
    background: #f1faee;
    /* backdrop-filter: blur(5px); */
    /* position: absolute; */
    /* left: 0;
    bottom: 0; */
    height: 100%;
    width: 100%;
    /* border-top-right-radius: 40px;
    border-top-left-radius: 40px;
    box-shadow: 0 0 40px rgba(8, 7, 16, 0.08); */

    & .form {
        /* max-width: 85%; */
        /* margin-left: auto;
        margin-right: auto; */
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

        & .input--date::-webkit-calendar-picker-indicator {
            display: none;
            -webkit-appearance: none;
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
    padding: 0 20px;
    margin-top: 8px;
    font-size: 14px;
    font-weight: 300;
    border: none;
    outline: none;
    font-weight: bold;
    font-size: 14px;
    color: #023047;
`;
const Textarea = styled.textarea`
    display: block;
    /* height: 50px; */
    width: 100%;
    /* background-color: rgba(255, 255, 255, 0.07); */
    border-radius: 10px / 13px;
    padding: 20px 20px;
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

const Select = styled.select`
    display: block;
    height: 50px;
    width: 100%;
    /* background-color: rgba(255, 255, 255, 0.07); */
    border-radius: 10px / 13px;
    padding: 0 20px;
    margin-top: 8px;
    font-size: 14px;
    font-weight: 300;
    border: none;
    outline: none;
    font-weight: bold;
    font-size: 14px;
    color: #023047;
    background-color: whitesmoke;
`;

// function isValidEmail(email) {
//     const re = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
//     return re.test(String(email).toLowerCase());
// }

// function isValidPhone(num) {
//     const re = /^[0-9]?$/;
//     return re.test(String(num));
// }

const OnBoard = () => {
    const router = useRouter();
    const [fName, setFName] = useState('');
    const [lName, setLName] = useState('');
    const [phone, setPhone] = useState('');
    const [ePhone, setEPhone] = useState('');
    const [address, setAddress] = useState('');
    const [gender, setGender] = useState('');
    const [DOB, setDOB] = useState('');
    const [otp, setOtp] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const submitHandler = (e) => {
        e.preventDefault();
        setIsLoading(true);
        const { email, token } = nookies.get();

        axios
            .post(
                `${hostName}/users/add_user`,
                {
                    email: email,
                    firstName: fName,
                    lastName: lName,
                    phone: phone,
                    dob: DOB,
                    gender: gender,
                    address: address,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    'Content-Type': 'application/json',
                }
            )
            .then((res) => {
                console.log(res);
                if (res.status === 201) {
                    router.push('/patient/appointment/new');
                }
            })
            .catch((err) => console.log('something went wrong', err))
            .finally(() => {
                setIsLoading(false);
            });
    };

    return (
        <MaxContainer>
            <MobileContainer>
                <LoginContainer>
                    <form className='form'>
                        <FlexContainer gap='15px' justify='space-between'>
                            <div className='form--group'>
                                <Label>First Name</Label>
                                <div className='input--group'>
                                    {/* <FiMail className='icon' /> */}
                                    <Input
                                        value={fName}
                                        onChange={(e) => {
                                            setFName(e.target.value);
                                        }}
                                        placeholder='First Name'
                                        type='text'
                                    />
                                </div>
                            </div>
                            <div className='form--group'>
                                <Label>Last Name</Label>
                                <div className='input--group'>
                                    {/* <FiMail className='icon' /> */}
                                    <Input
                                        value={lName}
                                        onChange={(e) => {
                                            setLName(e.target.value);
                                        }}
                                        placeholder='Last Name'
                                        type='text'
                                    />
                                </div>
                            </div>
                        </FlexContainer>
                        <div className='form--group'>
                            <Label>Phone No.</Label>
                            <div className='input--group'>
                                {/* <FiMail className='icon' /> */}
                                <Input
                                    value={phone}
                                    onChange={(e) => {
                                        setPhone(e.target.value);
                                    }}
                                    placeholder='Phone No.'
                                    type='text'
                                />
                            </div>
                        </div>
                        <div className='form--group'>
                            <Label>Emergency No.</Label>
                            <div className='input--group'>
                                {/* <FiMail className='icon' /> */}
                                <Input
                                    value={ePhone}
                                    onChange={(e) => {
                                        setEPhone(e.target.value);
                                    }}
                                    placeholder='Emergency No.'
                                    type='text'
                                />
                            </div>
                        </div>
                        <FlexContainer gap='15px' justify='space-between'>
                            <div className='form--group'>
                                <Label>Gender</Label>
                                <div className='input--group'>
                                    {/* <FiMail className='icon' /> */}
                                    <Select
                                        defaultValue={'m'}
                                        onChange={(e) => {
                                            setGender(e.target.value);
                                        }}
                                    >
                                        <option value={'m'}>Male</option>
                                        <option value={'f'}>Female</option>
                                        <option value={'o'}>Other</option>
                                    </Select>
                                </div>
                            </div>
                            <div className='form--group'>
                                <Label>DOB</Label>
                                <div className='input--group'>
                                    {/* <FiMail className='icon' /> */}
                                    <Input
                                        value={DOB}
                                        onChange={(e) => {
                                            setDOB(e.target.value);
                                        }}
                                        className='input--date'
                                        type='date'
                                        placeholder='dob'
                                    />
                                </div>
                            </div>
                        </FlexContainer>
                        <div className='form--group'>
                            <Label>Address</Label>
                            <div className='input--group'>
                                <Textarea
                                    value={address}
                                    onChange={(e) => {
                                        setAddress(e.target.value);
                                    }}
                                    placeholder='Address'
                                />
                            </div>
                        </div>
                        <Submit onClick={(e) => submitHandler(e)}>
                            Submit {!isLoading && <FiCheck className='icon' />}
                        </Submit>
                    </form>
                </LoginContainer>
            </MobileContainer>
        </MaxContainer>
    );
};

export default OnBoard;

export async function getServerSideProps(context) {
    const data = context.params;
    const { token } = nookies.get(context);

    const isNewData = await axios.post(
        `${hostName}/users/is_new`,
        { email: data.email },
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            'Content-Type': 'application/json',
        }
    );

    console.log(isNewData.data.isNew);

    if (!isNewData.data.isNew)
        return {
            redirect: {
                destination: '/patient/appointment/new',
                permanent: false,
            },
            props: {},
        };

    return {
        props: {},
    };
}
