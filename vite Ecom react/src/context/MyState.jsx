import React, { useState } from "react";
import MyContext from "./MyContext";
function MyState({ children }) {
  const [mode, setMode] = useState("light");
  const toggleMode = () => {
    mode === "light"
      ? ((document.body.style.backgroundColor = "rgb(17,24,39)"),
        setMode("dark")((document.body.style.color = "white")))
      : ((document.body.style.backgroundColor = "white"),
        setMode("light"),
        (document.body.style.color = "black"));
  };

  const [loading, setLoading] = useState(false);

  return (
    <MyContext.Provider value={{ mode, toggleMode, loading, setLoading }}>
      {children}
    </MyContext.Provider>
  );
}

export default MyState;
