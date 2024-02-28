import React, { useEffect, useState, useRef } from "react";
import "animate.css/animate.min.css"; // Corrected import
import Confetti from "react-confetti";
import "./styles.css";
import { useUserDetails } from "../Userdetails";

export default function Reward() {
  const [showConfetti, setShowConfetti] = useState(false);
  const cardRef = useRef(null);
  const [totalPoints, setTotalPoints] = useState(null);

  const { userType, userName } = useUserDetails();

  const earnedRewards = [
    { id: 1, name: "Certificate of Achievement" },
    { id: 2, name: "Star Student Badge" },
  ];

  useEffect(() => {
    if (userName) {
      fetch("http://localhost:3001/student/rewards", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName: userName,
        }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          if (data.success && data.rows_15.length > 0) {
            setTotalPoints(data.rows_15[0].rewards);
          }
        })
        .catch((error) => {
          console.error("Error fetching totalPoints:", error);
        });
    }
  }, [userName]);

  useEffect(() => {
    const cardElement = cardRef.current;
    if (cardElement) {
      cardElement.classList.add("animated", "bounceIn");

      const animationDuration = 1000;
      setTimeout(() => {
        cardElement.classList.remove("animated", "bounceIn");
        setShowConfetti(true);
        setTimeout(() => {
          setShowConfetti(false);
        }, 5000);
      }, animationDuration);
    }
  }, []);

  return (
    <div className="container-fluid mt-4 reward-page">
      <div className="card p-4" ref={cardRef}>
        <h2 className="mb-4">Rewards</h2>
        <div className="mb-4">
          <h3>Total Points:</h3>
          <p>{totalPoints !== null ? totalPoints : '0'}</p> {/* Display totalPoints or 'Loading...' */}
        </div>
        {/* <div className="mb-4">
          <h3>Earned Rewards</h3>
          <ul>
            {earnedRewards.map((reward) => (
              <li key={reward.id}>{reward.name}</li>
            ))}
          </ul>
        </div> */}
        <div className="text-center">
          <div className="rotating-image-container">
            <img
              src="/medal.png"
              alt="Rotating Medal"
              className="rotating-image"
            />
          </div>
        </div>
      </div>
      {showConfetti && <Confetti />}
    </div>
  );
}
