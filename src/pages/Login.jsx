import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { LucideMail, LucideLock } from "lucide-react";
import loginIllustration from "../assets/login-illustration.svg";
import logo from "../assets/logo.png";
import InputField from "../components/ui/InputField";
import Checkbox from "../components/ui/Checkbox";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);
  const validatePassword = (password) => password.length >= 6;
  const [isChecked, setIsChecked] = useState(false);
  const handleLogin = (e) => {
    e.preventDefault();
    if (validateEmail(email) && validatePassword(password)) {
      alert(`Email: ${email}\nPassword: ${password}`);
      localStorage.setItem("isAuthenticated", "true");
      navigate("/");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="h-screen flex">
      <div className="hidden md:flex w-1/2 bg-[#F8F9FC] items-center justify-center">
        <img src={loginIllustration} alt="Login Illustration" className="w-3/4" />
      </div>
      <div className="w-full md:w-1/2 flex items-center justify-center px-6">
        <div className="w-full max-w-md">
          <img src={logo} alt=" Logo" className="w-40 mb-4" />

          <h2 className="text-2xl font-bold text-gray-800">Welcome  </h2>
          <p className="text-gray-500 mb-6">Your Admin Dashboard</p>
          <div className="flex space-x-4 mb-6">
            <button className="flex items-center justify-center w-1/2 px-4 py-2 border rounded-lg shadow-sm text-gray-700 hover:bg-gray-100">
              <FcGoogle className="text-xl mr-2" /> Google
            </button>
            <button className="flex items-center justify-center w-1/2 px-4 py-2 border rounded-lg shadow-sm text-gray-700 hover:bg-gray-100">
              <FaFacebook className="text-blue-600 text-xl mr-2" /> Facebook
            </button>
          </div>

          <div className="relative text-center my-4">
            <span className="text-gray-400 text-sm px-2  relative z-10">or sign in with</span>
            <div className="absolute top-1/2 left-0 w-full border-b border-gray-200"></div>
          </div>

          <form onSubmit={handleLogin} className=" mt-4 space-y-4">
            <div>
              <label className="block text-gray-700 font-medium">Username</label>
              <InputField
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                icon={LucideMail}
                validate={validateEmail}
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium">Password</label>
              <InputField
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                icon={LucideLock}
                validate={validatePassword}
              />
            </div>

            <div className="flex justify-between items-center text-sm text-gray-600">
              <label className="flex items-center cursor-pointer space-x-2">
                <Checkbox checked={isChecked} onChange={setIsChecked} color="blue" />
                <span className="text-gray-700 font-medium">Remember this Device</span>
              </label>
              <a href="#" className="text-blue-500 hover:underline">Forgot Password?</a>
            </div>

            <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700 transition">
              Sign in
            </button>
          </form>
          <p className="text-center text-sm text-gray-600 mt-4">
            New to ? <a href="#" className="text-blue-500 hover:underline">Create an account</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
