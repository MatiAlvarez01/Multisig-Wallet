import React from "react";
import styled from "styled-components";

function Approvers({approvers}) {
    return (
        <MainDiv>
            <Address><TextSpan>Approver N°1:</TextSpan> {approvers[0]}</Address>
            <Address><TextSpan>Approver N°2:</TextSpan> {approvers[1]}</Address>
            <Address><TextSpan>Approver N°3:</TextSpan> {approvers[2]}</Address>
        </MainDiv>
    )
}

export default Approvers;

const MainDiv = styled.div`
    margin-left: 20px;
`
const TextSpan = styled.span`
    color: grey;
`
const Address = styled.p`
    color: coral;
`