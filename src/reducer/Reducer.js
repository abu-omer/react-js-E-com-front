import React, { useReducer } from "react";

const Reducer = () => {
  const initState = {
    count: 0,
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "up":
        return { count: state.count + 1 };
      case "down":
        return { count: state.count - 1 };
      case "reset":
        return { count: 0 };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initState);
  return (
    <div>
      <h1>{state.count}</h1>
      <button
        onClick={() => {
          dispatch({ type: "up" });
        }}
      >
        up
      </button>
      <button
        onClick={() => {
          dispatch({ type: "down" });
        }}
      >
        down
      </button>
      <button
        onClick={() => {
          dispatch({ type: "reset" });
        }}
      >
        reset
      </button>
    </div>
  );
};

export default Reducer;
