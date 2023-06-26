// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ˆ0.8.2;

contract ERC721 {
    mapping(address => uint256) internal _balances;
    mapping(uint256 => address) internal _owners;
    //owner address ---> operator address
    mapping(address => mapping(address => bool)) private _operatorApprovals;
    mapping(uint256 => address) private _tokenApprovals;

    constructor() {
        
    }

    event Transfer(address indexed _from, address indexed _to, uint256 indexed _tokenId);
    event Approval(address indexed _owner, address indexed _approved, uint256 indexed _tokenId);
    event ApprovalForAll(address indexed _owner, address indexed _operator, bool _approved);
    
    modifier isValidTokenId (uint256 _tokenId) {
        require(_owners[_tokenId] != address(0),"TokenID does not exits");
        _;
    }
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
    function ownerOf(uint256 _tokenId) external view isValidTokenId(_tokenId) returns (address){
        return _owners[_tokenId];;
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


    /// @title approve
	/// @author fribas
	/// @notice updates an approved address for an nft.

    function approve(address _approved, uint256 _tokenId) external payable{
        address owner = ownerOf(_tokenId);
        require(msg.sender = owner || isApprovedForAll(owner,msg.sender),"Msg.sender is not the owner or an approved operator.");
        _tokenApprovals[_tokenId] = _approved
        emit Approval(owner,_approved,_tokenId)
    }

    /// @title approve
	/// @author fribas
	/// @notice Gets apprved address for a single NFT.
    function getApproved(uint256 _tokenId) external view isValidTokenId(_tokenId) returns (address){
        return _tokenApprovals[_tokenId];
    }

    /// @title transferFrom
	/// @author fribas
	/// @notice transfer ownership of an NFT

    function transferFrom(address _from, address _to, uint256 _tokenId) external payable isValidTokenId(_tokenId) {
        address owner = ownerOf(_tokenId);
        require(
            msg.sender == owner ||
            getApproved(_tokenId) == msg.sender ||
            isApprovedForAll(owner,msg.sender),
            "Msg.sender is not the owner or approved for transfer."
        );
        require(owner == _from,"From address is not the owner.");
        require(_to != address(0),"Address is zero.")
        //clear old approvals
        approve(address(0),_tokenId);

        //update balances
        _balances[_from] -= 1;
        _balances[_to] += 1;
        // changing ownership
        _owners[_tokenId] = _to;

        emit Transfer(_from,_to);
    }

    /// @title safeTransferFrom 
	/// @author fribas
	/// @notice checks if onERC721Received is implemented when sending to SC
    function safeTransferFrom(address _from, address _to, uint256 _tokenId, bytes _data) external payable {
        transferFrom(_from,_to,_tokenId);
        require(_checkOnERC721Received,"Receiver not implemented");
    }
    function safeTransferFrom(address _from, address _to, uint256 _tokenId) external payable {
        safeTransferFrom(_from,_to,_tokenId,"");
    }
    

    /// @title _checkOnERC721Received
	/// @author fribas
	/// @notice Simplified function. 

    function _checkOnERC721Received() internal returns(bool){
        return true;
    }
    

}