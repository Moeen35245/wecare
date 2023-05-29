import styled from 'styled-components';

export const MaxContainer = styled.div`
    max-width: 1440px;
    margin-left: auto;
    margin-right: auto;
    height: 100vh;
`;

export const MobileContainer = styled.div`
    max-width: 400px;
    margin-left: auto;
    margin-right: auto;
    height: 100vh;
    /* background-color: red; */
    /* text-align: center; */
`;

export const FlexContainer = styled.div`
    display: flex;
    justify-content: ${(props) => (props.justify ? props.justify : '')};
    gap: ${(props) => (props.gap ? props.gap : '0px')};
`;
