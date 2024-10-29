import React from 'react';
import { useEffect, useState } from "react";

export const Typewriter = ({ text, typingSpeed = 300 }) => {
  const [displayText, setDisplayText] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentIndex < text.length) {
        setDisplayText((prevText) => [...prevText, text[currentIndex]]);
        setCurrentIndex((prevIndex) => prevIndex + 1);
      } else {
        clearInterval(interval);
      }
    }, typingSpeed);

    return () => {
      clearInterval(interval);
    };
  }, [text, typingSpeed, currentIndex]);

  return (
    <ul>
      {displayText.map((item, index) => {
        return <li key={index}>{item}</li>;
      })}
    </ul>
  );
}