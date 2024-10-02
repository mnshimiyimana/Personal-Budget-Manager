import React from "react";

const WelcomeMessage: React.FC = () => {
  return (
    <div>
      <p className=" space-x-4 ">
        <span className="text-xl font-bold  ">Good Morning User!</span>
        <span> Welcome to your financial insights.</span>
      </p>
    </div>
  );
};

export default WelcomeMessage;