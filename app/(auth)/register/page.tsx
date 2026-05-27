"use client";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { account, ID } from "@/lib/appwrite";

const registerSchema = z
  .object({
    fullName: z.string().min(3, "Nama minimal 3 karakter"),

    email: z.string().email("Email tidak valid"),

    password: z.string().min(6, "Password minimal 6 karakter"),

    confirmPassword: z
      .string()
      .min(6, "Konfirmasi password minimal 6 karakter"),
  })

  .refine((data) => data.password === data.confirmPassword, {
    message: "Password tidak sama",
    path: ["confirmPassword"],
  });

type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const {
    register,

    handleSubmit,

    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  async function onSubmit(data: RegisterFormData) {
    try {
        await account.create(
        ID.unique(),
        data.email,
        data.password,
        data.fullName
        );

        alert("Register success!");

        console.log(data);

    } catch (error) {
        console.error(error);

        alert("Register failed!");
    }
  }

  return (
    <div className="w-full max-w-md rounded-3xl border bg-white p-8 shadow-sm">
      <h1 className="mb-2 text-3xl font-bold">
        Create Account
      </h1>

      <p className="mb-8 text-gray-500">
        Register your fintech account.
      </p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5"
      >
        <div>
          <label className="mb-2 block text-sm font-medium">
            Full Name
          </label>

          <input
            type="text"
            placeholder="Your full name"
            {...register("fullName")}
            className="w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-black"
          />

          {errors.fullName && (
            <p className="mt-1 text-sm text-red-600">
              {errors.fullName.message}
            </p>
          )}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Email
          </label>

          <input
            type="email"
            placeholder="example@email.com"
            {...register("email")}
            className="w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-black"
          />

          {errors.email && (
            <p className="mt-1 text-sm text-red-600">
              {errors.email.message}
            </p>
          )}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Password
          </label>

          <input
            type="password"
            placeholder="••••••••"
            {...register("password")}
            className="w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-black"
          />

          {errors.password && (
            <p className="mt-1 text-sm text-red-600">
              {errors.password.message}
            </p>
          )}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Confirm Password
          </label>

          <input
            type="password"
            placeholder="••••••••"
            {...register("confirmPassword")}
            className="w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-black"
          />

          {errors.confirmPassword && (
            <p className="mt-1 text-sm text-red-600">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full rounded-xl bg-black py-3 font-semibold text-white hover:bg-gray-800"
        >
          Register
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-gray-500">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-semibold text-black"
        >
          Login
        </Link>
      </p>
    </div>
  );
}