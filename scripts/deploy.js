// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");
const fs = require("fs");

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  [owner, addr1, addr2, addr3] = await ethers.getSigners();
  const Multisig = await hre.ethers.getContractFactory("Multisig");
  const multisig = await Multisig.deploy([addr1.address, addr2.address, addr3.address], 2);

  await multisig.deployed();

  const data = {
    address: multisig.address,
    abi: JSON.parse(multisig.interface.format("json"))
  };
  
  fs.writeFileSync("frontend/src/Multisig.json", JSON.stringify(data));
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
