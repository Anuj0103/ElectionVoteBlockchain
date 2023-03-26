pragma solidity >=0.4.2;

contract Election {

 //model a Candidate

 struct Candidate{

  uint id;
  string name;
  uint voteCount;

 }

 //
  mapping(address => bool) public voters;

 //Read/Write candidate based on ids
 mapping(uint => Candidate) public candidates;

 //store candidates count
 uint public candidatesCount;

 
  event votedEvent (
    uint indexed _candidateId
  );

 
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

//we can specify metadata along with parameters while calling function such as the address of acc that is casting the vote using from:{}
  function vote(uint _candidateId) public {

    //require that they haven't voted before
    require(!voters[msg.sender]);

    //require a valid candidate
    require(_candidateId > 0 && _candidateId<=candidatesCount);
    //will throw an exception if false

    //record that voter has voted
    voters[msg.sender] = true;

    //update candidate vote count
    candidates[_candidateId].voteCount++;

    //trigger voted event
    emit votedEvent(_candidateId);
  }
}