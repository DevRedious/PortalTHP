// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title THPProfileRegistry
 * @notice Registry décentralisé pour les profils THP
 * @dev Stocke uniquement les URIs IPFS, les données sont hors chaîne
 */
contract THPProfileRegistry is Ownable {
    struct Profile {
        address owner;
        string profileURI; // CID IPFS
        bool isPublic;
        uint256 updatedAt;
    }

    mapping(address => Profile) public profiles;
    address[] public profileOwners;

    event ProfileCreated(
        address indexed owner,
        string profileURI,
        bool isPublic
    );
    event ProfileUpdated(
        address indexed owner,
        string profileURI,
        bool isPublic
    );

    constructor() Ownable(msg.sender) {}

    /**
     * @notice Crée ou met à jour un profil
     * @param profileURI Le CID IPFS du profil JSON
     * @param isPublic Visibilité publique du profil
     */
    function setProfile(
        string memory profileURI,
        bool isPublic
    ) external {
        require(bytes(profileURI).length > 0, "Profile URI cannot be empty");

        bool isNewProfile = profiles[msg.sender].owner == address(0);

        profiles[msg.sender] = Profile({
            owner: msg.sender,
            profileURI: profileURI,
            isPublic: isPublic,
            updatedAt: block.timestamp
        });

        if (isNewProfile) {
            profileOwners.push(msg.sender);
            emit ProfileCreated(msg.sender, profileURI, isPublic);
        } else {
            emit ProfileUpdated(msg.sender, profileURI, isPublic);
        }
    }

    /**
     * @notice Récupère le profil d'un utilisateur
     * @param owner L'adresse du propriétaire du profil
     * @return Le profil complet
     */
    function getProfile(
        address owner
    ) external view returns (Profile memory) {
        return profiles[owner];
    }

    /**
     * @notice Récupère tous les profils publics
     * @return Tableau de tous les profils publics
     */
    function getAllProfiles() external view returns (Profile[] memory) {
        uint256 publicCount = 0;
        for (uint256 i = 0; i < profileOwners.length; i++) {
            if (profiles[profileOwners[i]].isPublic) {
                publicCount++;
            }
        }

        Profile[] memory publicProfiles = new Profile[](publicCount);
        uint256 index = 0;
        for (uint256 i = 0; i < profileOwners.length; i++) {
            if (profiles[profileOwners[i]].isPublic) {
                publicProfiles[index] = profiles[profileOwners[i]];
                index++;
            }
        }

        return publicProfiles;
    }

    /**
     * @notice Récupère le nombre total de profils
     * @return Le nombre total de profils enregistrés
     */
    function getProfileCount() external view returns (uint256) {
        return profileOwners.length;
    }
}
