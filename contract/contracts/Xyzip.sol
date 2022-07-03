//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/utils/Base64.sol";

contract XYZIP is Context, ERC721Enumerable {
    uint256 public nextTokenId = 1;

    mapping(uint256 => string) private contentUrlMapping;
    mapping(uint256 => string) private titleMapping;
    mapping(uint256 => string) private authorMapping;
    mapping(uint256 => string) private descriptionMapping;

    mapping(uint256 => address[]) private reactorMapping;
    mapping(uint256 => uint256) private donatedMapping;

    constructor()
        ERC721("XYZIP", "XYZ")
    {}

    function mint(address to, string memory contentUrl, string memory title, string memory author, string memory description) external returns (uint256) {
        uint256 tokenId = nextTokenId;
        nextTokenId++;

        _safeMint(to, tokenId);
        _setContentData(tokenId, contentUrl, title, author, description);

        return tokenId;
    }

    function react(uint256 tokenId) external payable {
        address reactor = msg.sender;

        reactorMapping[tokenId].push(reactor);
        donatedMapping[tokenId] += msg.value;

        payable(ownerOf(tokenId)).transfer(msg.value);
        
    }

    function _setContentData(uint256 tokenId, string memory contentUrl, string memory title, string memory author, string memory description) private {
        contentUrlMapping[tokenId] = contentUrl;
        titleMapping[tokenId] = title;
        authorMapping[tokenId] = author;
        descriptionMapping[tokenId] = description;
    }

    function getContentUrl(uint256 tokenId) public view returns (string memory) {
        return contentUrlMapping[tokenId];
    }

    function getTitle(uint256 tokenId) public view returns (string memory) {
        return titleMapping[tokenId];
    }

    function getAuthor(uint256 tokenId) public view returns (string memory) {
        return authorMapping[tokenId];
    }

    function getDescription(uint256 tokenId) public view returns (string memory) {
        return descriptionMapping[tokenId];
    }

    function getReactorCount(uint256 tokenId) public view returns (uint256) {
        return reactorMapping[tokenId].length;
    }

    function getReactor(uint256 tokenId) public view returns (address[] memory) {
        uint256 length = getReactorCount(tokenId);
        address[] memory arrayMemory = new address[](length);
        arrayMemory = reactorMapping[tokenId];
        return arrayMemory;
    }

    function getDonated(uint256 tokenId) public view returns (uint256) {
        return donatedMapping[tokenId];
    }

    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        require(_exists(tokenId), "The token ID does not exist.");

        uint donatedEth100 = getDonated(tokenId) * 100 / 1 ether;
        uint donatedEth1 = donatedEth100 / 100;
        uint donatedEth2 = (donatedEth100 - donatedEth1 * 100) / 10;
        uint donatedEth3 = donatedEth100 - donatedEth2 * 10;

        string memory svg = getSVG(tokenId);
        bytes memory json = abi.encodePacked(
            '{"name": "',getTitle(tokenId),
            '", "description": "',getDescription(tokenId),
            '", "author": "',getAuthor(tokenId),
            '", "content": "',getContentUrl(tokenId),
            '", "image": "data:image/svg+xml;base64,',Base64.encode(bytes(svg)),
            '", "attributes": [{"trait_type": "reaction","value": "',Strings.toString(getReactorCount(tokenId)),
            '"},{"trait_type": "donated","value": "',Strings.toString(donatedEth1),'.',Strings.toString(donatedEth2),Strings.toString(donatedEth3),
            '"}]}'
        );

        return string(abi.encodePacked("data:application/json;base64,", Base64.encode(json)));
    }

    function getSVG(uint256 tokenId) private view returns (string memory) {
        uint donatedEth100 = getDonated(tokenId) * 100 / 1 ether;
        uint donatedEth1 = donatedEth100 / 100;
        uint donatedEth2 = (donatedEth100 - donatedEth1 * 100) / 10;
        uint donatedEth3 = donatedEth100 - donatedEth2 * 10;

        return
            string(
                abi.encodePacked(
                    '<svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMin meet" viewBox="0 0 480 480">',
                    '<style>text{fill:black;30px;font-family:serif;}</style>',
                    '<rect width="100%" height="100%" fill="#FFFFFE" />',
                    '<text x="10%" y="30%" font-size="40px">',
                    getTitle(tokenId),
                    '</text>',
                    '<text x="10%" y="40%" font-size="24px">by ',
                    getAuthor(tokenId),
                    '</text>',
                    '<text x="10%" y="60%" font-size="32px">Reaction: ',
                    Strings.toString(getReactorCount(tokenId)),
                    '</text>',
                    '<text x="10%" y="70%" font-size="32px">Donate:  ',
                    Strings.toString(donatedEth1),'.',Strings.toString(donatedEth2),Strings.toString(donatedEth3),
                    "</text></svg>"
                )
            );
    }

}