// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ˆ0.8.2;

contract ERC721 {
    mapping(address => uint256) internal _balances;
    mapping(uint256 => address) internal _owners;
    //owner address ---> operator address
    mapping(address => mapping(address => bool)) private _operatorApprovals;
    constructor() {
        
    }
    //event Transfer(address indexed _from, address indexed _to, uint256 indexed _tokenId);
    //event Approval(address indexed _owner, address indexed _approved, uint256 indexed _tokenId);
    
    event ApprovalForAll(address indexed _owner, address indexed _operator, bool _approved);
    
    /// @title balanceOf
    /// @author fribas
    /// @notice Returns the number of NFTs assigned to an owner 
    /// @dev If address input is zero it will throw an error.
    function balanceOf(address _owner) external view returns (uint256){
        require(_owner !=address(0),"Address is zero.");
        return _balances[_owner];
    }
	
    /// @title ownerof 
	/// @author fribas
	/// @notice Finds the owner of an NFT
	/// @dev If the token is assigned to zero address, the TokenID will be considered invalid.
    function ownerOf(uint256 _tokenId) external view returns (address){
        address owner = _owners[_tokenId];
        require(owner != address(0),"TokenID does not exits")
        return owner;
    }

    /// @title setApprovalForAll 
	/// @author fribas
	/// @notice Enables or disables an operator to manage all of msg.sender assets.

    function setApprovalForAll(address _operator, bool _approved) external {
        _operatorApprovals[msg.sender][_operator] = _approved;
        emit ApprovalForAll(msg.sender,_operator,_approved);
    }
    
    /// @title isApprovedForAll 
	/// @author fribas
	/// @notice Checks if an address is an operator for another address.
    function isApprovedForAll(address _owner, address _operator) external view returns (bool){
        return _operatorApprovals[_owner][_operator];
    }


    //function safeTransferFrom(address _from, address _to, uint256 _tokenId, bytes data) external payable;
    //function safeTransferFrom(address _from, address _to, uint256 _tokenId) external payable;
    //function transferFrom(address _from, address _to, uint256 _tokenId) external payable;
    //function approve(address _approved, uint256 _tokenId) external payable;
    

    //function getApproved(uint256 _tokenId) external view returns (address);
}