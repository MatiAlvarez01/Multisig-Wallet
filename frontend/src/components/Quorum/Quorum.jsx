import React from "react";
import styled from "styled-components";

function Quorum({quorum}) {
    return (
        <MainDiv>
            <Value><TextSpan>Quorum:</TextSpan> {parseInt(quorum._hex)}</Value>
        </MainDiv>
    )
}

export default Quorum;

const MainDiv = styled.div`
    margin-left: 20px;
`
const TextSpan = styled.span`
    color: grey;
`
const Value = styled.p`
    color: coral;
`