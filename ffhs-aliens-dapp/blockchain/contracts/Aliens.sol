// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract Aliens {
    address public owner;
    address payable[] public players;
    uint public aliensId;
    mapping (uint => address payable) public aliensHistory;

    constructor() {
        owner = msg.sender;
        aliensId = 1;
    }

    function getWinnerByAliens(uint aliens) public view returns (address payable) {
        return aliensHistory[aliens];
    }

    function getBalance() public view returns (uint) {
        return address(this).balance;
    }

    function getPlayers() public view returns (address payable[] memory) {
        return players;
    }

    function enter() public payable {
        require(msg.value > .01 ether);

        // address of player entering the alien name
        players.push(payable(msg.sender));
    }

    function getRandomNumber() public view returns (uint) {
        return uint(keccak256(abi.encodePacked(owner, block.timestamp)));
    }

    function pickWinner() public onlyowner {
        uint index = getRandomNumber() % players.length;
        players[index].transfer(address(this).balance);

        aliensHistory[aliensId] = players[index];
        aliensId++;
        
        // reward the winner

        // reset the state of the contract
        players = new address payable[](0);
    }

    modifier onlyowner() {
      require(msg.sender == owner);
      _;
    }
}