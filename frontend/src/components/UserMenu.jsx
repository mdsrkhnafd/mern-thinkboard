import { LogOutIcon, UserIcon } from "lucide-react";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

const UserMenu = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) return null;

  const handleLogout = () => {
    logout();
    toast.success("Logged out");
    navigate("/login");
  };

  return (
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost gap-2">
        <div className="size-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold">
          {user.name?.charAt(0).toUpperCase()}
        </div>
        <span className="hidden sm:inline">{user.name}</span>
      </div>

      <ul
        tabIndex={0}
        className="dropdown-content menu bg-base-100 rounded-box z-10 w-56 p-2 shadow-xl border border-base-content/10 mt-2"
      >
        <li className="menu-title flex flex-row items-center gap-2">
          <UserIcon className="size-4" />
          <span className="truncate">{user.email}</span>
        </li>
        <li>
          <button onClick={handleLogout} className="text-error">
            <LogOutIcon className="size-4" />
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

export default UserMenu;
