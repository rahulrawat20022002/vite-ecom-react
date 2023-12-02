import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MyContext from "../../context/MyContext";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/FirebaseConfig";
import { toast } from "react-toastify";
import Loader from "../../components/loader/Loader";
function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loading, setLoading } = useContext(MyContext);
  const handleLogin = async () => {
    if (email === "" || password === "") {
      return toast.error("Please fill all the fields");
    } else {
      try {
        setLoading(true);
        const user = await signInWithEmailAndPassword(auth, email, password);
        localStorage.setItem("user", JSON.stringify(user));
        navigate("/");
        setLoading(false);
        toast.success("Signed in successfully", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } catch (e) {
        setLoading(false);
        toast.error("Sigin Failed", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    }
  };

  return (
    <div className=" flex justify-center items-center h-screen">
      {loading && <Loader />}
      <div className=" bg-gray-800 px-10 py-10 rounded-xl ">
        <div className="">
          <h1 className="text-center text-white text-xl mb-4 font-bold">
            Login
          </h1>
        </div>
        <div>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            name="email"
            className=" bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none"
            placeholder="Email"
          />
        </div>
        <div>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            className=" bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none"
            placeholder="Password"
          />
        </div>
        <div className=" flex justify-center mb-3">
          <button
            onClick={handleLogin}
            className=" bg-blue-500 w-full text-black font-bold  px-2 py-2 rounded-lg"
          >
            Login
          </button>
        </div>
        <div>
          <h2 className="text-white">
            Don't have an account{" "}
            <Link className=" text-blue-500 font-bold" to={"/signup"}>
              Signup
            </Link>
          </h2>
        </div>
      </div>
    </div>
  );
}

export default Login;
