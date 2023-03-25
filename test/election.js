var Election = artifacts.require('./Election.sol');

//Twisting the basic structure of the Mocha test a little, the Truffle test program starts with the contract() function and contains it() functions as test cases inside it².

contract('Election', function (accounts) {
  var electionInstance;

  it('initializes with two candidates', function () {
    return Election.deployed()
      .then(function (instance) {
        return instance.candidatesCount();
      })
      .then(function (count) {
        assert.equal(count, 2);
      });
  });

  it('it initializes the candidates with correct values', function () {
    return Election.deployed()
      .then(function (instance) {
        electionInstance = instance;
        return electionInstance.candidates(1);
      })
      .then(function (candidate) {
        assert.equal(candidate[0], 1, 'Correct id');
        assert.equal(candidate[1], 'Candidate 1', 'Correct name');
        assert.equal(candidate[2], 0, 'Correct vote count');
        return electionInstance.candidates(2);
      })
      .then(function (candidate) {
        assert.equal(candidate[0], 2, 'Correct id');
        assert.equal(candidate[1], 'Candidate 2', 'Correct name');
        assert.equal(candidate[2], 0, 'Correct vote count');
      });
  });

  it('allows a voter to cast a vote', function () {
    return Election.deployed()
      .then(function (instance) {
        electionInstance = instance;
        candidateId = 1;
        return electionInstance.vote(candidateId, { from: accounts[0] });
      })
      .then(function (receipt) {
        return electionInstance.voters(accounts[0]);
      })
      .then(function (voted) {
        assert(voted, 'the voter was marked as voted');
        return electionInstance.candidates(candidateId);
      })
      .then(function (candidate) {
        var voteCount = candidate[2];
        assert.equal(voteCount, 1, "increments the candidate's vote count");
      });
  });

  it('throws an exception for invalid candidates', function () {
    return Election.deployed()
      .then(function (instance) {
        electionInstance = instance;
        return electionInstance.vote(99, { from: accounts[1] });
      })
      .then(assert.fail)
      .catch(function (err) {
        assert(
          err.message.indexOf('revert') >= 0,
          'error message must contain revert'
        );
        return electionInstance.candidates(1);
      })
      .then(function (candidate1) {
        var voteCount = candidate1[2];
        assert.equal(voteCount, 1, 'candidate 1 did not receive any votes');
        return electionInstance.candidates(2);
      })
      .then(function (candidate2) {
        var voteCount = candidate2[2];
        assert.equal(voteCount, 0, 'candidate 2 did not receive any votes');
      });
  });
});
