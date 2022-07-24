const { ethers } = require("hardhat");
const { expect } = require("chai");
const {loadFixture} = require("@nomicfoundation/hardhat-network-helpers");
const { VRF_COORDINATOR, LINK_TOKEN, KEY_HASH } = require("../constants");

describe("Attack", function () {

    async function setup(){
        const GameContract = await ethers.getContractFactory("Game");
        const game = await GameContract.deploy({ value: ethers.utils.parseEther("0.1") });
    
        // Deploy the attack contract
        const AttackContract = await ethers.getContractFactory("Attack");
        const attack = await AttackContract.deploy(game.address);
        
        return {game, attack}
    }

    async function setup2(){
        const VRF_FEE =  ethers.utils.parseEther("0.0001");
        const GameContract = await ethers.getContractFactory("RandmonessAttackResistantGame");
        const game = await GameContract.deploy(VRF_COORDINATOR, LINK_TOKEN, KEY_HASH, VRF_FEE, { value: ethers.utils.parseEther("0.1") });

        await game.deployed()
        // Deploy the attack contract
        const AttackContract = await ethers.getContractFactory("Attack");
        const attack = await AttackContract.deploy(game.address);
        await attack.deployed();
        
        return {game, attack}
    }
  it("Should be able to guess the exact number", async function () {
    const {game, attack} = await loadFixture(setup)
    const tx = await attack.attack();
    await tx.wait();

    const balanceGame = await game.getBalance();
    // Balance of the Game contract should be 0
    expect(balanceGame).to.equal(0);
  });

  it("Should not be able to guess the exact number", async function () {
    const {game, attack} = await loadFixture(setup2)
    const tx = await attack.attack();
    await tx.wait();

    await sleep(30000);

    const balanceGame = await game.getBalance();
    // Balance of the Game contract should be 0
    expect(balanceGame).to.not.equal(0);
  });
});