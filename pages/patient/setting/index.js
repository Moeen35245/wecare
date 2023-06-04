import styled from 'styled-components';
import { FlexContainer, MaxContainer, MobileContainer } from '../../../components/Container.styled';
import nookies from 'nookies';
import { useRouter } from 'next/router';

const Container = styled.div`
    min-height: 100vh;
    width: 100%;
    position: relative;
    background-color: #fefae0;
    /* padding: 30px; */
    color: #023047;
    padding: 20px;
`;

const Logout = styled.button`
    height: 50px;
    width: 100%;
    /* background-color: rgba(255, 255, 255, 0.07); */
    border-radius: 10px / 13px;
    padding: 0 10px;
    margin-top: 30px;
    border: none;
    outline: none;
    background-color: #e63946;
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

const Setting = () => {
    const router = useRouter();

    return (
        <Container>
            <h1 style={{ textAlign: 'center' }}>Settings</h1>
            <Logout onClick={(e) => router.push('/')}>Logout</Logout>
        </Container>
    );
};

export default Setting;
