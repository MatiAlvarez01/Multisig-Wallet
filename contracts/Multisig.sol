//SPDX-License-Identifier: MatiAlvarez21
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Multisig {
    address[] public approvers;
    uint public quorum;

    constructor(address[] memory _approvers, uint _quorum) {
        approvers = _approvers;
        quorum = _quorum;
    }

    struct Transfer {
        uint id;
        address payable to;
        uint amount;
        uint approvals;
        bool sent;
    }

    Transfer[] public transfers;

    mapping(address => mapping(uint => bool)) public approvals;

    function getTransfers() external view returns(Transfer[] memory) {
        return transfers;
    }

    function getApprovers() external view returns(address[] memory) {
        return approvers;
    }

    function getQuorum() external view returns(uint memotry) {
        return quorum;
    }

    function newTransfer(address payable to, uint amount) external onlyApprover() {
        transfers.push(Transfer(
            transfers.length,
            to,
            amount,
            0,
            false
        ));
    }

    function approveTransfer(uint id) external onlyApprover() {
        require(transfers[id].sent == false, "Transaction already sent.");
        require(approvals[msg.sender][id] == false, "Cannot approve transfer twice.");
        
        approvals[msg.sender][id] = true;
        transfers[id].approvals++;

        if (transfers[id].approvals >= quorum) {
            transfers[id].sent = true;
            address payable to = transfers[id].to;
            uint amount = transfers[id].amount;
            to.transfer(amount);
        }
    }

    function declineTransfer(uint id) external onlyApprover() {
        require(transfers[id].sent == false, "Transaction already sent.");
        require(approvals[msg.sender][id] == false, "Cannot decline transfer twice.");

        approvals[msg.sender][id] = true;
        transfers[id].approvals--;
    }

    receive() external payable {}

    modifier onlyApprover() {
        bool allowed = false;
        for (uint i=0; i<approvers.length; i++) {
            if(approvers[i] == msg.sender) {
                allowed = true;
            }
        }
        require(allowed == true, "Only approvers allowed");
        _;
    }
}