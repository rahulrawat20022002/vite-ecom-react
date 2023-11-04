import React from "react";
import Layout from "../../components/layout/Layout";
import { useContext } from "react";
import MyContext from "../../context/MyContext";
function Home() {
  const { name, id } = useContext(MyContext);
  console.log(name, id);
  return (
    <Layout>
      <div>
        <h1> Name:{name}</h1>
        <h1> ID:{id}</h1>
      </div>
    </Layout>
  );
}

export default Home;
