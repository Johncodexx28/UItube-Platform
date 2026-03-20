import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  User,
  Eye,
  EyeOff,
  BookOpen,
  Presentation,
  Check,
  AlertCircle,
  ArrowLeft,
  Mail,
  KeyRound,
  RefreshCw,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

const AuthPage = () => {
  const {
    login, register, user,
    verifyEmail, resendVerification,
    forgotPassword, resetPassword,
  } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const getInitialView = (pathname) => {
    if (pathname === "/register") return "register";
    if (pathname === "/forgot-password") return "forgot";
    if (pathname === "/reset-password") return "reset";
    return "login";
  };

  // Views: "login" | "register" | "verify" | "forgot" | "reset"
  const [view, setView] = useState(getInitialView(location.pathname));
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("Student");

  // Form fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Verification code (6 digits)
  const [verificationCode, setVerificationCode] = useState(["", "", "", "", "", ""]);
  const codeInputRefs = useRef([]);
  const [pendingEmail, setPendingEmail] = useState("");

  // Reset password fields
  const [resetCode, setResetCode] = useState(["", "", "", "", "", ""]);
  const resetCodeRefs = useRef([]);
  const [newPassword, setNewPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);

  // Resend cooldown
  const [resendCooldown, setResendCooldown] = useState(0);

  useEffect(() => {
    setView(getInitialView(location.pathname));
    // Reset transient message states on navigation
    setError("");
    setSuccessMsg("");
    setShowPassword(false);
  }, [location.pathname]);

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  // Resend cooldown timer
  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  // Handle code input for verification
  const handleCodeChange = (index, value, codeArray, setCodeArray, refs) => {
    if (value.length > 1) {
      // Handle paste
      const pasted = value.replace(/\D/g, "").slice(0, 6);
      const newCode = [...codeArray];
      for (let i = 0; i < 6; i++) {
        newCode[i] = pasted[i] || "";
      }
      setCodeArray(newCode);
      const focusIdx = Math.min(pasted.length, 5);
      refs.current[focusIdx]?.focus();
      return;
    }

    if (value && !/^\d$/.test(value)) return;

    const newCode = [...codeArray];
    newCode[index] = value;
    setCodeArray(newCode);

    if (value && index < 5) {
      refs.current[index + 1]?.focus();
    }
  };

  const handleCodeKeyDown = (index, e, codeArray, setCodeArray, refs) => {
    if (e.key === "Backspace" && !codeArray[index] && index > 0) {
      const newCode = [...codeArray];
      newCode[index - 1] = "";
      setCodeArray(newCode);
      refs.current[index - 1]?.focus();
    }
  };

  // ---------- SUBMIT HANDLERS ----------

  const handleLoginRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");
    setIsSubmitting(true);

    try {
      if (view === "login") {
        const data = await login(email, password);
        if (data?.needsVerification) {
          setPendingEmail(data.email);
          setView("verify");
          setResendCooldown(0);
        }
      } else {
        const data = await register({ name, email, password, role });
        if (data?.needsVerification) {
          setPendingEmail(data.email);
          setView("verify");
          setResendCooldown(60);
        }
      }
    } catch (err) {
      const msg = err.message || "Authentication failed. Please try again.";
      // If server says needs verification (e.g. from login attempt)
      if (err.data?.needsVerification) {
        setPendingEmail(err.data.email);
        setView("verify");
        setResendCooldown(0);
      } else {
        setError(msg);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVerifyEmail = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const code = verificationCode.join("");
      if (code.length !== 6) {
        setError("Please enter the complete 6-digit code.");
        setIsSubmitting(false);
        return;
      }
      await verifyEmail(pendingEmail, code);
      // AuthContext will set user and useEffect will redirect to dashboard
    } catch (err) {
      setError(err.message || "Invalid verification code.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResendCode = async () => {
    if (resendCooldown > 0) return;
    setError("");
    try {
      await resendVerification(pendingEmail);
      setSuccessMsg("A new verification code has been sent to your email.");
      setResendCooldown(60);
      setVerificationCode(["", "", "", "", "", ""]);
    } catch (err) {
      setError(err.message || "Failed to resend code.");
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");
    setIsSubmitting(true);

    try {
      const data = await forgotPassword(email);
      setPendingEmail(email);
      setSuccessMsg(data.message);
      setView("reset");
      setResendCooldown(60);
    } catch (err) {
      setError(err.message || "Failed to send reset code.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");
    setIsSubmitting(true);

    try {
      const code = resetCode.join("");
      if (code.length !== 6) {
        setError("Please enter the complete 6-digit code.");
        setIsSubmitting(false);
        return;
      }
      if (newPassword.length < 6) {
        setError("Password must be at least 6 characters.");
        setIsSubmitting(false);
        return;
      }
      const data = await resetPassword(pendingEmail, code, newPassword);
      setSuccessMsg(data.message);
      setTimeout(() => {
        setView("login");
        setSuccessMsg("");
        navigate("/login");
      }, 2000);
    } catch (err) {
      setError(err.message || "Failed to reset password.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResendResetCode = async () => {
    if (resendCooldown > 0) return;
    setError("");
    try {
      await forgotPassword(pendingEmail);
      setSuccessMsg("A new reset code has been sent to your email.");
      setResendCooldown(60);
      setResetCode(["", "", "", "", "", ""]);
    } catch (err) {
      setError(err.message || "Failed to resend code.");
    }
  };

  const toggleView = () => {
    setError("");
    setSuccessMsg("");
    if (view === "login") {
      navigate("/register");
    } else {
      navigate("/login");
    }
  };

  // ---------- CODE INPUT COMPONENT ----------

  const CodeInputGroup = ({ code, setCode, refs }) => (
    <div className="flex justify-center gap-2.5">
      {code.map((digit, i) => (
        <input
          key={i}
          ref={(el) => (refs.current[i] = el)}
          type="text"
          inputMode="numeric"
          maxLength={6}
          value={digit}
          onChange={(e) => handleCodeChange(i, e.target.value, code, setCode, refs)}
          onKeyDown={(e) => handleCodeKeyDown(i, e, code, setCode, refs)}
          className="w-12 h-14 text-center text-xl font-bold bg-white border-2 border-gray-200 rounded-xl outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-gray-800"
        />
      ))}
    </div>
  );

  // ---------- RENDER ----------

  const renderLeftPanel = () => (
    <div className="w-full md:w-5/12 bg-[#f4fcf9] p-10 hidden md:flex flex-col relative overflow-hidden border-r border-[#eaf6f2]">
      <div className="flex items-center space-x-3 z-10 mb-12">
        <Link
          to="/"
          className="flex items-center space-x-3 font-extrabold text-2xl tracking-tighter text-slate-800"
        >
          UI<span className="text-primary">Tube</span>
        </Link>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center relative z-10 w-full mb-8">
        <div className="relative w-full aspect-square max-w-sm flex items-center justify-center">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 h-4/5">
            <div className="absolute bottom-0 left-[10%] w-16 h-36 bg-[#001f3f] rounded-t-3xl rounded-b-sm border-4 border-white z-20"></div>
            <div className="absolute bottom-34 left-[10%] w-24 h-24 bg-[#001f3f] rounded-t-[3rem] rounded-b-xl -translate-x-4 z-10 border-4 border-white"></div>
            <div className="absolute bottom-56 left-[15%] w-10 h-10 bg-[#e0e0e0] rounded-full z-10 border-2 border-slate-700"></div>
            <div className="absolute bottom-0 right-[5%] w-[70%] h-[75%] bg-[#ebf5fa] rounded-t-xl z-0 shadow-lg border-2 border-[#d3e6ee] flex flex-col px-4 pt-6">
              <div className="w-full h-8 bg-white mb-4 rounded border border-[#d3e6ee]"></div>
              <div className="w-full h-8 bg-white mb-4 rounded border border-[#d3e6ee]"></div>
              <div className="w-full h-8 bg-white mb-6 rounded border border-[#d3e6ee]"></div>
              <div className="w-[45%] h-8 bg-primary rounded border border-[#d3e6ee]"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderFormContent = () => {
    // ----- VERIFY EMAIL VIEW -----
    if (view === "verify") {
      return (
        <>
          <button
            onClick={() => { setView("login"); navigate("/login"); setError(""); setSuccessMsg(""); }}
            className="flex items-center gap-2 text-gray-400 hover:text-gray-600 transition-colors mb-6 text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Login
          </button>

          <div className="mb-8 text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Mail className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-[2rem] font-bold text-slate-800 tracking-tight leading-tight mb-1">
              Verify Your Email
            </h2>
            <p className="text-gray-400/80 text-[15px] font-medium">
              We sent a 6-digit code to<br />
              <span className="text-gray-700 font-semibold">{pendingEmail}</span>
            </p>
          </div>

          {error && (
            <div className="mb-6 bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-lg flex items-center gap-3 text-sm animate-in fade-in slide-in-from-top-1">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <p className="font-medium">{error}</p>
            </div>
          )}
          {successMsg && (
            <div className="mb-6 bg-green-50 border border-green-100 text-green-600 px-4 py-3 rounded-lg flex items-center gap-3 text-sm animate-in fade-in slide-in-from-top-1">
              <Check className="w-5 h-5 shrink-0" />
              <p className="font-medium">{successMsg}</p>
            </div>
          )}

          <form onSubmit={handleVerifyEmail} className="space-y-6">
            <CodeInputGroup
              code={verificationCode}
              setCode={setVerificationCode}
              refs={codeInputRefs}
            />

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#18c465] hover:bg-[#15a856] text-white py-3 rounded-md font-semibold transition-all active:scale-[0.99] shadow-sm shadow-[#18c465]/40 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Verifying..." : "Verify Email"}
            </button>
          </form>

          <div className="text-center mt-6">
            <p className="text-[13px] text-gray-400 font-medium">
              Didn't receive the code?{" "}
              <button
                onClick={handleResendCode}
                disabled={resendCooldown > 0}
                className="text-primary hover:text-primary-dark font-bold transition-colors disabled:text-gray-300 disabled:cursor-not-allowed"
              >
                {resendCooldown > 0 ? `Resend in ${resendCooldown}s` : "Resend Code"}
              </button>
            </p>
          </div>
        </>
      );
    }

    // ----- FORGOT PASSWORD VIEW -----
    if (view === "forgot") {
      return (
        <>
          <button
            onClick={() => { setView("login"); navigate("/login"); setError(""); setSuccessMsg(""); }}
            className="flex items-center gap-2 text-gray-400 hover:text-gray-600 transition-colors mb-6 text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Login
          </button>

          <div className="mb-8">
            <div className="w-16 h-16 bg-amber-50 rounded-2xl flex items-center justify-center mb-4">
              <KeyRound className="w-8 h-8 text-amber-500" />
            </div>
            <h2 className="text-[2rem] font-bold text-slate-800 tracking-tight leading-tight mb-1">
              Forgot Password?
            </h2>
            <p className="text-gray-400/80 text-[15px] font-medium">
              Enter your email and we'll send you a code to reset your password.
            </p>
          </div>

          {error && (
            <div className="mb-6 bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-lg flex items-center gap-3 text-sm animate-in fade-in slide-in-from-top-1">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <p className="font-medium">{error}</p>
            </div>
          )}

          <form onSubmit={handleForgotPassword} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-[13px] font-semibold text-gray-400">
                Your email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-md outline-none focus:border-primary transition-all text-gray-800 text-[15px]"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#18c465] hover:bg-[#15a856] text-white py-3 rounded-md font-semibold transition-all active:scale-[0.99] mt-2 shadow-sm shadow-[#18c465]/40 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Sending..." : "Send Reset Code"}
            </button>
          </form>
        </>
      );
    }

    // ----- RESET PASSWORD VIEW -----
    if (view === "reset") {
      return (
        <>
          <button
            onClick={() => { setView("forgot"); setError(""); setSuccessMsg(""); }}
            className="flex items-center gap-2 text-gray-400 hover:text-gray-600 transition-colors mb-6 text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button>

          <div className="mb-8 text-center">
            <div className="w-16 h-16 bg-amber-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <KeyRound className="w-8 h-8 text-amber-500" />
            </div>
            <h2 className="text-[2rem] font-bold text-slate-800 tracking-tight leading-tight mb-1">
              Reset Password
            </h2>
            <p className="text-gray-400/80 text-[15px] font-medium">
              Enter the code sent to<br />
              <span className="text-gray-700 font-semibold">{pendingEmail}</span>
            </p>
          </div>

          {error && (
            <div className="mb-6 bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-lg flex items-center gap-3 text-sm animate-in fade-in slide-in-from-top-1">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <p className="font-medium">{error}</p>
            </div>
          )}
          {successMsg && (
            <div className="mb-6 bg-green-50 border border-green-100 text-green-600 px-4 py-3 rounded-lg flex items-center gap-3 text-sm animate-in fade-in slide-in-from-top-1">
              <Check className="w-5 h-5 shrink-0" />
              <p className="font-medium">{successMsg}</p>
            </div>
          )}

          <form onSubmit={handleResetPassword} className="space-y-5">
            <div>
              <label className="text-[13px] font-semibold text-gray-400 block mb-2">
                Reset Code
              </label>
              <CodeInputGroup
                code={resetCode}
                setCode={setResetCode}
                refs={resetCodeRefs}
              />
            </div>

            <div className="space-y-1.5 relative">
              <label className="text-[13px] font-semibold text-gray-400">
                New Password
              </label>
              <input
                type={showNewPassword ? "text" : "password"}
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="••••••••••••"
                minLength={6}
                className="w-full pl-4 pr-12 py-3 bg-white border border-gray-200 rounded-md outline-none focus:border-primary transition-all text-gray-700 tracking-widest placeholder:tracking-normal placeholder:text-gray-300"
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-4 bottom-3 text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#18c465] hover:bg-[#15a856] text-white py-3 rounded-md font-semibold transition-all active:scale-[0.99] shadow-sm shadow-[#18c465]/40 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Resetting..." : "Reset Password"}
            </button>
          </form>

          <div className="text-center mt-6">
            <p className="text-[13px] text-gray-400 font-medium">
              Didn't receive the code?{" "}
              <button
                onClick={handleResendResetCode}
                disabled={resendCooldown > 0}
                className="text-primary hover:text-primary-dark font-bold transition-colors disabled:text-gray-300 disabled:cursor-not-allowed"
              >
                {resendCooldown > 0 ? `Resend in ${resendCooldown}s` : "Resend Code"}
              </button>
            </p>
          </div>
        </>
      );
    }

    // ----- LOGIN / REGISTER VIEW -----
    return (
      <>
        <div className="mb-8">
          <h2 className="text-[2rem] font-bold text-slate-800 tracking-tight leading-tight mb-1">
            {view === "login" ? "Login" : "Register"}
          </h2>
          <p className="text-gray-400/80 text-[15px] font-medium">
            {view === "login"
              ? "Welcome back! Please login to your account."
              : "Create an account to unlock all features."}
          </p>
        </div>

        {error && (
          <div className="mb-6 bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-lg flex items-center gap-3 text-sm animate-in fade-in slide-in-from-top-1">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <p className="font-medium">{error}</p>
          </div>
        )}

        <form onSubmit={handleLoginRegister} className="space-y-4">
          {view === "register" && (
            <div className="space-y-1.5">
              <label className="text-[13px] font-semibold text-gray-400">
                Your Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-md outline-none focus:border-primary transition-all text-gray-800 text-[15px]"
              />
            </div>
          )}

          <div className="space-y-1.5">
            <label className="text-[13px] font-semibold text-gray-400">
              Your email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="robbertalex99@gmail.com"
              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-md outline-none focus:border-primary transition-all text-gray-800 text-[15px]"
            />
          </div>

          <div className="space-y-1.5 pt-1">
            <label className="text-[13px] font-semibold text-gray-400">
              Your Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                minLength={view === "register" ? 6 : undefined}
                className="w-full pl-4 pr-12 py-3 bg-white border border-gray-200 rounded-md outline-none focus:border-primary transition-all text-gray-700 tracking-widest placeholder:tracking-normal placeholder:text-gray-300"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 bottom-3 text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {view === "register" && (
              <p className="text-[11.5px] text-gray-400 mt-1 font-medium">
                Password must be at least 6 characters.
              </p>
            )}
          </div>

          {view === "register" && (
            <div className="space-y-2 pt-2">
              <label className="text-[13px] font-semibold text-gray-400">
                I am a...
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setRole("Student")}
                  className={`flex items-center justify-center gap-2 py-3 px-4 rounded-md border transition-all ${
                    role === "Student"
                      ? "border-primary bg-primary/5 text-primary"
                      : "border-gray-200 bg-white text-gray-500 hover:bg-gray-50"
                  }`}
                >
                  <BookOpen className="w-4 h-4" />
                  <span className="font-medium text-sm">Student</span>
                </button>
                <button
                  type="button"
                  onClick={() => setRole("Teacher")}
                  className={`flex items-center justify-center gap-2 py-3 px-4 rounded-md border transition-all ${
                    role === "Teacher"
                      ? "border-primary bg-primary/5 text-primary"
                      : "border-gray-200 bg-white text-gray-500 hover:bg-gray-50"
                  }`}
                >
                  <Presentation className="w-4 h-4" />
                  <span className="font-medium text-sm">Teacher</span>
                </button>
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full bg-[#18c465] hover:bg-[#15a856] text-white py-3 rounded-md font-semibold transition-all active:scale-[0.99] mt-2 shadow-sm shadow-[#18c465]/40 disabled:opacity-70 disabled:cursor-not-allowed`}
          >
            {isSubmitting
              ? "Processing..."
              : view === "login"
                ? "Login"
                : "Register"}
          </button>
        </form>

        <div className="mt-6 mb-6">
          <div className="relative flex items-center justify-center">
            <span className="absolute w-full h-px bg-gray-100"></span>
            <span className="relative bg-white px-4 text-[13px] font-medium text-gray-300 lowercase">
              or
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-8">
          <button
            type="button"
            className="flex items-center justify-center space-x-2 border border-gray-200 rounded-md py-2.5 hover:bg-gray-50 transition-colors"
          >
            <svg
              className="w-4 h-4 text-[#1877F2]"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-[13px] font-semibold text-gray-600">
              Login with Facebook
            </span>
          </button>
          <button
            type="button"
            className="flex items-center justify-center space-x-2 border border-gray-200 rounded-md py-2.5 hover:bg-gray-50 transition-colors"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
              <path fill="none" d="M1 1h22v22H1z" />
            </svg>
            <span className="text-[13px] font-semibold text-gray-600">
              Login with Google
            </span>
          </button>
        </div>

        <div className="flex flex-col items-center justify-center space-y-2 mt-4">
          {view === "login" ? (
            <>
              <p className="text-[13.5px] text-gray-700 font-semibold">
                Don't have an account?{" "}
                <button
                  onClick={toggleView}
                  className="text-primary hover:text-primary-dark transition-colors font-bold"
                >
                  Sign up
                </button>
              </p>
              <button
                onClick={() => navigate("/forgot-password")}
                className="text-[13px] text-gray-400 font-medium hover:text-primary transition-colors"
              >
                Forgot Password?
              </button>
            </>
          ) : (
            <p className="text-[13.5px] text-gray-700 font-semibold">
              Already have an account?{" "}
              <button
                onClick={toggleView}
                className="text-primary hover:text-primary-dark transition-colors font-bold"
              >
                Login
              </button>
            </p>
          )}
        </div>
      </>
    );
  };

  return (
    <div className="w-full min-h-screen flex flex-col md:flex-row bg-white font-sans relative overflow-hidden">
      {renderLeftPanel()}

      {/* Right Side - Form */}
      <div className="w-full md:w-7/12 p-8 md:p-16 flex flex-col justify-center bg-white relative">
        <div className="w-full max-w-[400px] mx-auto">
          {/* Mobile Logo */}
          <div className="flex justify-center items-center space-x-3 mb-8 md:hidden">
            <span className="text-xl font-bold tracking-tight text-slate-800">
              UI<span className="text-primary">Tube</span>
            </span>
          </div>

          {renderFormContent()}
        </div>

        <div className="absolute bottom-6 left-1/2 md:left-3/4 md:-translate-x-1/2 -translate-x-1/2 w-1/2">
          <div className="border-t border-gray-100 pt-4 w-full flex justify-center">
            <p className="text-[11px] font-semibold text-gray-400">
              @ 2026 All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
