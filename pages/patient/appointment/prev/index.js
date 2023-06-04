import Navbar from '../../../../components/Navbar';
import { FlexContainer, MobileContainer, MaxContainer } from '../../../../components/Container.styled';
import styled from 'styled-components';

const Container = styled.div`
    min-height: 100%;
    width: 100%;
    position: relative;
    background-color: #fefae0;
    color: #023047;
    padding-top: 60px;
`;
const Prev = () => {
    return (
        <MaxContainer>
            <MobileContainer>
                <Container>
                    <FlexContainer justify='center'>
                        <div style={{ textAlign: 'center' }}>
                            <p>Uh oh!</p>
                            <p>You have no previous appointments.</p>
                        </div>
                    </FlexContainer>

                    <Navbar active={'prev'} />
                </Container>
            </MobileContainer>
        </MaxContainer>
    );
};

export default Prev;
