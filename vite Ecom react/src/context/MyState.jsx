import React from "react";
import MyContext from "./MyContext";
function MyState({ children }) {
  const state = {
    name: "abc",
    id: "1234",
  };
  return <MyContext.Provider value={state}>{children}</MyContext.Provider>;
}

export default MyState;
