// SPDX-License-Identifier: UNLICENSED 
pragma solidity ^0.8.17;

/**
 * @title FeedbackSystem MiniApp
 * @dev Stores user feedback with message and rating
 */
contract FeedbackSystem {
    event FeedbackStored(address indexed sender, string message, uint8 rating, uint256 timestamp);
    event RatingUpdated(address indexed sender, uint8 oldRating, uint8 newRating, uint256 timestamp);
    event MessageUpdated(address indexed sender, string oldMessage, string newMessage, uint256 timestamp);
    
    struct Feedback {
        address sender;
        string message;
        uint8 rating; // 1-5 scale
        uint256 timestamp;
    }

    // Array to store all feedback entries
    Feedback[] public feedbacks;
    
    // Mapping from address to feedback index (0 = not submitted)
    mapping(address => uint256) public userFeedbackIndex;
    
    // Track total ratings sum for average calculation
    uint256 public totalRatingsSum;
    
    /**
     * @dev Store new feedback (replaces existing if any)
     * @param message Feedback message
     * @param rating Rating from 1-5
     */
    function storeFeedback(string memory message, uint8 rating) public {
        require(rating >= 1 && rating <= 5, "Invalid rating (1-5)");
        uint256 index = userFeedbackIndex[msg.sender];
        
        if (index == 0) {
            // New submission
            feedbacks.push(Feedback({
                sender: msg.sender,
                message: message,
                rating: rating,
                timestamp: block.timestamp
            }));
            userFeedbackIndex[msg.sender] = feedbacks.length;
            totalRatingsSum += rating;
        } else {
            // Update existing
            uint256 storageIndex = index - 1;
            totalRatingsSum -= feedbacks[storageIndex].rating;
            totalRatingsSum += rating;
            
            emit RatingUpdated(msg.sender, feedbacks[storageIndex].rating, rating, block.timestamp);
            emit MessageUpdated(msg.sender, feedbacks[storageIndex].message, message, block.timestamp);
            
            feedbacks[storageIndex].message = message;
            feedbacks[storageIndex].rating = rating;
            feedbacks[storageIndex].timestamp = block.timestamp;
        }
        
        emit FeedbackStored(msg.sender, message, rating, block.timestamp);
    }
    
    /**
     * @dev Update user's rating
     * @param newRating New rating value (1-5)
     */
    function updateRating(uint8 newRating) public {
        require(newRating >= 1 && newRating <= 5, "Invalid rating (1-5)");
        uint256 index = userFeedbackIndex[msg.sender];
        require(index != 0, "No feedback exists");
        
        uint256 storageIndex = index - 1;
        uint8 oldRating = feedbacks[storageIndex].rating;
        
        totalRatingsSum = totalRatingsSum - oldRating + newRating;
        feedbacks[storageIndex].rating = newRating;
        feedbacks[storageIndex].timestamp = block.timestamp;
        
        emit RatingUpdated(msg.sender, oldRating, newRating, block.timestamp);
    }
    
    /**
     * @dev Update user's feedback message
     * @param newMessage New feedback message
     */
    function updateMessage(string memory newMessage) public {
        uint256 index = userFeedbackIndex[msg.sender];
        require(index != 0, "No feedback exists");
        
        uint256 storageIndex = index - 1;
        string memory oldMessage = feedbacks[storageIndex].message;
        
        feedbacks[storageIndex].message = newMessage;
        feedbacks[storageIndex].timestamp = block.timestamp;
        
        emit MessageUpdated(msg.sender, oldMessage, newMessage, block.timestamp);
    }
    
    /**
     * @dev Get total feedback count
     */
    function getRatingCount() public view returns (uint256) {
        return feedbacks.length;
    }
    
    /**
     * @dev Get feedback data for a specific user
     */
    function getMessageAndRatingByUser(address user) public view returns (
        string memory message,
        uint8 rating,
        uint256 timestamp
    ) {
        uint256 index = userFeedbackIndex[user];
        require(index != 0, "No feedback exists");
        
        Feedback storage fb = feedbacks[index - 1];
        return (fb.message, fb.rating, fb.timestamp);
    }
    
    /**
     * @dev Calculate average rating
     */
    function averageRating() public view returns (uint256) {
        if (feedbacks.length == 0) return 0;
        return totalRatingsSum / feedbacks.length;
    }
}