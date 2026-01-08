import { jwtDecode } from "jwt-decode";
import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { apiService, authService, cookieUtils } from "../services";

type Props = {
  open: boolean;
  onClose: () => void;
};

type AuthStep = "login" | "forgot" | "otp" | "reset" | "success";

const LoginModal: React.FC<Props> = ({ open, onClose }) => {
  const navigate = useNavigate();

  const [step, setStep] = useState<AuthStep>("login");
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [otp, setOtp] = useState(["", "", "", ""]);
  const otpRefs = useRef<HTMLInputElement[]>([]);
  const [otpToken, setOtpToken] = useState("");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Escape key closes modal
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  // Reset form when modal opens
  useEffect(() => {
    if (open) {
      setStep("login");
      setError("");
      setOtp(["", "", "", ""]);
      setNewPassword("");
      setConfirmPassword("");
      setOtpToken("");
    }
  }, [open]);

  // Auto-reset to login after success
  useEffect(() => {
    if (step === "success") {
      const timer = setTimeout(() => setStep("login"), 2000);
      return () => clearTimeout(timer);
    }
  }, [step]);

  // ------------------- Handlers -------------------
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await apiService.post("/user/login", formData);

      if (response.token) authService.setToken(response.token);
      if (response.user) authService.setUser(response.user);

      const token =
        cookieUtils.getCookie("COOKIES_USER_ACCESS_TOKEN") ||
        cookieUtils.getCookie("authToken");

      const decoded: any = token ? jwtDecode(token) : {};
      onClose();
      navigate(decoded?.role === "admin" ? "/member/dashboard" : "/");
    } catch (err: any) {
      toast.error(err?.response?.data?.data?.message)
      // setError(
      //   err?.response?.data?.message || "Login failed. Please check credentials."
      // );
    } finally {
      setLoading(false);
    }
  };

  const handleSendOtp = async () => {
    if (!formData.email) {
      toast.error('Please enter your email.')
      // setError("Please enter your email.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      await apiService.post("/otp/create", {
        email: formData.email,
        type: "UFP", // User Forgot Password
      });
      setStep("otp");
    } catch (err: any) {
      toast.error(err?.response?.data?.data?.message)
      // setError(err?.response?.data?.message || "Failed to send OTP.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    const otpStr = otp.join("");
    if (otpStr.length < 4) {
      toast.error("Please enter full OTP.");
      // setError("Please enter full OTP.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await apiService.post("/otp/verify", {
        email: formData.email,
        type: "UFP",
        otp: Number(otpStr),
      });
      setOtpToken(res?.data?.response.otpToken || ""); // save token for reset
      setStep("reset");
    } catch (err: any) {
      toast.error(err?.response?.data?.data?.message)
      // setError(err?.response?.data?.message || "OTP verification failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (!newPassword || !confirmPassword) {
      toast.error("Please fill all password fields.");
      // setError("Please fill all password fields.");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match.");
      // setError("Passwords do not match.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      await apiService.post("/user/forgot/password", {
        email: formData.email,
        otpToken: otpToken,
        newPassword,
        confirmPassword,
      });
      setStep("success");
    } catch (err: any) {
      toast.error(err?.response?.data?.data?.message)
      // setError(err?.response?.data?.message || "Failed to reset password.");
    } finally {
      setLoading(false);
    }
  };

  // ------------------- OTP Input -------------------
  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value.replace(/\D/g, "");
    const copy = [...otp];
    copy[index] = value;
    setOtp(copy);

    if (value && index < otp.length - 1) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  if (!open) return null;

  // ------------------- Render -------------------
  return (
    <div className="fixed inset-0 z-[60]">
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-[1px]"
        onClick={onClose}
      ></div>

      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="w-full max-w-[500px] bg-white rounded-none shadow-2xl relative">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100"
          >
            ✕
          </button>

          <div className="px-10 pt-12 pb-8">
            {error && (
              <div className="text-red-600 text-sm text-center bg-red-50 p-2 rounded mb-4">
                {error}
              </div>
            )}

            {/* LOGIN */}
            {step === "login" && (
              <>
                <h3 className="text-[28px] font-bold text-center mb-8">Log in</h3>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <label className="block text-[13px] font-medium mb-1">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full h-12 rounded-[8px] border border-black px-4"
                      placeholder="example@gmail.com"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-[13px] font-medium mb-1">Password</label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className="w-full h-12 rounded-[8px] border border-black pl-4 pr-10"
                        placeholder="Enter Your Password"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-3"
                      >
                        👁
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center text-[13px]">
                    <button
                      type="button"
                      onClick={() => setStep("forgot")}
                      className="text-[#295F9A] hover:underline"
                    >
                      Forgot Password?
                    </button>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#295F9A] text-white h-11 font-semibold"
                  >
                    {loading ? "Signing in..." : "Login"}
                  </button>
                </form>

                <div className="flex items-center my-3">
                  <div className="flex-1 h-px bg-[#000]" />
                  <span className="px-6 text-[12px] text-[#3E3232]">Or</span>
                  <div className="flex-1 h-px bg-[#000]" />
                </div>

                <div className="text-center text-[13px] text-gray-900 font-medium">
                  Don't have an account?{" "}
                  <button
                    onClick={() => navigate("/join-isi")}
                    type="button"
                    className="text-[#295F9A] hover:underline"
                  >
                    Sign Up
                  </button>
                </div>
              </>
            )}

            {/* FORGOT PASSWORD */}
            {step === "forgot" && (
              <>
                <h3 className="text-[28px] font-bold text-center mb-6">Forgot Password</h3>
                <label className="block text-[13px] font-medium mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full h-12 rounded-[8px] border border-black px-4 mb-4"
                  placeholder="Enter your email"
                  required
                />
                <button
                  onClick={handleSendOtp}
                  className="w-full bg-[#295F9A] text-white h-11 font-semibold"
                >
                  {loading ? "Sending OTP..." : "Send OTP"}
                </button>
                <button
                  onClick={() => setStep("login")}
                  className="w-full text-[#295F9A] text-sm mt-3"
                >
                  Back to Login
                </button>
              </>
            )}

            {/* OTP */}
            {step === "otp" && (
              <>
                <h3 className="text-[28px] font-bold text-center mb-6">Verify OTP</h3>
                <div className="flex justify-center gap-3 mb-6">
                  {otp.map((v, i) => (
                    <input
                      key={i}
                      ref={(el) => (otpRefs.current[i] = el!)}
                      maxLength={1}
                      value={v}
                      className="w-12 h-12 border border-black text-center text-lg"
                      onChange={(e) => handleOtpChange(e, i)}
                      onKeyDown={(e) => handleOtpKeyDown(e, i)}
                    />
                  ))}
                </div>
                <button
                  onClick={handleVerifyOtp}
                  className="w-full bg-[#295F9A] text-white h-11 font-semibold"
                >
                  {loading ? "Verifying..." : "Verify OTP"}
                </button>
                <button
                  type="button"
                  onClick={handleSendOtp}
                  className="w-full text-[#295F9A] text-sm mt-3 hover:underline"
                >
                  Resend OTP
                </button>
              </>
            )}

            {/* RESET PASSWORD */}
            {step === "reset" && (
              <>
                <h3 className="text-[28px] font-bold text-center mb-6">Reset Password</h3>

                <label className="block text-[13px] font-medium mb-1">New Password</label>
                <div className="relative mb-3">
                  <input
                    type={showNewPassword ? "text" : "password"}
                    className="w-full h-12 rounded-[8px] border border-black pl-4 pr-10"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute inset-y-0 right-3"
                  >
                    👁
                  </button>
                </div>

                <label className="block text-[13px] font-medium mb-1">Confirm Password</label>
                <div className="relative mb-4">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    className="w-full h-12 rounded-[8px] border border-black pl-4 pr-10"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-3"
                  >
                    👁
                  </button>
                </div>

                <button
                  onClick={handleResetPassword}
                  className="w-full bg-[#295F9A] text-white h-11 font-semibold"
                >
                  {loading ? "Resetting..." : "Reset Password"}
                </button>
              </>
            )}

            {/* SUCCESS */}
            {step === "success" && (
              <div className="text-center">
                <h3 className="text-[22px] font-bold text-green-600">
                  Password reset successfully
                </h3>
                <p className="text-sm mt-2">Redirecting to login...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
