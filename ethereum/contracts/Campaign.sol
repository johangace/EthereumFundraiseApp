pragma solidity >=0.4.25 <0.7.0;


contract CampaignFactory {
    
    address[] public deployedCampaigns;
    
    function createCampaign(uint minimum) public {
       address newCampaign =  address(new Campaign(minimum, msg.sender));
       deployedCampaigns.push(newCampaign);
    }
    function getDeployedCampaigns() public view  returns (address[] memory){
        return  deployedCampaigns;
    }
} 

contract Campaign {
    //type 
    struct  Request {
        string description;
        uint value;
        address recipient;
        bool complete;
        uint approvalCount;
        mapping(address=> bool) approvals;
    }
    
    Request[] public requests;
    address public manager;
    uint public minimumContribution;
    // address[] public approvers;
    mapping(address=> bool) public approvers;
    uint public approversCount;
    
    
    
    modifier restricted (){
        require(msg.sender==manager);
        _;
    }
    
    constructor( uint minimum, address creator) public {
        // manager= msg.sender;
        manager= creator;
        minimumContribution = minimum;
}
    
    
    function contribute() public payable {
        require(msg.value > minimumContribution);
        approvers[msg.sender] = true; 
        approversCount++;
    }
    function createRequest(string memory description, uint  value, address recipient)  public restricted {
        //variable - > containst type Request
        //newrequest-> new variable. 
        // require(approvers[msg.sender])
        Request memory newReq = Request({
            description: description,
            value: value,
            recipient: recipient,
           complete: false,
           approvalCount: 0
           //a mapping is a refence type , we dont have to include
        //   approvals: false
        });
        //same as
        //Request(description, value, recipient, false)
        requests.push(newReq);
    }
    
    function approveRequest(uint index) public {
        Request storage request = requests[index];
        
        require(approvers[msg.sender]);
        require(!request.approvals[msg.sender]);
        request.approvals[msg.sender]= true;
        request.approvalCount++;
    }
    
    
    function finalizeRequest(uint index) public restricted {
        Request storage request = requests[index];
        require(request.approvalCount > (approversCount/2));
        require(!request.complete);
        request.complete = true;
    }

    function getSummary() public view returns (
        uint, uint, uint, uint,address
    ){
        return(
            minimumContribution, 
            //contracts balance
            this.balance,
            requests.length, 
            approversCount,
            manager
        );
    }

    function getRequestsCount() public view returns (uint) {
        return requests.length;
    }
}
