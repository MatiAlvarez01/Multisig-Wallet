import React from "react";
import styled from "styled-components";

function DeclineTransfer({declineTransfer, transferID}) {

    function handleButtonClick() {
        declineTransfer(transferID);
    }

    return (
        <div>
            <Button onClick={handleButtonClick}>Decline Transfer</Button>
        </div>
    )
}

export default DeclineTransfer;

const Button = styled.button`
    background-color: #380e0e;
    color: white;
    border: solid 1px grey;
    padding: 2%;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
        border: solid 1px white;
    }
`