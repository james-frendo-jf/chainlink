// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
import "@chainlink/contracts/src/v0.8/ChainlinkClient.sol";

contract PriceConsumer is ChainlinkClient {
    using Chainlink for Chainlink.Request;

    uint256 public ethUsdPrice;
    address private oracle;
    bytes32 private jobId;
    uint256 private fee;

    constructor() {
        setPublicChainlinkToken();
        oracle = 0x6090149792dAAeE9D1D568c9f9a6F6B46AA29eFD;
        jobId = "7da2702f37fd48e5b1b9a5715e3509b6";
        fee = 2 * 10 ** 18;
    }

    function requestEthUsdPrice() public {
        require(LINK.balanceOf(address(this)) >= fee, "Not enough LINK");
        Chainlink.Request memory request = buildChainlinkRequest(jobId, address(this), this.fulfill.selector);
        sendChainlinkRequestTo(oracle, request, fee);
    }

    function fulfill(bytes32 _requestId, uint256 _price) public recordChainlinkFulfillment(_requestId) {
        ethUsdPrice = _price;
    }

    function getLatestPrice() public view returns (uint256) {
        return ethUsdPrice;
    }
}
