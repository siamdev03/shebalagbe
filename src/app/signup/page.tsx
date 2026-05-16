"use client";

import Link from "next/link";

import { useState } from "react";

import { useRouter } from "next/navigation";

import { supabase } from "@/lib/supabase";

import toast from "react-hot-toast";

export default function SignupForm() {

  const router = useRouter();

  const [loading, setLoading] =
    useState(false);

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  async function handleSignup(
    e: React.FormEvent
  ) {

    e.preventDefault();

    setLoading(true);

    const { error } =
      await supabase.auth.signUp({

        email,
        password,

        options: {

          emailRedirectTo:
            undefined,

        },

      });

    if (error) {

      console.log(error);

      toast.error(
        "সাইনআপ করা যাচ্ছে না ❌"
      );

      setLoading(false);

      return;

    }

    toast.success(
      "অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে ✅"
    );

    setTimeout(() => {

      router.push("/login");

    }, 1500);

    setLoading(false);

  }

  return (

    <main className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-slate-950 via-blue-950 to-cyan-950 px-6 py-10 overflow-hidden">

      {/* GLOW EFFECT */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-cyan-500/10 blur-3xl rounded-full" />

      <div className="relative z-10 w-full flex items-center justify-center">

        <div className="w-full max-w-md mx-auto">

          <form
            onSubmit={handleSignup}
            className="bg-white/10 backdrop-blur-2xl border border-white/10 rounded-[32px] p-8 shadow-2xl"
          >

            {/* TITLE */}
            <div className="text-center mb-10">

              <h1 className="text-5xl font-extrabold text-white leading-tight">

                নতুন <br />

                অ্যাকাউন্ট

              </h1>

              <p className="text-slate-300 mt-4 text-lg">

                সহজেই সার্ভিস বুকিং শুরু করুন

              </p>

            </div>

            {/* EMAIL */}
            <div className="mb-5">

              <label className="block text-white mb-2 font-medium">

                ইমেইল এড্রেস

              </label>

              <input
                type="email"
                required
                placeholder="আপনার ইমেইল লিখুন"
                value={email}
                onChange={(e) =>
                  setEmail(
                    e.target.value
                  )
                }
                className="w-full h-14 px-5 rounded-2xl bg-white/10 border border-white/10 text-white placeholder:text-slate-400 outline-none focus:border-cyan-400 transition-all"
              />

            </div>

            {/* PASSWORD */}
            <div className="mb-6">

              <label className="block text-white mb-2 font-medium">

                পাসওয়ার্ড

              </label>

              <input
                type="password"
                required
                placeholder="আপনার পাসওয়ার্ড লিখুন"
                value={password}
                onChange={(e) =>
                  setPassword(
                    e.target.value
                  )
                }
                className="w-full h-14 px-5 rounded-2xl bg-white/10 border border-white/10 text-white placeholder:text-slate-400 outline-none focus:border-cyan-400 transition-all"
              />

            </div>

            {/* BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="w-full h-14 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold text-lg shadow-xl hover:scale-[1.02] transition-all duration-300"
            >

              {loading
                ? "অ্যাকাউন্ট তৈরি হচ্ছে..."
                : "সাইন আপ করুন"}

            </button>

            {/* LOGIN LINK */}
            <p className="text-center text-slate-300 mt-6">

              আগে থেকেই অ্যাকাউন্ট আছে?{" "}

              <Link
                href="/login"
                className="text-cyan-400 font-semibold hover:text-cyan-300 transition-all"
              >

                লগইন করুন

              </Link>

            </p>

          </form>

        </div>

      </div>

    </main>

  );

}