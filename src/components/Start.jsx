import React, { useRef } from "react";

export default function Start({ setUserName }) {
  const inputRef = useRef();
  const handleClick = (e) => {
    inputRef.current.value && setUserName(inputRef.current.value);
  };
  return (
    <div className="start">
      <input
        className="startInput"
        ref={inputRef}
        placeholder="enter your name"
      />
      <button className="startButton" onClick={handleClick}>
        Start
      </button>
    </div>
  );
}
