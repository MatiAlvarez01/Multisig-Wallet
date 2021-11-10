import React from "react";
import styled from "styled-components";

function ApproveTransfer({approveTransfer, transferID, setTransfers, multisig}) {

    function handleClickApprove() {
        approveTransfer(transferID)
        // .on("confirmation", async (one, receipt) => {
        //     const newTransfers = await multisig.getTransfers();
        //     setTransfers(newTransfers)
        //     console.log("tranfers actualizadas")
        // })
        // .on("error", console.log("Error Approve Transfer: ", console.error))
    }

    return (
        <div>
            <Button onClick={handleClickApprove}>Aprobar transferencia</Button>
        </div>
    )
}

export default ApproveTransfer;

const Button = styled.button`
    background-color: #021808;
    color: white;
    border: solid 1px grey;
    padding: 2%;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
        border: solid 1px white;
    }
`