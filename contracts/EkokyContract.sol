// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

contract EkokyContract {
    uint256 public offersCounter = 0;

    struct Offer {
        uint256 id;
        uint256 interested;
        string name;
        string objective;
        string description;
        string location;
        string email;
        string phone;
        uint256 createdAt;
    }

    event OfferCreated(
        uint256 id,
        uint256 interested,
        string name,
        string objective,
        string description,
        string location,
        string email,
        string phone,
        uint256 createdAt
    );

    event OfferIncrementInterested(uint256 id, uint256 interested);


    mapping(uint256 => Offer) public offers;

    constructor() {
        createOffer(0, "Walmart", "We waste fruit, vegetables and canned food in good condition", "Waste of 1 ton of fruit and vegetables, 0.5 tons of rotten food, 0.2 tons of canned food. Canned food stored in boxes", "Tulum #1337 Mexico", "Walmart.Cancun@gmail.com", "012 3232 23 49");
    }

    function createOffer(uint256 _interested, string memory _name, string memory _objective, string memory _description , string memory _location, string memory _email, string memory _phone)
        public
    {
        offersCounter++;
        offers[offersCounter] = Offer(
            offersCounter,
            _interested,
            _name,
            _objective,
            _description,
            _location,
            _email,
            _phone,
            block.timestamp
        );
        emit OfferCreated(
            offersCounter,
            _interested,
            _name,
            _objective,
            _description,
            _location,
            _email,
            _phone,
            block.timestamp
        );
    }

    function incrementInterested(uint256 _id) public {
        Offer memory _offer = offers[_id];
    
        _offer.interested = _offer.interested++;

        offers[_id] = _offer;

        emit OfferIncrementInterested(_id, _offer.interested);
    }
}
