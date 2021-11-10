import React, { useState } from "react";
import styled from "styled-components";

function NewTransfer({newTransfer, setTransfers, multisig}) {
    const [obj, setObj] = useState({
        Address: "",
        Amount: 0
    })

    function handleInputChange(e) {
        setObj({
            ...obj,
            [e.target.name]: e.target.value
        })
    }

    async function handleSubmit(e) {
        e.preventDefault();
        newTransfer(obj.Address, obj.Amount)
        // .on("confirmation", async(one, receipt) => {
        //     const newTransfers = await multisig.getTransfers();
        //     setTransfers(newTransfers)
        //     console.log("tranfers actualizadas")
        // })
        // .on("error", console.log("Error Approve Transfer: ", console.error))
    }

    return (
        <MainDiv>
            <Form>
                <Label>To:</Label>
                <Input 
                    placeholder="Address"
                    name="Address"
                    onChange={handleInputChange}
                    value={obj.Address}
                />
                <Label>Amount:</Label>
                <Input 
                    placeholder="Amount"
                    name="Amount"
                    onChange={handleInputChange}
                    value={obj.Amount}
                />
                <Button onClick={handleSubmit} type="submit">Send</Button>
            </Form>
        </MainDiv>
    )
}

export default NewTransfer;

const MainDiv = styled.div`
`
const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    line-height: 50px;
`
const Label = styled.label`
    color: grey;
    font-size: 25px;
`
const Input = styled.input(({name}) => `
    text-align: center;
    font-size: 22px;
    width: 60%;
    color: coral;
    background-color: #1d1d1d;
    border: none;

    @media screen and (min-width: 1920px) {
        width: 32%;
    }
`)
const Button = styled.button`
    font-size: 24px;
    margin: 15px 0 30px 0%;
    background-color: #181818;
    border: solid 1px coral;
    border-radius: 25px;
    padding: 15px;
    color: white;
    cursor: pointer;

    &:hover {
        background-color: black;
        border: solid 1px grey;
    }
`