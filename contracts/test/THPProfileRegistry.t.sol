// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Test, console} from "forge-std/Test.sol";
import {THPProfileRegistry} from "../THPProfileRegistry.sol";

contract THPProfileRegistryTest is Test {
    THPProfileRegistry public registry;
    address public user1 = address(0x1);
    address public user2 = address(0x2);

    function setUp() public {
        registry = new THPProfileRegistry();
    }

    function testSetProfile() public {
        vm.prank(user1);
        registry.setProfile("QmTest123", true);

        THPProfileRegistry.Profile memory profile = registry.getProfile(user1);
        assertEq(profile.owner, user1);
        assertEq(profile.profileURI, "QmTest123");
        assertTrue(profile.isPublic);
        assertGt(profile.updatedAt, 0);
    }

    function testUpdateProfile() public {
        vm.prank(user1);
        registry.setProfile("QmTest123", true);

        vm.prank(user1);
        registry.setProfile("QmTest456", false);

        THPProfileRegistry.Profile memory profile = registry.getProfile(user1);
        assertEq(profile.profileURI, "QmTest456");
        assertFalse(profile.isPublic);
    }

    function testGetAllProfiles() public {
        vm.prank(user1);
        registry.setProfile("QmTest123", true);

        vm.prank(user2);
        registry.setProfile("QmTest456", false);

        THPProfileRegistry.Profile[] memory profiles = registry.getAllProfiles();
        assertEq(profiles.length, 1);
        assertEq(profiles[0].owner, user1);
    }

    function testGetProfileCount() public {
        assertEq(registry.getProfileCount(), 0);

        vm.prank(user1);
        registry.setProfile("QmTest123", true);

        assertEq(registry.getProfileCount(), 1);

        vm.prank(user2);
        registry.setProfile("QmTest456", true);

        assertEq(registry.getProfileCount(), 2);
    }

    function testCannotSetEmptyURI() public {
        vm.prank(user1);
        vm.expectRevert("Profile URI cannot be empty");
        registry.setProfile("", true);
    }
}
