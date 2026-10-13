import { useState } from "react";
import { Link, useNavigate } from "react-router";
import toast from "react-hot-toast";
import {
  EyeIcon,
  EyeOffIcon,
  LockIcon,
  MailIcon,
  UserIcon,
} from "lucide-react";
import api from "../lib/axios";
import { useAuth } from "../context/AuthContext";
import AuthLayout from "../components/AuthLayout";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !password) {
      toast.error("All fields are required");
      return;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    if (password !== confirm) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      const res = await api.post("/auth/register", { name, email, password });
      login(res.data);
      toast.success("Account created successfully!");
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Create account"
      subtitle="Start organizing your notes today"
      footer={
        <>
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-primary font-medium hover:underline"
          >
            Login
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium mb-2">Full name</label>
          <label className="input input-bordered flex items-center gap-3 w-full">
            <UserIcon className="size-4 opacity-60" />
            <input
              type="text"
              placeholder="Mudasir Khan"
              className="grow"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="name"
            />
          </label>
        </div>

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
              placeholder="At least 6 characters"
              className="grow"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
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

        <div>
          <label className="block text-sm font-medium mb-2">
            Confirm password
          </label>
          <label className="input input-bordered flex items-center gap-3 w-full">
            <LockIcon className="size-4 opacity-60" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Repeat your password"
              className="grow"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              autoComplete="new-password"
            />
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
            "Create account"
          )}
        </button>
      </form>
    </AuthLayout>
  );
};

export default RegisterPage;
