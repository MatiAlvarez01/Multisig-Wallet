import React from "react";
import styled from "styled-components";
import ApproveTransfer from "../ApproveTransfer/ApproveTransfer";
import DeclineTransfer from "../DeclineTransfer/DeclineTransfer";


function Transfers({transfers, setTransfers, approveTransfer, declineTransfer, multisig}) {
    if (transfers.length > 0) {
        return (
            <MainDiv>
                {transfers.map((transfer, index) => 
                <TransferDiv key={index}>
                    <div>
                        <p>To: {transfer.to}</p>
                        <p>Amount: {parseInt(transfer.amount._hex)} eth</p>
                        <p>Approvals: {parseInt(transfer.approvals._hex)}</p>
                        <p>Sent: {transfer.sent ? "Yes" : "No"}</p>
                    </div>
                    <ButtonsDiv>
                        <ApproveTransfer 
                            approveTransfer={approveTransfer}
                            transferID={index}
                            setTransfers={setTransfers}
                        />
                        <DeclineTransfer 
                            declineTransfer={declineTransfer}
                            transferID={index}
                            setTransfers={setTransfers}
                            multisig={multisig}
                        />
                    </ButtonsDiv>
                </TransferDiv>)}
            </MainDiv>
        )
    } else {
        return(
            <MainDiv>
                <p>No hay ninguna transferencia</p>
            </MainDiv>
        )
    }
}

export default Transfers;

const MainDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`
const TransferDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    background-color: grey;
    border-radius: 15px;
    padding: 2%;
    margin: 10px;
`
const ButtonsDiv = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
    width: 100%;
`