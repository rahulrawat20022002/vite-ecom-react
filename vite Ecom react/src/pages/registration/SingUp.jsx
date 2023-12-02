import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, fireDB } from "../../firebase/FirebaseConfig";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import { toast } from "react-toastify";
import MyContext from "../../context/MyContext";
import Loader from "../../components/loader/Loader";
function Signup() {
  const { loading, setLoading } = useContext(MyContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async () => {
    if (email === "" || name === "" || password === "") {
        return toast.error("Please fill all the fields");
    } else {
      setLoading(true);
      try {
        const users = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        const user = {
          name: name,
          email: users.user.email,
          uid: users.user.uid,
          time: Timestamp.now(),
        };

        const userRef = collection(fireDB, "user");
        await addDoc(userRef, user);
        toast.success("Signed Up Successfully");
        navigate("/");

        setEmail("");
        setName("");
        setPassword("");
        setLoading(false);
      } catch (e) {
        console.log(e);
        setLoading(false);
      }
    }
  };

  return (
    <div className=" flex justify-center items-center h-screen">
      {loading && <Loader />}
      <div className=" bg-gray-800 px-10 py-10 rounded-xl ">
        <div className="">
          <h1 className="text-center text-white text-xl mb-4 font-bold">
            Signup
          </h1>
        </div>
        <div>
          <input
            type="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className=" bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none"
            placeholder="Name"
          />
        </div>
        <div>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className=" bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none"
            placeholder="Email"
          />
        </div>
        <div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className=" bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none"
            placeholder="Password"
          />
        </div>
        <div className=" flex justify-center mb-3">
          <button
            onClick={() => handleSignUp()}
            className=" bg-blue-500 w-full text-white font-bold  px-2 py-2 rounded-lg"
          >
            Signup
          </button>
        </div>
        <div>
          <h2 className="text-white">
            Have an account{" "}
            <Link className=" text-blue-500 font-bold" to={"/login"}>
              Login
            </Link>
          </h2>
        </div>
      </div>
    </div>
  );
}

export default Signup;
