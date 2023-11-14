import React, { useState } from "react";
import MyContext from "./MyContext";
function MyState({ children }) {
  const [mode, setMode] = useState("light");
  const toggleMode = () => {
    mode === "light"
      ? ((document.body.style.backgroundColor = "black"),
        setMode("dark"),
        (document.body.style.color = "white"))
      : ((document.body.style.backgroundColor = "white"),
        setMode("light"),
        (document.body.style.color = "black"));
  };

  return (
    <MyContext.Provider value={{ mode, toggleMode }}>
      {children}
    </MyContext.Provider>
  );
}

export default MyState;
