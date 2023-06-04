import styled from 'styled-components';
import { FlexContainer, MaxContainer, MobileContainer } from '../../../../components/Container.styled';
import { FiFilePlus, FiCheck, FiX } from 'react-icons/fi';
import nookies from 'nookies';
import Navbar from '../../../../components/Navbar';
import { useState } from 'react';
import axios from 'axios';
import { hostName } from '../../../../helper/configue';
import Loader from '../../../../components/Loader';
import { toast } from 'react-toastify';
import { toastConfig } from '../../../../helper/toastify';

const Container = styled.div`
    min-height: 100%;
    width: 100%;
    position: relative;
    background-image: ${(props) => (props.img ? props.img : '')};
    background-repeat: no-repeat;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
    color: #023047;
    /* padding-top: 60px; */

    & > img {
        width: 100%;
        object-fit: cover;
    }

    & .form--group {
        width: 100%;
    }
`;

const Popup = styled.div`
    position: absolute;
    top: 7%;
    left: 50%;
    transform: translateX(-50%);
    background-color: white;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
    width: 90%;
    z-index: 5;
    padding: 20px;
    border-radius: 13px / 10px;

    & .icon {
        display: block;
        height: 20px;
        width: 20px;
        margin-left: auto;
        cursor: pointer;
    }
`;

const Overlay = styled.div`
    height: 100vh;
    width: 100vw;
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.2);
    z-index: 1;
`;

const Label = styled.label`
    color: #023047;
    display: block;
    margin-top: 20px;
    font-size: 16px;
    font-weight: 500;
    margin-left: 6px;
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
    background-color: whitesmoke;
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

const Submit = styled.button`
    position: absolute;
    bottom: 90px;
    left: 50%;
    transform: translateX(-50%);
    height: 30px;
    width: 60%;
    margin-left: auto;
    margin-right: auto;
    /* background-color: rgba(255, 255, 255, 0.07); */
    border-radius: 7px / 5px;
    padding: 20px 10px;
    margin-top: 30px;
    border: none;
    outline: none;
    background-color: #1554f6;
    font-size: 14px;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    cursor: pointer;

    & > .icon {
        height: 16px;
        width: 16px;
    }
`;

const Textarea = styled.textarea`
    display: block;
    /* height: 50px; */
    width: 100%;
    background-color: whitesmoke;
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

const SubmitForm = styled.button`
    /* position: absolute;
    bottom: 90px;
    left: 50%;
    transform: translateX(-50%); */
    height: 30px;
    width: 60%;
    margin-left: auto;
    margin-right: auto;
    /* background-color: rgba(255, 255, 255, 0.07); */
    border-radius: 7px / 5px;
    padding: 20px 10px;
    margin-top: 30px;
    border: none;
    outline: none;
    background-color: #1554f6;
    font-size: 14px;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    cursor: pointer;

    & > .icon {
        height: 16px;
        width: 16px;
    }
`;

const getImage = (name) => {
    if (name === 'Greenleaf Hospital') {
        return '/Greenleaf.jpg';
    }
    if (name === 'Serene Medical Center') {
        return '/SereneMedical.jpg';
    }
    if (name === 'Sunshine Health Institute') {
        return '/SunshineHealth.jpg';
    }
    if (name === 'Lotus General Hospital') {
        return '/LotusGeneral.jpg';
    }
};

const BookAppointment = ({ name }) => {
    const [reason, setReason] = useState('');
    const [time, setTime] = useState('');
    const [date, setDate] = useState('');
    const [type, setType] = useState('new');
    const [isLoading, setIsLoading] = useState(false);
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const submitHandler = (e) => {
        e.preventDefault();

        if (!time || !date || !type || !reason) {
            toast.error('All Fields Required', toastConfig());
            return;
        }

        const today = new Date();
        const currDate = new Date(date);

        if (currDate < today) {
            toast.error('past dates not allowed', toastConfig());
            return;
        }
        setIsLoading(true);
        const { email, token } = nookies.get();

        console.log(date, ' ', time);
        axios
            .post(
                `${hostName}/appointments/book`,
                {
                    email: email,
                    hospital: name,
                    type: type,
                    reason: reason,
                    date: time + ' ' + date,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    'Content-Type': 'application/json',
                }
            )
            .then((res) => {
                console.log(res.data);
                if (res.status === 201) {
                    toast.success('Appointment booked', toastConfig());
                    setIsPopupOpen(false);
                }
            })
            .catch((err) => {
                toast.error('Something went wrong', toastConfig());
                console.log('something went wrong', err);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    return (
        <MaxContainer>
            <MobileContainer>
                <Container>
                    {isPopupOpen && (
                        <Popup>
                            <div onClick={(e) => setIsPopupOpen(false)}>
                                <FiX className='icon' />
                            </div>
                            <form className='form'>
                                <div className='form--group'>
                                    <Label>Type:</Label>
                                    <div className='input--group'>
                                        {/* <FiMail className='icon' /> */}
                                        <Select>
                                            <option>New</option>
                                            {/* <option>Follow Up</option> */}
                                        </Select>
                                    </div>
                                </div>
                                <FlexContainer gap='20px' justify='space-between'>
                                    <div className='form--group'>
                                        <Label>Time:</Label>
                                        <div className='input--group'>
                                            {/* <FiMail className='icon' /> */}
                                            <Input
                                                value={time}
                                                onChange={(e) => {
                                                    setTime(e.target.value);
                                                }}
                                                className='input--date'
                                                type='time'
                                                placeholder='time'
                                            />
                                        </div>
                                    </div>
                                    <div className='form--group'>
                                        <Label>Date:</Label>
                                        <div className='input--group'>
                                            {/* <FiMail className='icon' /> */}
                                            <Input
                                                value={date}
                                                onChange={(e) => {
                                                    setDate(e.target.value);
                                                }}
                                                className='input--date'
                                                type='date'
                                                placeholder='date'
                                            />
                                        </div>
                                    </div>
                                </FlexContainer>
                                <div className='form--group'>
                                    <Label>Reason:</Label>
                                    <div className='input--group'>
                                        {/* <FiMail className='icon' /> */}
                                        <Textarea
                                            value={reason}
                                            onChange={(e) => {
                                                setReason(e.target.value);
                                            }}
                                            placeholder='Reason'
                                        />
                                    </div>
                                </div>
                                <SubmitForm disable={isLoading} onClick={(e) => submitHandler(e)}>
                                    {isLoading ? <Loader /> : 'Submit'}{' '}
                                </SubmitForm>
                            </form>
                        </Popup>
                    )}
                    {isPopupOpen && <Overlay />}
                    <img alt='' src={getImage(name)} />
                    <Submit onClick={(e) => setIsPopupOpen(true)}>
                        Book a new appointment <FiFilePlus className='icon' />
                    </Submit>

                    <Navbar />
                </Container>
            </MobileContainer>
        </MaxContainer>
    );
};

export default BookAppointment;

export async function getServerSideProps(context) {
    const { hospital } = context.params;
    console.log(hospital);

    return {
        props: {
            name: hospital,
        },
    };
}
