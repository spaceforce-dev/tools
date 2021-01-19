let web3Service = require('../../web3-service');
let DELEGATE_CONTRACT_ABI = require('../../DELEGATE_CONTRACT_ABI.json');

class RewardDelegatingService {

  constructor(address) {
    this._contract = new web3Service.web3.eth.Contract(DELEGATE_CONTRACT_ABI, address);
  }

  get contract() {
    return this._contract;
  }

  async balanceOf(address) {
    return this.contract.methods.balanceOf(address).call();
  }

  async mapAddress(ethAddress, sidechainAddress, sidechainSignature) {
    let isMapped;
    try {
      const options = { from: ethAddress };
      await this.contract.methods.linkAddresses(sidechainAddress, sidechainSignature, ethAddress.toLowerCase()).send(options);
    } catch (e) {
      console.error('[ERROR] Unable to get map address');
      isMapped = false;
    }
    return isMapped;
  }

  async isAddressMapped(ethAddress, targetAddress) {
    const data = {};
    try {
      const sidechainUser = await this.contract.methods.sidechainUser(ethAddress, targetAddress).call();
      data.isMapped = !!sidechainUser[0];
      data.info = sidechainUser;
    } catch (e) {
      console.error('[ERROR] Unable to get mapped addresses from contract');
    }
    return data;
  }

  async getUserRequestedAmounts(ethAddress) {
    try {
      return this.contract.methods.getRequestedRewardArray(ethAddress).call();
    } catch (e) {
      console.error('[ERROR] Unable to get requested rewards from contract');
      return [];
    }
  }

  async requestReward(proof, address, amount, isFullWithdraw) {
    try {
      const hash = await this.contract.methods.requestTokensByMerkleProof(proof, amount, isFullWithdraw).send({ from: address });
      return hash.transactionHash;
    } catch (e) {
      console.error('[ERROR] Unable to send request trx');
      throw e;
    }
  }

  async receiveReward(index, address) {
    try {
      const hash = await this.contract.methods.receiveReward(index).send({ from: address });
      return hash.transactionHash;
    } catch (e) {
      console.error('[ERROR] Unable to send receive trx');
      throw e;
    }
  }

  async getLastClaimTimestamp(ethAddress) {
    return this.contract.methods.lastRewardRequestTime(ethAddress).call();
  }

  async getLastMerkleUpdateTimestamp() {
    return this.contract.methods.merkleRootLastUpdateTime().call();
  }

};

module.exports = RewardDelegatingService;
