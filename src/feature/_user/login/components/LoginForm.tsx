import { Button } from "@/shared/components/ui/Button";
import { Input } from "@/shared/components/ui/Input";
import Link from "next/link";

interface LoginFormProps {
  email: string;
  password: string;
  error: string;
  loading: boolean;
  isAuthenticated: boolean;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
  logout: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({
  email,
  password,
  error,
  loading,
  isAuthenticated,
  setEmail,
  setPassword,
  handleSubmit,
}) => {
  if (isAuthenticated) {
    return (
      <div className="flex items-center justify-center">
        <div className="bg-green-500 shadow-lg rounded-3xl border-[3px] border-green-300 p-8 text-center transform transition-all scale-100 hover:scale-105">
          <div className="flex justify-center mb-2">
            <svg
              className="w-12 h-12 text-white animate-pulse"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m-6 6h6m-3 3a9 9 0 110-18 9 9 0 010 18z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-extrabold text-white mb-2">
            Login Berhasil!
          </h2>
          <p className="text-green-100 mb-4 text-lg font-medium">
            Mengalihkan ke halaman Home...
          </p>
          <div className="animate-spin w-8 h-8 border-b-4 border-white rounded-full mx-auto"></div>
        </div>
      </div>
    );
  }
  return (
    <div className="w-full max-w-xl mx-auto ">
      <form
        onSubmit={handleSubmit}
        className="w-full min-h-[20rem] z-10 p-4 sm:p-6 md:p-8 text-white font-changa bg-blue-400 rounded-2xl sm:rounded-3xl border-2 border-purple-300 relative"
      >
        <div className="space-y-3 sm:space-y-4">
          {error && (
            <div className="text-red-200 text-sm bg-red-500/20 p-3 rounded border border-red-300/20">
              <div className="font-semibold">❌ Error:</div>
              {error}
            </div>
          )}

          <Input
            label="Email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
            className="text-sm sm:text-base"
          />

          <Input
            label="Password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={loading}
            className="text-sm sm:text-base"
          />

          <div className="text-sm text-right sm:text-sm text-white/80 text-glow ">
            <Link href={"/forgot-password"} className="text-[#85FFF5]">
              Forgot password?
            </Link>
          </div>

          <div className="pt-3 sm:pt-4">
            <Button
              type="submit"
              size={"small"}
              disabled={loading || !email || !password || isAuthenticated}
              className="w-full text-sm sm:text-base disabled:opacity-50"
            >
              {loading
                ? "Logging in..."
                : isAuthenticated
                ? "Already Logged In"
                : "Login"}
            </Button>
          </div>
          <div className="w-full flex justify-center">
            <span>
              Belum punya akun?{" "}
              <Link className="text-[#85FFF5]" href={"/register"}>
                Daftar
              </Link>
            </span>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
