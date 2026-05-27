"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { account } from "@/lib/appwrite";
import { useRouter } from "next/navigation";

const loginSchema = z.object({
  email: z.string().email("Email tidak valid"),
  password: z.string().min(6, "Password minimal 6 karakter"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
    });

    async function onSubmit(data: LoginFormData) {
    try {
        await account.createEmailPasswordSession(
        data.email,
        data.password
        );

        alert("Login success!");

        router.push("/dashboard");
    } catch (error) {
        console.error(error);
        alert("Login failed!");
    }
}

  return (
    <div className="w-full max-w-md rounded-3xl border bg-white p-8 shadow-sm">
      <h1 className="mb-2 text-3xl font-bold">Welcome Back</h1>

      <p className="mb-8 text-gray-500">Login to your fintech account.</p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <label className="mb-2 block text-sm font-medium">Email</label>

          <input
            type="email"
            placeholder="example@email.com"
            {...register("email")}
            className="w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-black"
          />

          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">Password</label>

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

        <button
          type="submit"
          className="w-full rounded-xl bg-black py-3 font-semibold text-white hover:bg-gray-800"
        >
          Login
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-gray-500">
        Don’t have an account?{" "}
        <Link href="/register" className="font-semibold text-black">
          Register
        </Link>
      </p>
    </div>
  );
}