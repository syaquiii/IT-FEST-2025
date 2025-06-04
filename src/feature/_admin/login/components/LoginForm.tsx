import { Button } from "@/shared/components/ui/Button";
import { Input } from "@/shared/components/ui/Input";

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
  logout,
}) => {
  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md mx-auto min-h-[20rem] p-4 sm:p-6 md:p-8 text-white font-changa bg-blue-400 rounded-2xl sm:rounded-3xl border-2 border-purple-300 relative"
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

          <div className="text-xs sm:text-sm text-white/80 italic group">
            <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
            Forgot password? Please contact PIT for assistance
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

          {isAuthenticated && (
            <div className="pt-2">
              <Button
                type="button"
                onClick={logout}
                size={"small"}
                disabled={loading}
                className="w-full text-sm sm:text-base bg-red-500 hover:bg-red-600"
              >
                Logout
              </Button>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
