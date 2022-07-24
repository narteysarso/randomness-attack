require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config({path: ".env"});
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.9",
  networks:{
    hardhat:{
      forking: {
        url: process.env.ALCHEMY_API_KEY_URL
      }
    }
  }
};
