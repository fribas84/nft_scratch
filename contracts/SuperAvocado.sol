pragma solidity ˆ0.8.2

import "./ERC721.sol";

contract SuperAvocado is ERC721 {

    string public name;
    string public symbol;

    uint256 public tokenCount;
    mapping(uint256 => string) private _tokenURIs;

    constructor(string memory _name, string memory _symbol) {
        name = _name;
        symbol = _symbol;
    } 

    /// @title tokenURI
	/// @author fribas
    /// @notice Returns URL that points the metadata

    function tokenURI(uint256 _tokenId) public view isValidTokenId returns(string memory){ 
        return _tokenURIs[_tokenId];
    }

    /// @title mint
    /// @author fribas
    /// @notice Creates a new NFT inside the collection
    function mint(string memory _tokenURI) public {

        tokenCount +=1; //tokenID
        _balances[msg.sender] +=1;
        _owners[tokenCount] = msg.sender;
        _tokenURIs[_tokenId]= _tokenURI; 

        emit Transfer(address(0),msg.sender,tokenCount); //event that indicates the mint
    }

     
    // adding ERC721Metadata interface
    function supportsInterface(bytes4 _interfaceId) public pure override returns(bool){
        return _interfaceId == 0x80ac58cd || _interfaceId == 0x5b5e139f;
    }


}