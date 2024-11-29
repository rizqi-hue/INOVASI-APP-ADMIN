import { FC } from "react";
import { useForm } from "react-hook-form";
import { UserIcon, KeyIcon, IdentificationIcon, EnvelopeIcon, PhoneIcon } from "@heroicons/react/24/outline";
import { LoginCurve } from "iconsax-react";
import { Link } from "react-router-dom";

type RegisterForm = {
  phone: string;
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const LoginPage: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>();

  const onSubmit = (data: RegisterForm) => {
    console.log("Registration Data:", data);
  };

  return (
    <div
      className="flex flex-col lg:flex-row items-center justify-center min-h-screen bg-gradient-to-r from-pink-50 via-white to-blue-50"
      role="alert"
    >
      {/* Bagian Kiri */}
      <div className="flex flex-col items-start space-y-4 lg:w-1/2 px-6 md:px-20 lg:px-28">
        <div className="text-lg text-gray-600">
          <span>Selamat Datang!</span>
        </div>
        <h1 className="text-3xl font-bold text-gray-800 md:text-4xl">Badan Penyelenggara Jaminan Produk Halal (BPJPH)</h1>
      </div>

      {/* Bagian Kotak Form */}
      <div className="w-full lg:w-1/2 flex justify-center px-6 py-12 lg:py-20">
        <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8 space-y-6">
          {/* Heading */}
          <h2 className="text-gray-600 font-bold text-2xl">Formulir Pendaftaran</h2>
          <p className="text-sm font-thin text-gray-500 mb-8">
            Silakan isi data lengkap Anda untuk mendaftar.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Input Nomor Telepon */}
            <div className="relative">
              <PhoneIcon className="absolute w-5 h-5 text-gray-400 left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                id="phone"
                {...register("phone", { required: "Nomor telepon tidak boleh kosong" })}
                className={`pl-10 pr-4 py-3 w-full border ${
                  errors.phone ? "border-red-500" : "border-gray-300"
                } rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500`}
                placeholder="Nomor Telepon"
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
              )}
            </div>

            {/* Input Nama */}
            <div className="relative">
              <UserIcon className="absolute w-5 h-5 text-gray-400 left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                id="name"
                {...register("name", { required: "Nama tidak boleh kosong" })}
                className={`pl-10 pr-4 py-3 w-full border ${
                  errors.name ? "border-red-500" : "border-gray-300"
                } rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500`}
                placeholder="Nama Lengkap"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
              )}
            </div>

            {/* Input Email */}
            <div className="relative">
              <EnvelopeIcon className="absolute w-5 h-5 text-gray-400 left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="email"
                id="email"
                {...register("email", { required: "Email tidak boleh kosong" })}
                className={`pl-10 pr-4 py-3 w-full border ${
                  errors.email ? "border-red-500" : "border-gray-300"
                } rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500`}
                placeholder="Email"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>

            {/* Input Password */}
            <div className="relative">
              <KeyIcon className="absolute w-5 h-5 text-gray-400 left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="password"
                id="password"
                {...register("password", { required: "Kata sandi tidak boleh kosong" })}
                className={`pl-10 pr-4 py-3 w-full border ${
                  errors.password ? "border-red-500" : "border-gray-300"
                } rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500`}
                placeholder="Kata Sandi"
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
              )}
            </div>

            {/* Input Konfirmasi Password */}
            <div className="relative">
              <KeyIcon className="absolute w-5 h-5 text-gray-400 left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="password"
                id="confirmPassword"
                {...register("confirmPassword", {
                  required: "Konfirmasi kata sandi tidak boleh kosong",
                })}
                className={`pl-10 pr-4 py-3 w-full border ${
                  errors.confirmPassword ? "border-red-500" : "border-gray-300"
                } rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500`}
                placeholder="Konfirmasi Kata Sandi"
              />
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>
              )}
            </div>

            {/* Tombol Daftar */}
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 px-4 py-3 text-white bg-purple-600 hover:bg-purple-700 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-purple-500 font-semibold"
            >
              <LoginCurve className="w-5 h-5" />
              Daftar
            </button>
          </form>

          <hr className="my-5" />

          {/* Link Tambahan */}
          <div className="font-semibold text-xs hover:text-blue-500">
            <Link to="/login" className="hover:underline">
              Sudah punya akun? Masuk
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;