import { ethers, Contract } from "ethers";
import Multisig from "./Multisig.json";

const getBlockchain = () => 
    new Promise((resolve, reject) => {
        window.addEventListener("load", async () => {
            if(window.ethereum) {
                await window.ethereum.enable();
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const signer = provider.getSigner();
                const signerAddress = await signer.getAddress();
                const multisig = new Contract(
                    Multisig.address,
                    Multisig.abi,
                    signer
                );
                resolve({signerAddress, multisig});
            }
            resolve({signerAddress: undefined, multisig: undefined})
        })
    })

export default getBlockchain;