pragma solidity >=0.4.2;

contract Election {

 //model a Candidate

 struct Candidate{

  uint id;
  string name;
  uint voteCount;

 }

 //Read/Write candidate based on ids
 mapping(uint => Candidate) public candidates;

 //store candidates count
 uint public candidatesCount;

 
 constructor() public{

   addCandidate("Candidate 1");
   addCandidate("Candidate 2");
  //  addCandidate("Candidate 3");
  //  addCandidate("Candidate 4");
 }

 function addCandidate(string memory _name) private{
  candidatesCount++;
  candidates[candidatesCount] = Candidate(candidatesCount, _name, 0);
 }

}