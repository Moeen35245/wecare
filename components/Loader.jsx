import styled, { keyframes } from 'styled-components';

const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Spinner = styled.div`
    border: ${(props) => (props.color ? `2px solid var(--green)` : '2px solid #009ef7')};
    display: inline-block;
    width: 25px;
    height: 25px;
    border-radius: 50%;
    border-top-color: #fff;
    animation: ${rotate360} 0.5s linear infinite;
    -webkit-animation: ${rotate360} 0.5s linear infinite;
`;

function Loader({ color }) {
    return <Spinner color={color} />;
}

export default Loader;
