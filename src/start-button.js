import React from "react";

const StartButton = ({startGame}) => {
  return (
      <div>
        <input
          type="button"
          value="Start Game"
          onClick={startGame}
        />
      </div>
  );
};

export default StartButton;
