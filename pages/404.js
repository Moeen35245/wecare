import styled from 'styled-components';

const Container = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const Error = () => {
    return (
        <Container>
            <h1>Page Not Found</h1>
        </Container>
    );
};

export default Error;
