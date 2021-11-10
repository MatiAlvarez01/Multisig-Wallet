import React from "react";
import styled from "styled-components";

function Title() {
    return (
        <MainDiv>
            <Text>Multisig Wallet</Text>
        </MainDiv>
    )
}

export default Title;

const MainDiv = styled.div`
`
const Text = styled.p`
    color: grey;
    margin: 0 0 30px 0;
    font-size: 4rem;
    text-align: center;
    font-weight: 700;
    padding-top: 30px;
`