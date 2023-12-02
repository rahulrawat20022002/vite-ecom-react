import React, { useEffect, useState } from "react";
import MyContext from "./MyContext";
import { fireDB } from "../firebase/FirebaseConfig";
import {
  QuerySnapshot,
  Timestamp,
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { toast } from "react-toastify";

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

  // Add product func
  const [products, setProducts] = useState({
    title: null,
    price: null,
    imageUrl: null,
    category: null,
    description: null,
    time: Timestamp.now(),
    date: new Date().toLocaleString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }),
  });

  const addProduct = async () => {
    if (
      products.title === null ||
      products.price === null ||
      products.imageUrl === null ||
      products.category === null ||
      products.description === null
    ) {
      return toast.error("All field are required");
    }
    setLoading(true);
    try {
      const productRef = collection(fireDB, "products");
      await addDoc(productRef, products);
      toast.success("Product added successfully");
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 800);
      getProductData();
      setLoading(false);
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  //get all products func
  const [product, setProduct] = useState([]);

  const getProductData = async () => {
    setLoading(true);
    try {
      const q = query(collection(fireDB, "products"), orderBy("time"));
      const data = onSnapshot(q, (QuerySnapshot) => {
        let productArray = [];
        QuerySnapshot.forEach((doc) => {
          productArray.push({ ...doc.data(), id: doc.id });
        });

        setProduct(productArray);
      });

      setLoading(false);
      return () => data;
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // const getProductData = async () => {
  //   setLoading(true);
  //   try {
  //     const q = query(collection(fireDB, "products"), orderBy("time"));
  //     const data = onSnapshot(q, (QuerySnapshot) => {
  //       let productsArray = [];
  //       QuerySnapshot.forEach((doc) => {
  //         console.log(doc);
  //         productsArray.push({ ...doc.data(), id: doc.id });
  //       });
  //       setProduct(productsArray);
  //       setLoading(false);
  //     });
  //     return () => data;
  //   } catch (error) {
  //     console.log(error);
  //     setLoading(false);
  //   }
  // };
  useEffect(() => {
    getProductData();
  }, []);
  return (
    <MyContext.Provider
      value={{
        mode,
        toggleMode,
        loading,
        setLoading,
        products,
        setProducts,
        product,
        addProduct,
      }}
    >
      {children}
    </MyContext.Provider>
  );
}

export default MyState;
