import { useState } from "react";
import { Link, useNavigate } from "react-router";
import toast from "react-hot-toast";
import { EyeIcon, EyeOffIcon, LockIcon, MailIcon } from "lucide-react";
import api from "../lib/axios";
import { useAuth } from "../context/AuthContext";
import AuthLayout from "../components/AuthLayout";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim() || !password) {
      toast.error("Email and password are required");
      return;
    }

    setLoading(true);
    try {
      const res = await api.post("/auth/login", { email, password });
      login(res.data);
      toast.success(`Welcome back, ${res.data.name}!`);
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Login to access your notes"
      footer={
        <>
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-primary font-medium hover:underline"
          >
            Sign up
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium mb-2">Email</label>
          <label className="input input-bordered flex items-center gap-3 w-full">
            <MailIcon className="size-4 opacity-60" />
            <input
              type="email"
              placeholder="you@example.com"
              className="grow"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Password</label>
          <label className="input input-bordered flex items-center gap-3 w-full">
            <LockIcon className="size-4 opacity-60" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className="grow"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="opacity-60 hover:opacity-100"
            >
              {showPassword ? (
                <EyeOffIcon className="size-4" />
              ) : (
                <EyeIcon className="size-4" />
              )}
            </button>
          </label>
        </div>

        <button
          type="submit"
          className="btn btn-primary w-full"
          disabled={loading}
        >
          {loading ? (
            <span className="loading loading-spinner loading-sm" />
          ) : (
            "Login"
          )}
        </button>
      </form>
    </AuthLayout>
  );
};

export default LoginPage;
