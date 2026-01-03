import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiService, authService, cookieUtils } from "../services";

type Props = {
  open: boolean;
  onClose: () => void;
};

const LoginModal: React.FC<Props> = ({ open, onClose }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError(""); // Clear error when user types
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Make API call to login endpoint
      const response = await apiService.post("/user/login", {
        email: formData.email,
        password: formData.password,
      });

      // Store user data and token using authService
      if (response.token) {
        authService.setToken(response.token);
      }

      if (response.user) {
        authService.setUser(response.user);
      }

      // Close modal and navigate to member dashboard

      const token =
        cookieUtils.getCookie("COOKIES_USER_ACCESS_TOKEN") ||
        cookieUtils.getCookie("authToken");

      let decoded: any = {};
      if (token) {
        decoded = jwtDecode(token);
        console.log("Decoded Token:", decoded);
      }
      console.log(decoded, "token decoded")
      onClose();
      if (decoded?.role == "admin") {
        navigate("/member/dashboard");
      } else {
        navigate("/about");
      }

    } catch (err: any) {
      // Handle different error cases
      if (err.response) {
        // Server responded with an error
        const errorMessage =
          err.response.data?.message ||
          err.response.data?.error ||
          "Login failed. Please check your credentials.";
        setError(errorMessage);
      } else if (err.request) {
        // Request was made but no response received
        setError("Network error. Please check your connection and try again.");
      } else {
        // Something else happened
        setError("An unexpected error occurred. Please try again.");
      }
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60]">
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-[1px]"
        onClick={onClose}
      ></div>
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="w-full max-w-[500px] bg-white rounded-none shadow-2xl relative">
          <button
            aria-label="Close"
            onClick={onClose}
            className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
          >
            <svg
              className="w-5 h-5 text-gray-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <div className="px-10 pt-12 pb-8">
            <h3 className="text-[28px] font-bold text-center mb-8 text-black">
              Log in
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="text-red-600 text-sm text-center bg-red-50 p-2 rounded">
                  {error}
                </div>
              )}
              <div>
                <label className="block text-[13px] font-medium text-black mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full h-12 rounded-[8px] border border-black px-4 text-[14px] placeholder:text-[#7A7A7A] focus:ring-black focus:border-black"
                  placeholder="example@gmail.com"
                  required
                />
              </div>
              <div>
                <label className="block text-[13px] font-medium text-black mb-1">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full h-12 rounded-[8px] border border-black pl-4 pr-10 text-[14px] placeholder:text-[#7A7A7A] focus:ring-black focus:border-black"
                    placeholder="Enter Your Password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-3 flex items-center text-black"
                  >
                    {showPassword ? (
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.477 0-8.268-2.943-9.542-7a10.05 10.05 0 013.307-4.59M9.88 9.88a3 3 0 104.24 4.24M6.1 6.1L18 18"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
              <div className="flex items-center  text-[13px] font-medium">
                <label className="inline-flex items-center text-black">
                  <input
                    type="checkbox"
                    className="mr-2 border border-black rounded-sm accent-[#295F9A]"
                  />{" "}
                  Remember Me
                </label>
                <button
                  type="button"
                  className="text-[#295F9A] hover:underline ml-1"
                  onClick={() => navigate("/join-isi")}
                >
                  {" "}
                  Forgot Password?
                </button>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#295F9A] hover:opacity-90 disabled:opacity-50 text-white rounded-[6px] h-11 font-semibold tracking-wide"
              >
                {loading ? "Signing in..." : "Login"}
              </button>
              <div className="flex items-center my-3">
                <div className="flex-1 h-px bg-[#000]" />
                <span className="px-6 text-[12px] text-[#3E3232]">Or</span>
                <div className="flex-1 h-px bg-[#000]" />
              </div>
              <div className="text-center text-[13px] text-gray-900 font-medium">
                Don't have an account ?{" "}
                <button
                  onClick={() => navigate("/join-isi")}
                  type="button"
                  className="text-[#295F9A] hover:underline"
                >
                  Sign Up
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
