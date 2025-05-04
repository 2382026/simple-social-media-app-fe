import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "../../utils/AxiosInstance";
import { useMutation } from "@tanstack/react-query";

export type RegisterInput = {
  email: string;
  username: string;
  password: string;
};

const RegisterForm = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<RegisterInput>();

  const handleRegister = async (data: RegisterInput) => {
    try {
      await axios.post("/api/auth/register", {
        email: data.email,
        username: data.username,
        password: data.password
      });
      alert("User successfully registered");
      navigate("/login");
    } catch (err) {
      alert("Username or email already registered");
    }
  };

  const { mutate, isPending } = useMutation({
    mutationFn: handleRegister
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
            htmlFor="username"
            className="block text-sm font-medium text-gray-700"
          >
            Username
          </label>
          <input
            id="username"
            type="text"
            required
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="yourusername"
            {...register("username")}
          />
          {errors.username && (
            <p className="text-red-600 text-xs italic">
              Username is required.
            </p>
          )}
        </div>

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
            Register
          </button>
        </div>
      </form>

      <p className="mt-4 text-center text-sm text-gray-600">
        Already have an account?{" "}
        <a
          onClick={() => navigate("/login")}
          className="text-blue-600 hover:underline cursor-pointer"
        >
          Login
        </a>
      </p>
    </div>
  );
};

export default RegisterForm;