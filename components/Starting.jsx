import styled from 'styled-components';
import { MobileContainer } from './Container.styled';
import { useRouter } from 'next/router';
// import Image from 'next/image';

const Container = styled.div`
    background-color: #1554f6;
    height: 100%;
    width: 100%;
    color: #fff;
    padding: 10px;
    position: relative;

    & h1 {
        text-align: center;
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
            border-radius: 0.6em;
            cursor: pointer;
            display: flex;
            align-self: center;
            font-size: 1rem;
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

const Starting = () => {
    const router = useRouter();
    return (
        <MobileContainer>
            <Container>
                <h1>WeCare</h1>
                <div className='img--container'>
                    <img src='/main.png' alt='' />
                </div>
                <div className='footer'>
                    <h4>More Comfortable Chat With Doctor</h4>
                    <p>
                        Book an appointment with doctor. Chat with doctor via appointment letter and get consultationt.
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
