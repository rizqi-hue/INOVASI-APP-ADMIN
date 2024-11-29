import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { KeyIcon, PhoneIcon } from "@heroicons/react/24/outline";
import { LoginCurve } from "iconsax-react";
import { useLocation, Link } from "react-router-dom";
import { useNotify, useLogin, useTranslate } from "react-admin";

type LoginForm = {
  phone: string;
  password: string;
};

const LoginPage: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();
  const [isLoading, setIsLoading] = useState(false);
  const [isFormInvalid, setIsFormInvalid] = useState(false);
  const location = useLocation();
  const notify = useNotify();
  const login = useLogin();
  const translate = useTranslate();

  const onSubmit = (data: LoginForm) => {
    setIsLoading(true);
    setIsFormInvalid(false);

    login(
      { PhoneNumber: data.phone, Password: data.password },
      location.state ? (location.state as any).nextPathname : "/admin/dashboard"
    )
      .then(() => setIsLoading(false))
      .catch((error: Error) => {
        setIsLoading(false);
        notify(
          error?.message || translate("ra.auth.sign_in_error"),
          { type: "error" }
        );
        setIsFormInvalid(true);
      });
  };

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center min-h-screen bg-gradient-to-r from-pink-50 via-white to-blue-50">
      {/* Bagian Kiri */}
      <div className="flex flex-col items-start space-y-4 lg:w-1/2 px-6 md:px-20 lg:px-28">
        <div className="text-lg text-gray-600">
          <span>Selamat datang!</span>
        </div>
        <h1 className="text-2xl font-bold text-gray-800 md:text-4xl">Badan Penyelenggara Jaminan Produk Halal (BPJPH)</h1>
      </div>

      {/* Bagian Kotak Form */}
      <div className="w-full lg:w-1/2 flex justify-center px-6 py-12 lg:py-20">
        <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8 space-y-6">
          {/* Heading */}
          <h2 className="text-gray-600 font-bold text-2xl">Selamat Datang</h2>
          <p className="text-sm font-thin text-gray-500 mb-8">
            Gunakan nomor telepon dan kata sandi yang sudah terdaftar
          </p>

          {/* Pesan Error Global */}
          {isFormInvalid && (
            <div
              className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg"
              role="alert"
            >
              Login gagal. Periksa kembali data Anda.
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Input No HP */}
            <div className="relative">
              <PhoneIcon className="absolute w-5 h-5 text-gray-400 left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                id="phone"
                {...register("phone", { required: "No HP tidak boleh kosong" })}
                className={`pl-10 pr-4 py-3 w-full border ${
                  errors.phone ? "border-red-500" : "border-gray-300"
                } rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500`}
                placeholder="No HP"
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
              )}
            </div>

            {/* Input Kata Sandi */}
            <div className="relative">
              <KeyIcon className="absolute w-5 h-5 text-gray-400 left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="password"
                id="password"
                {...register("password", {
                  required: "Kata sandi tidak boleh kosong",
                })}
                className={`pl-10 pr-4 py-3 w-full border ${
                  errors.password ? "border-red-500" : "border-gray-300"
                } rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500`}
                placeholder="Kata Sandi"
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
              )}
            </div>

            {/* Tombol Masuk */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full flex items-center justify-center gap-2 px-4 py-3 text-white ${
                isLoading ? "bg-gray-400" : "bg-purple-600 hover:bg-purple-700"
              } rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-purple-500 font-semibold`}
            >
              {isLoading && (
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  ></path>
                </svg>
              )}
              {!isLoading && <LoginCurve className="w-5 h-5" />}
              Masuk
            </button>
          </form>

          {/* Link Tambahan */}
          <div className="font-semibold text-xs hover:text-blue-500">
            <a href="#" className="hover:underline">
              Lupa kata sandi?
            </a>
          </div>

          <hr className="my-5" />

          {/* Link Daftar */}
          <Link
            to="/register"
            className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-100 text-gray-600 font-semibold text-sm"
          >
            Daftar
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
