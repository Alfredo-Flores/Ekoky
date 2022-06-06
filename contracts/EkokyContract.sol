// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

contract EkokyContract {
    uint256 public offersCounter = 0;

    struct Offer {
        uint256 id;
        uint256 interested;
        string name;
        string objective;
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
        string location,
        string email,
        string phone,
        uint256 createdAt
    );

    event OfferIncrementInterested(uint256 id, uint256 interested);


    mapping(uint256 => Offer) public offers;

    constructor() {
        createOffer(0, "Playa del carmen charity", "Collecting food for children", "Tulum #1337 Mexico", "PDCCharity@gmail.com", "012 322 23 49");
    }

    function createOffer(uint256 _interested, string memory _name, string memory _objective, string memory _location, string memory _email, string memory _phone)
        public
    {
        offersCounter++;
        offers[offersCounter] = Offer(
            offersCounter,
            _interested,
            _name,
            _objective,
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
