import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../store/slices/authSlice.js";
import { BookOpen, Loader2, Mail, Lock, User, GraduationCap, ShieldCheck, Sparkles, ArrowRight, AlertCircle } from "lucide-react";

const SignupPage = () => {
  const dispatch = useDispatch();
  const { isLoggingIn, authUser } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "Student",
  });

  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
    setApiError("");
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Full name is required";
    } else if (formData.name.trim().length < 3) {
      newErrors.name = "Name must be at least 3 characters";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirm password is required";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    
    const registrationData = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      role: formData.role,
    };

    dispatch(register(registrationData));
  };

  useEffect(() => {
    if (authUser) {
      const role = authUser.role.toLowerCase();
      navigate(`/${role}`);
    }
  }, [authUser, navigate]);

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-slate-50 via-white to-blue-50 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950/30 flex items-center justify-center px-6 py-12 overflow-hidden relative">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/2 -right-24 w-80 h-80 bg-indigo-600/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-[1200px] w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left Side: Branding & Info */}
        <div className="hidden lg:block space-y-12">
          <div className="badge-primary animate-in fade-in slide-in-from-left-4 duration-700">
            <Sparkles size={14} />
            Begin Your Journey
          </div>

          <div className="space-y-6">
            <h1 className="heading-lg !text-6xl !leading-[1.1] animate-in fade-in slide-in-from-left-8 duration-700 delay-100">
              Join Our <br />
              <span className="text-blue-600">Academic Community</span>
            </h1>
            <p className="text-body-lg animate-in fade-in slide-in-from-left-10 duration-700 delay-200">
              Create an account and start managing your Final Year Project with our comprehensive platform designed for students, teachers, and administrators.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 animate-in fade-in slide-in-from-left-12 duration-700 delay-300">
            <div className="space-y-2">
              <div className="heading-lg">3</div>
              <div className="text-tiny">User Roles</div>
            </div>
            <div className="space-y-2">
              <div className="heading-lg">Secure</div>
              <div className="text-tiny">Data Protection</div>
            </div>
          </div>
        </div>

        {/* Right Side: Signup Card */}
        <div className="w-full max-w-md mx-auto animate-in fade-in zoom-in duration-700">
          <div className="premium-card relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600" />

            <div className="mb-8 text-center">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-[1.5rem] bg-blue-600 shadow-xl shadow-blue-600/30 mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                <GraduationCap className="h-8 w-8 text-white" />
              </div>
              <h2 className="heading-lg">Create Account</h2>
              <p className="text-body font-bold mt-2">Join ProjectSphere today</p>
            </div>

            {/* API Error Alert */}
            {apiError && (
              <div className="mb-6 p-3 rounded-xl bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800 flex items-start gap-3">
                <AlertCircle size={18} className="text-rose-600 dark:text-rose-400 flex-shrink-0 mt-0.5" />
                <p className="text-tiny text-rose-700 dark:text-rose-300">{apiError}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Role Selection */}
              <div className="space-y-2">
                <label className="text-tiny ml-1 font-bold">Select Role</label>
                <div className="grid grid-cols-3 gap-2">
                  {["Student", "Teacher", "Admin"].map((r) => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => setFormData({ ...formData, role: r })}
                      className={`py-3 rounded-xl text-tiny font-bold transition-all ${
                        formData.role === r
                          ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                          : "bg-slate-50 dark:bg-slate-900 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
                      }`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>

              {/* Full Name */}
              <div className="space-y-2">
                <label className="text-tiny ml-1 font-bold">Full Name</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <User size={18} className="text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                  </div>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full h-14 bg-slate-50 dark:bg-slate-900 border-2 border-transparent rounded-[1.2rem] pl-12 pr-4 text-body-bold outline-none transition-all focus:bg-white dark:focus:bg-slate-800 focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/5 dark:text-white ${
                      errors.name ? "border-rose-500/50" : ""
                    }`}
                    placeholder="John Doe"
                  />
                </div>
                {errors.name && (
                  <p className="text-tiny text-rose-600 dark:text-rose-400 ml-1">{errors.name}</p>
                )}
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="text-tiny ml-1 font-bold">Email Address</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail size={18} className="text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full h-14 bg-slate-50 dark:bg-slate-900 border-2 border-transparent rounded-[1.2rem] pl-12 pr-4 text-body-bold outline-none transition-all focus:bg-white dark:focus:bg-slate-800 focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/5 dark:text-white ${
                      errors.email ? "border-rose-500/50" : ""
                    }`}
                    placeholder="your@email.com"
                  />
                </div>
                {errors.email && (
                  <p className="text-tiny text-rose-600 dark:text-rose-400 ml-1">{errors.email}</p>
                )}
              </div>

              {/* Password */}
              <div className="space-y-2">
                <label className="text-tiny ml-1 font-bold">Password</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock size={18} className="text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                  </div>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`w-full h-14 bg-slate-50 dark:bg-slate-900 border-2 border-transparent rounded-[1.2rem] pl-12 pr-4 text-body-bold outline-none transition-all focus:bg-white dark:focus:bg-slate-800 focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/5 dark:text-white ${
                      errors.password ? "border-rose-500/50" : ""
                    }`}
                    placeholder="Enter 8+ characters"
                  />
                </div>
                {errors.password && (
                  <p className="text-tiny text-rose-600 dark:text-rose-400 ml-1">{errors.password}</p>
                )}
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">
                <label className="text-tiny ml-1 font-bold">Confirm Password</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock size={18} className="text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                  </div>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={`w-full h-14 bg-slate-50 dark:bg-slate-900 border-2 border-transparent rounded-[1.2rem] pl-12 pr-4 text-body-bold outline-none transition-all focus:bg-white dark:focus:bg-slate-800 focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/5 dark:text-white ${
                      errors.confirmPassword ? "border-rose-500/50" : ""
                    }`}
                    placeholder="Confirm password"
                  />
                </div>
                {errors.confirmPassword && (
                  <p className="text-tiny text-rose-600 dark:text-rose-400 ml-1">{errors.confirmPassword}</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoggingIn}
                className="mt-8 w-full h-14 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white heading-md rounded-[1.2rem] font-bold transition-all hover:shadow-lg hover:shadow-blue-600/20 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoggingIn ? (
                  <>
                    <Loader2 size={20} className="animate-spin" />
                    Creating Account...
                  </>
                ) : (
                  <>
                    Create Account
                    <ArrowRight size={20} />
                  </>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="my-6 flex items-center gap-3">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent to-slate-200 dark:to-slate-800" />
              <span className="text-tiny text-slate-500">Already have an account?</span>
              <div className="flex-1 h-px bg-gradient-to-l from-transparent to-slate-200 dark:to-slate-800" />
            </div>

            {/* Login Link */}
            <Link
              to="/login"
              className="block w-full py-3 text-center border-2 border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400 rounded-[1.2rem] heading-sm font-bold hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all"
            >
              Sign In Instead
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
