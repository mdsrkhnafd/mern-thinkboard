import { NotebookPenIcon } from "lucide-react";

const AuthLayout = ({ title, subtitle, children, footer }) => (
  <div className="min-h-screen flex items-center justify-center px-4 py-10">
    <div className="w-full max-w-md">
      <div className="flex flex-col items-center mb-8">
        <div className="size-14 rounded-2xl bg-primary/10 border border-primary/30 flex items-center justify-center mb-4">
          <NotebookPenIcon className="size-7 text-primary" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
        <p className="text-base-content/60 mt-2 text-center">{subtitle}</p>
      </div>

      <div className="card bg-base-100/80 backdrop-blur border border-base-content/10 shadow-2xl">
        <div className="card-body p-8">{children}</div>
      </div>

      <p className="text-center text-sm text-base-content/60 mt-6">{footer}</p>
    </div>
  </div>
);

export default AuthLayout;
