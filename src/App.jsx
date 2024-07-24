import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import api from "./axiosconfig";

function App() {
  useEffect(() => {
    //sample usage
    const apiCall = async () => {
      const res = await api.post("url");
    };

    apiCall();
  }, []);
  return <></>;
}

export default App;
