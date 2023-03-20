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
});
