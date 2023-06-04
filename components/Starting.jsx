import styled from 'styled-components';
import { MobileContainer } from './Container.styled';
import { useRouter } from 'next/router';

// import Image from 'next/image';

const Container = styled.div`
    background: url('/1.jpg') no-repeat center center;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
    height: 100%;
    width: 100%;
    color: #fff;
    padding: 10px;
    position: relative;
    /* overflow: hidden; */

    & h1 {
        text-align: center;
        font-size: 60px;
        z-index: 1;
        position: absolute;
        top: 35%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    & .img--container {
        display: flex;
        justify-content: center;

        & > img {
            height: 500px;
            width: auto;
        }
    }

    & .footer {
        height: 35%;
        width: 100%;
        background-color: #fff;
        /* background: rgba(0, 0, 0, 0.1);
        backdrop-filter: blur(5px); */
        border-top-right-radius: 30px;
        border-top-left-radius: 30px;
        position: absolute;
        left: 0;
        bottom: 0;
        color: #000;
        padding: 30px;
        /* display: flex;
        flex-direction: column; */
        /* justify-content: center; */
        /* gap: 5px; */

        & h4 {
            /* margin-top: 10px; */
            font-size: 24px;
            text-align: center;
            /* background-color: red; */
            margin-bottom: 10px;
        }

        & p {
            color: #3d3d3d;
            text-align: center;
            /* background-color: red; */
        }

        & .btn--container {
            display: flex;
            justify-content: center;
        }

        & .btn {
            box-sizing: border-box;
            appearance: none;
            background-color: transparent;
            border: 2px solid #1554f6;
            color: #1554f6;
            border-radius: 10px / 13px;
            cursor: pointer;
            display: flex;
            align-self: center;
            font-size: 14px;
            font-weight: 400;
            line-height: 1;
            margin: 20px;
            padding: 1.2em 2.8em;
            text-decoration: none;
            text-align: center;
            text-transform: uppercase;
            font-family: 'Montserrat', sans-serif;
            font-weight: 700;

            transition: box-shadow 300ms ease-in-out, #1554f6 300ms ease-in-out;
            &:hover {
                box-shadow: 0 0 40px 40px #1554f6 inset;
            }

            &:hover,
            &:focus {
                color: #fff;
                outline: 0;
            }
        }

        & .btn-2 {
            border: 2px solid #f94144;
            color: #f94144;

            transition: box-shadow 300ms ease-in-out, #f94144 300ms ease-in-out;
            &:hover {
                box-shadow: 0 0 40px 40px #f94144 inset;
            }
        }
    }
`;

const Overlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    /* filter: blur(4px); */
    backdrop-filter: blur(2px);
    background-color: rgba(0, 0, 0, 0.2);
    z-index: 0;
`;

const Starting = () => {
    const router = useRouter();
    return (
        <MobileContainer>
            <Container>
                <Overlay />
                <h1>WeCare</h1>

                {/* <div className='img--container'>
                    <img src='/main.png' alt='' />
                </div> */}
                <div className='footer'>
                    <h4>We Care: Redefining Healthcare Access</h4>
                    <p>
                        Experience a new era of healthcare accessibility with We Care. Instantly book appointments at
                        top-rated hospitals, putting your health first, always.
                    </p>
                    <div className='btn--container'>
                        <button onClick={(e) => router.push('/signup')} className='btn'>
                            SignUp
                        </button>
                        <button onClick={(e) => router.push('/login')} className='btn btn-2'>
                            Login
                        </button>
                    </div>
                </div>
            </Container>
        </MobileContainer>
    );
};

export default Starting;
