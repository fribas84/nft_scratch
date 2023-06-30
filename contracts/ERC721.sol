// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
import "hardhat/console.sol";

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
    
    modifier isValidOperator(uint256 _tokenId){
        require(
            msg.sender == ownerOf(_tokenId) || msg.sender == getApproved(_tokenId)  || (isApprovedForAll(ownerOf(_tokenId),msg.sender)),
            "Msg.sender is not the owner or approved for operation."
        );
        _;
    }

    function balanceOf(address _owner) external view returns (uint256){
        require(_owner !=address(0),"Address is zero.");
        return _balances[_owner];
    }
	
   
    function ownerOf(uint256 _tokenId) public view isValidTokenId(_tokenId) returns (address){
        return _owners[_tokenId];
    }

    function setApprovalForAll(address _operator, bool _approved) external {
        _operatorApprovals[msg.sender][_operator] = _approved;
        emit ApprovalForAll(msg.sender,_operator,_approved);
    }
    
    function isApprovedForAll(address _owner, address _operator) public view returns (bool){
        return _operatorApprovals[_owner][_operator];
    }

    function approve(address _approved, uint256 _tokenId) public isValidOperator(_tokenId) payable{
        address owner = ownerOf(_tokenId);
        _tokenApprovals[_tokenId] = _approved;
        emit Approval(owner,_approved,_tokenId);
    }
  
    function getApproved(uint256 _tokenId) public view isValidTokenId(_tokenId) returns (address){
        return _tokenApprovals[_tokenId];
    }

    function transferFrom(address _from, address _to, uint256 _tokenId) public payable isValidOperator(_tokenId) isValidTokenId(_tokenId) {
        address owner = ownerOf(_tokenId);
        require(owner == _from,"From address is not the owner.");
        require(_to != address(0),"Address is zero.");
        //clear old approvals
        approve(address(0),_tokenId);
        //update balances
        _balances[_from] -= 1;
        _balances[_to] += 1;
        // changing ownership
        _owners[_tokenId] = _to;
        emit Transfer(_from,_to,_tokenId);
    }


    function safeTransferFrom(address _from, address _to, uint256 _tokenId) public  payable  {
        require(_checkOnERC721Received(),"Receiver not implemented");
        transferFrom(_from,_to,_tokenId);
    }
    
    function _checkOnERC721Received() internal pure returns(bool){
        return true;
    }
 
}