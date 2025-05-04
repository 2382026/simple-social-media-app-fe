import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../utils/AuthProvider";
import axios from "../../utils/AxiosInstance";
import { useMutation } from "@tanstack/react-query";
import { toast } from 'react-hot-toast'; // Ganti dari react-toastify ke react-hot-toast

export type LoginInput = {
  email: string;
  password: string;
};

const LoginForm = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginInput>();

  const handleLogin = async (data: LoginInput) => {
    try {
      const res = await axios.post<{ access_token: string }>(
        "/api/auth/login",
        {
          email: data.email,
          password: data.password
        }
      );

      if (res.data) {
        login(res.data.access_token);
        navigate("/");
        toast.success("Login berhasil"); // Tambahkan notifikasi sukses
      }
    } catch (err) {
      toast.error("Email atau password salah");
    }
  };

  const { mutate, isPending } = useMutation({
    mutationFn: handleLogin
  });

  return (
    <div className="w-full">
      {isPending && (
        <div className="absolute inset-0 bg-white bg-opacity-70 flex items-center justify-center z-20 rounded-2xl">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      <form
        className="space-y-5"
        onSubmit={handleSubmit((data) => mutate(data))}
      >
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email address
          </label>
          <input
            id="email"
            type="email"
            required
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="you@example.com"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-red-600 text-xs italic">
              Email is required.
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            required
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="••••••••"
            {...register("password")}
          />
          {errors.password && (
            <p className="text-red-600 text-xs italic">
              Password is required.
            </p>
          )}
        </div>

        <div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Sign In
          </button>
        </div>
      </form>

      <p className="mt-4 text-center text-sm text-gray-600">
        Don't have an account?{" "}
        <a
          onClick={() => navigate("/register")}
          className="text-blue-600 hover:underline cursor-pointer"
        >
          Sign up
        </a>
      </p>
    </div>
  );
};

export default LoginForm;