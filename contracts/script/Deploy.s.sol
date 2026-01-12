// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Script, console} from "forge-std/Script.sol";
import {THPProfileRegistry} from "../THPProfileRegistry.sol";

contract DeployScript is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);

        THPProfileRegistry registry = new THPProfileRegistry();

        console.log("THPProfileRegistry deployed at:", address(registry));

        vm.stopBroadcast();
    }
}
