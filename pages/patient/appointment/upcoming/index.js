import styled from 'styled-components';
import { useState } from 'react';
import { FlexContainer, MaxContainer, MobileContainer } from '../../../../components/Container.styled';
import nookies from 'nookies';
import axios from 'axios';
import { hostName } from '../../../../helper/configue';
import Navbar from '../../../../components/Navbar';
import { getTime, getDate } from '../../../../helper/dateNTime';
import { FiX, FiNavigation, FiMap } from 'react-icons/fi';

const Container = styled.div`
    min-height: 100%;
    width: 100%;
    position: relative;
    background-color: #fefae0;
    color: #023047;
    padding-top: 60px;
`;

const AppointmentContainer = styled.div`
    padding: 10px 30px;
`;

const AppointmentDiv = styled.div`
    border: 1px solid #023047;
    padding: 10px 10px;
    border-radius: 13px / 15px;

    & .span {
        font-weight: bold;
        color: #035077;
    }

    & img {
        width: 80px;
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
    padding: 20px 20px 50px 20px;
    border-radius: 13px / 10px;

    & .img--container {
        display: flex;
        justify-content: center;
        align-items: center;

        & > img {
            background-color: #fefae0;
            width: 130px;
            border-radius: 999px;
            margin-bottom: 20px;
        }
    }

    & .span {
        font-weight: bold;
        color: #035077;
    }

    & .icon {
        display: block;
        height: 20px;
        width: 20px;
        margin-left: auto;
        cursor: pointer;
    }

    & .data--container {
        text-align: center;

        & p {
            font-size: 20px;
            margin-bottom: 5px;
        }
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

const Button = styled.button`
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

const getImage = (name) => {
    if (name === 'Greenleaf Hospital') {
        return '/Greenleaf.png';
    }
    if (name === 'Serene Medical Center') {
        return '/SMC.png';
    }
    if (name === 'Sunshine Health Institute') {
        return '/Sunshine.png';
    }
    if (name === 'Lotus General Hospital') {
        return '/Lotus.png';
    }
};

const PopupModel = ({ data, setIsPopupOpen }) => {
    return (
        <Popup>
            <div onClick={(e) => setIsPopupOpen(false)}>
                <FiX className='icon' />
            </div>
            <div className='img--container'>
                <img src={getImage(data.hospital)} />
            </div>
            <div className='data--container'>
                <p>
                    Scheduled on: <span className='span'>{getDate(data.date)}</span>{' '}
                </p>
                <p>
                    Time: <span className='span'>{getTime(data.date)}</span>
                </p>
                <p>
                    Appointment Type: <span className='span'>{data.type}</span>
                </p>
            </div>
            <Button>Navigate</Button>
            <Button>See Map</Button>
        </Popup>
    );
};

const UpComing = ({ data }) => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [popupData, setPopupData] = useState({});
    console.log(data);
    const appointments = data.data;

    return (
        <MaxContainer>
            <MobileContainer>
                <Container>
                    {isPopupOpen && <PopupModel data={popupData} setIsPopupOpen={setIsPopupOpen} />}
                    {isPopupOpen && <Overlay onClick={(e) => setIsPopupOpen(false)}></Overlay>}
                    {appointments ? (
                        appointments.map((item, i) => (
                            <AppointmentContainer
                                onClick={(e) => {
                                    setPopupData(item);
                                    setIsPopupOpen(true);
                                }}
                                key={i}
                            >
                                <AppointmentDiv>
                                    <FlexContainer justify='space-between'>
                                        <div>
                                            <p>
                                                Scheduled on: <span className='span'>{getDate(item.date)}</span>{' '}
                                            </p>
                                            <p>
                                                Time: <span className='span'>{getTime(item.date)}</span>
                                            </p>
                                            <p>
                                                Appointment Type: <span className='span'>{item.type}</span>
                                            </p>
                                        </div>
                                        <div>
                                            <img src={getImage(item.hospital)} alt='' />
                                        </div>
                                    </FlexContainer>
                                </AppointmentDiv>
                            </AppointmentContainer>
                        ))
                    ) : (
                        <FlexContainer justify='center'>
                            <div style={{ textAlign: 'center' }}>
                                <p>Uh oh!</p>
                                <p>You have no previous appointments.</p>
                            </div>
                        </FlexContainer>
                    )}
                    <Navbar active={'upcoming'} />
                </Container>
            </MobileContainer>
        </MaxContainer>
    );
};

export default UpComing;

export async function getServerSideProps(context) {
    // const data = context.params;
    const { token } = nookies.get(context);
    const { email } = nookies.get(context);
    console.log(token, email);

    const data = await axios.post(
        `${hostName}/appointments/`,
        { email: email },
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            'Content-Type': 'application/json',
        }
    );

    console.log(data.data);

    return {
        props: {
            data: data.data,
        },
    };
}
