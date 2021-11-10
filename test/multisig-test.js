const { expect } = require("chai");
const { ethers, web3 } = require("hardhat");

describe("MultiSig", function() {
    let Multisig;
    let multisig;
    beforeEach(async function () {
        [owner, addr1, addr2, addr3, addr4, addr5] = await ethers.getSigners();
        Multisig = await ethers.getContractFactory("Multisig");
        multisig = await Multisig.deploy([addr1.address, addr2.address, addr3.address], 2);
        await multisig.deployed();
        await web3.eth.sendTransaction({from: addr1.address, to: multisig.address, value: 1000})
    });
    describe("Deployment", function () {
        it("Quorum should be 2", async function () {
            const quorum = await multisig.getQuorum();
            expect(quorum).to.equal(2);
        })
        it("Should have three approvers accounts", async function () {
            const approvers = await multisig.getApprovers()
            expect(approvers.length).to.equal(3)
        })
    });
    describe("Transactions", function () {
        it("Should have one transaction", async function () {
            await multisig.connect(addr1).newTransfer(addr5.address, 100);
            const transactions = await multisig.getTransfers();
            expect(transactions.length).to.equal(1);
            expect(transactions[0].amount).to.equal(100);
            expect(transactions[0].to).to.equal(addr5.address);
            expect(transactions[0].approvals).to.equal(0);
            expect(transactions[0].sent).to.equal(false)
        })
        it("Only approvers can create a new transfer [Happy path]", async function () {
            await multisig.connect(addr1).newTransfer(addr5.address, 100);
            await multisig.connect(addr2).newTransfer(addr4.address, 100);
            const transactions = await multisig.getTransfers();
            expect(transactions.length).to.equal(2);
        })
        it("Only approvers can create a new transfer [Sad path]", async function () {
        await multisig.connect(addr1).newTransfer(addr5.address, 100);
           await expect(
            multisig.connect(addr4).newTransfer(addr5.address, 100)
           ).to.be.revertedWith("Only approvers allowed")
           const transactions = await multisig.getTransfers();
            expect(transactions.length).to.equal(1);
        })
        it("Only approvers can approve a transfer [Happy path]", async function () {
            await multisig.connect(addr1).newTransfer(addr5.address, 100);
            await multisig.connect(addr2).approveTransfer(0);
            const transactions = await multisig.getTransfers();
            expect(transactions[0].approvals).to.equal(1);
        })
        it("Only approvers can approve a transfer [Sad path]", async function () {
            await multisig.connect(addr1).newTransfer(addr5.address, 100);
            await expect(
             multisig.connect(addr4).approveTransfer(0)
            ).to.be.revertedWith("Only approvers allowed")
            const transactions = await multisig.getTransfers();
             expect(transactions[0].approvals).to.equal(0);
        })
        it("Transfer cannot be approved from the same account twice", async function() {
            await multisig.connect(addr1).newTransfer(addr5.address, 100);
            await multisig.connect(addr2).approveTransfer(0);
            const transactions = await multisig.getTransfers();
            expect(transactions[0].approvals).to.equal(1);
            await expect(
                multisig.connect(addr2).approveTransfer(0)
            ).to.be.revertedWith("Cannot approve transfer twice")
            const transactions2 = await multisig.getTransfers();
            expect(transactions2[0].approvals).to.equal(1);
        })
        it("The transaction should be sent after reach the quorum", async function() {
            await multisig.connect(addr1).newTransfer(addr5.address, 100);
            await multisig.connect(addr2).approveTransfer(0);
            await multisig.connect(addr3).approveTransfer(0);
            const transactions = await multisig.getTransfers();
            expect(transactions[0].approvals).to.equal(2);
            expect(transactions[0].sent).to.equal(true);
        })
    })
})