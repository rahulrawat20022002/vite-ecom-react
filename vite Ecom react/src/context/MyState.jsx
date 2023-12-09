import React, { useEffect, useState } from "react";
import MyContext from "./MyContext";
import { fireDB } from "../firebase/FirebaseConfig";

import {
  QuerySnapshot,
  Timestamp,
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  setDoc,
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

  const [products, setProducts] = useState({
    title: null,
    price: null,
    imageUrl: null,
    category: null,
    description: null,
    time: Timestamp.now(),
    Uid: null,
    date: new Date().toLocaleString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }),
  });

  // Add product func

  // const addProduct = async () => {
  //   if (
  //     products.title === null ||
  //     products.price === null ||
  //     products.imageUrl === null ||
  //     products.category === null ||
  //     products.description === null
  //   ) {
  //     return toast.error("All field are required");
  //   }
  //   setLoading(true);
  //   try {
  //     const productRef = collection(fireDB, "products");
  //     await addDoc(productRef, products);
  //     toast.success("Product added successfully");
  //     setTimeout(() => {
  //       window.location.href = "/dashboard";
  //     }, 800);
  //     getProductData();
  //     setLoading(false);
  //   } catch (error) {
  //     toast.error(error.message);
  //     setLoading(false);
  //   }
  // };

  // //get all products func
  // const [product, setProduct] = useState([]);

  // const getProductData = async () => {
  //   setLoading(true);
  //   try {
  //     const q = query(collection(fireDB, "products"), orderBy("time"));
  //     const data = onSnapshot(q, (QuerySnapshot) => {
  //       let productArray = [];
  //       QuerySnapshot.forEach((doc) => {
  //         productArray.push({ ...doc.data(), id: doc.id });
  //       });

  //       setProduct(productArray);
  //     });

  //     setLoading(false);
  //     return () => data;
  //   } catch (error) {
  //     console.log(error);
  //     setLoading(false);
  //   }
  // };

  const addProduct = async () => {
    if (products.title == null || products.price == null || products.imageUrl == null || products.category == null || products.description == null) {
      return toast.error('Please fill all fields')
    }
    const productRef = collection(fireDb, "products")
    setLoading(true)
    try {
      await addDoc(productRef, products)
      toast.success("Product Add successfully")
      getProductData()
      closeModal()
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
    setProducts("")
  }

  const [product, setProduct] = useState([]);

  // ****** get product
  const getProductData = async () => {
    setLoading(true)
    try {
      const q = query(
        collection(fireDB, "products"),
        orderBy("time"),
        // limit(5)
      );
      const data = onSnapshot(q, (QuerySnapshot) => {
        let productsArray = [];
        QuerySnapshot.forEach((doc) => {
          productsArray.push({ ...doc.data(), id: doc.id });
        });
        setProduct(productsArray)
        setLoading(false);
      });
      return () => data;
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  //edit Handle

  const editHandle = (item) => {
    setProducts(item);
  };

  //update Product

  const updateProduct = async (item) => {
    setLoading(true);
    try {
      //item.id with products.id
      await setDoc(doc(fireDB, "products", products.id), products);
      toast.success("Updated Successfully");
      getProductData();
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 800);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
    setProducts("");
  };

  //delete Product

  const deleteProduct = async (item) => {
    setLoading(true);

    try {
      await deleteDoc(doc(fireDB, "products", item.id));
      toast.success("deleted successfully");
      getProductData();
      setLoading(false);
    } catch (error) {
      // console.log(error);
      setLoading(false);
    }
  };

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
        deleteProduct,
        updateProduct,
        editHandle,
      }}
    >
      {children}
    </MyContext.Provider>
  );
}

export default MyState;
