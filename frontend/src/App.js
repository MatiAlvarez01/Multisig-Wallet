import React, { useEffect, useState } from "react"
import styled from "styled-components";
import getBlockchain from "./ethereum";
import Approvers from "../src/components/Approvers/Approvers";
import Quorum from "../src/components/Quorum/Quorum";
import Transfers from "./components/Transfers/Transfers";
import NewTransfer from "./NewTransfer/NewTransfer";
import Title from "./components/Texts/Title";

function App() {
  const [multisig, setMultisig] = useState(undefined);
  const [approvers, setApprovers] = useState(undefined);
  const [quorum, setQuorum] = useState(undefined);
  const [transfers, setTransfers] = useState(undefined);

  useEffect(() => {
    const init = async () => {
      const { multisig } = await getBlockchain();
      const approvers = await multisig.getApprovers();
      const quorum = await multisig.getQuorum();
      const transfers = await multisig.getTransfers();

      setMultisig(multisig);
      setApprovers(approvers);
      setQuorum(quorum);
      setTransfers(transfers);
    };
    init();
  }, [])

  if (
    typeof multisig === "undefined" ||
    typeof approvers === "undefined" ||
    typeof quorum === "undefined" ||
    typeof transfers === "undefined") {
    return "Loading..."
  }

  return (
    <MainSection>
      <Title />
      <Approvers approvers={approvers}/>
      <Quorum quorum={quorum}/>
      <NewTransfer 
        newTransfer={multisig.newTransfer}
        transfers={transfers}
        setTransfers={setTransfers}
        multisig={multisig}
      />
      <Transfers
        transfers={transfers}
        setTransfers={setTransfers}
        approveTransfer={multisig.approveTransfer}
        declineTransfer={multisig.declineTransfer}
        multisig={multisig}
      />
    </MainSection>
  );
}

export default App;

const MainSection = styled.section`
  background-color: #181818;
  min-height: 100vh;
  margin: 0;
`
