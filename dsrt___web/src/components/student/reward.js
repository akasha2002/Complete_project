import React, { useEffect, useState } from 'react';
import 'animate.css';
import Confetti from 'react-confetti'; // Import the Confetti component

export default function Reward() {
  const [showConfetti, setShowConfetti] = useState(false); // State to control confetti display

  // Placeholder data for reward details
  const rewardDetails = {
    totalPoints: 500,
    level: 'Gold',
  };

  // Placeholder data for earned rewards
  const earnedRewards = [
    { id: 1, name: 'Certificate of Achievement' },
    { id: 2, name: 'Star Student Badge' },
    // Add more reward items as needed
  ];

  useEffect(() => {
    // Apply celebratory effect when component mounts
    const cardElement = document.querySelector('.card');
    if (cardElement) {
      // Add bounce-in animation
      cardElement.classList.add('animate_animated', 'animate_bounceIn');

      // Trigger confetti effect
      setShowConfetti(true);

      // Remove confetti effect after 5 seconds
      const animationDuration = 5000; // 5 seconds
      setTimeout(() => {
        setShowConfetti(false);
      }, animationDuration);
    }
  }, []);

  return (
    <>
      <div className="container-fluid mt-2 ">
        <div className="card p-5">
          <h2 className="mb-4">Rewards</h2>

          {/* Display Reward Details */}
          <div className="mb-4">
            <h3>Total Points:</h3>
            <p>{rewardDetails.totalPoints}</p>
            <h3>Level:</h3>
            <p>{rewardDetails.level}</p>
          </div>

          {/* List of Earned Rewards */}
          <div className="mb-4">
            <h3>Earned Rewards</h3>
            <ul>
              {earnedRewards.map((reward) => (
                <li key={reward.id}>{reward.name}</li>
              ))}
            </ul>
          </div>

          {/* Achievement Illustration (Replace with an actual image) */}
          <div className="text-center">
            <img
              src="https://via.placeholder.com/200"
              alt="Achievement Illustration"
              className="img-fluid"
            />
          </div>
        </div>

        {/* Additional Content or Components can be added as needed */}

        {/* Confetti Effect */}
        {showConfetti && <Confetti />}
      </div>
    </>
  );
}