import styled from 'styled-components';
import { FlexContainer, MaxContainer, MobileContainer } from '../../../../components/Container.styled';
import nookies from 'nookies';
const Container = styled.div`
    min-height: 100%;
    width: 100%;
    position: relative;
    background-color: #fefae0;
    /* padding: 30px; */
    color: #023047;
    padding: 60px 0;
`;

const HospitalContainer = styled.div`
    padding: 10px 30px;
    /* background-color: orangered; */
`;

const HospitalDiv = styled.div`
    border: 1px solid #023047;
    padding: 10px 10px;
    border-radius: 13px / 15px;

    & h1 {
        font-size: 20px;
        /* margin-bottom: 10px; */
    }

    & p {
        font-size: 14px;
    }

    & img {
        width: 70px;
        /* height: 100%; */
        /* width: 32px; */
    }
`;

const hospitalData = [
    {
        heading: 'Greenleaf Hospital',
        desc: 'Cultivating Health and Renewed Well-being',
        logo: '/Greenleaf.png',
    },
    {
        heading: 'Serene Medical Center',
        desc: 'Cultivating Health and Renewed Well-being',
        logo: '/SMC.png',
    },
    {
        heading: 'Sunshine Health Institute',
        desc: 'Illuminating Your Path to Optimal Wellness',
        logo: '/Sunshine.png',
    },
    {
        heading: 'Lotus General Hospital',
        desc: 'Blossoming Excellence in Health Care',
        logo: '/Lotus.png',
    },
];

import Navbar from '../../../../components/Navbar';
import { useRouter } from 'next/router';
const NewAppointment = () => {
    const router = useRouter();
    return (
        <>
            <MaxContainer>
                <MobileContainer>
                    <Container>
                        {/* <p>You have no previous appointment</p> */}
                        <div>
                            {hospitalData.map((item, i) => (
                                <HospitalContainer key={i}>
                                    <HospitalDiv>
                                        <FlexContainer justify='space-between'>
                                            <div
                                                onClick={(e) => router.push(`/patient/appointment/new/${item.heading}`)}
                                            >
                                                <h1>{item.heading}</h1>
                                                <p>{item.desc}</p>
                                            </div>
                                            <div>
                                                <img alt='' src={item.logo} />
                                            </div>
                                        </FlexContainer>
                                    </HospitalDiv>
                                </HospitalContainer>
                            ))}
                        </div>
                        <Navbar active={'new'} />
                    </Container>
                </MobileContainer>
            </MaxContainer>
        </>
    );
};

export default NewAppointment;
