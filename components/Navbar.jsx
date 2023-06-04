import styled from 'styled-components';
import { MaxContainer, MobileContainer } from './Container.styled';
import { FlexContainer } from './Container.styled';
import { useRouter } from 'next/router';
const NavContainer = styled.div`
    z-index: 10;
    position: fixed;
    bottom: 0;
    left: 0;
    height: 80px;
    width: 100%;
    /* background-color: yellow; */
    border-radius: 10 / 14;
    padding: 10px;
`;

const Nav = styled.div`
    width: 100%;
    height: 100%;
    background-color: white;
    border-radius: 10px / 13px;
    padding: 10px;
    box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;

    & img {
        height: 30px;
        cursor: pointer;
    }

    & .point {
        margin-left: 10px;
        height: 6px;
        width: 16px;
        background-color: green;
        border-radius: 99px;
    }
`;

const Navbar = ({ active }) => {
    const router = useRouter();
    return (
        <NavContainer>
            <Nav>
                <FlexContainer justify='space-around'>
                    <div onClick={(e) => router.push('/patient/appointment/prev')} className=''>
                        <img alt='' src='/prevA.png' />
                        {active === 'prev' && <div className='point active'></div>}
                    </div>
                    <div onClick={(e) => router.push('/patient/appointment/upcoming')} className=''>
                        <img alt='' src='/upA.png' />
                        {active === 'upcoming' && <div className='point active'></div>}
                    </div>
                    <div onClick={(e) => router.push('/patient/appointment/new')} className=''>
                        <img alt='' src='/bookA.png' />
                        {active === 'new' && <div className='point active'></div>}
                    </div>
                    <div onClick={(e) => router.push('/patient/setting')} className=''>
                        <img alt='' src='/setting.png' />
                        {active === 'setting' && <div className='point active'></div>}
                    </div>
                </FlexContainer>
            </Nav>
        </NavContainer>
    );
};
export default Navbar;
