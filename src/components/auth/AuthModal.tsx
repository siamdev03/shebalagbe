"use client";

import { useState } from "react";

import LoginForm from "./LoginForm";

import SignupForm from "./SignupForm";

interface Props {

  open: boolean;

  onClose: () => void;

}

export default function AuthModal({

  open,
  onClose,

}: Props) {

  const [mode, setMode] =
    useState<"login" | "signup">(
      "login"
    );

  if (!open) return null;

  return (

    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">

      {/* MODAL */}
      <div className="relative w-full max-w-md rounded-[32px] border border-white/10 bg-gradient-to-br from-slate-900 via-blue-950 to-cyan-950 p-8 shadow-2xl overflow-hidden">

        {/* GLOW */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[200px] bg-cyan-500/10 blur-3xl rounded-full" />

        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 text-white hover:bg-red-500 transition-all"
        >

          ✕

        </button>

        {/* HEADER */}
        <div className="relative z-10 text-center mb-8">

          <div className="text-5xl mb-4">

            {mode === "login"
              ? "🔐"
              : "✨"}

          </div>

          <h2 className="text-4xl font-extrabold text-white">

            {mode === "login"
              ? "লগইন করুন"
              : "নতুন অ্যাকাউন্ট"}

          </h2>

          <p className="text-slate-300 mt-3">

            {mode === "login"
              ? "আপনার অ্যাকাউন্টে প্রবেশ করুন"
              : "সহজেই সার্ভিস বুকিং শুরু করুন"}

          </p>

        </div>

        {/* FORM */}
        <div className="relative z-10">

          {mode === "login" ? (

            <LoginForm />

          ) : (

            <SignupForm />

          )}

        </div>

        {/* TOGGLE */}
        <div className="relative z-10 mt-6 text-center text-slate-300">

          {mode === "login" ? (
            <>
              নতুন অ্যাকাউন্ট নেই?{" "}

              <button
                onClick={() =>
                  setMode(
                    "signup"
                  )
                }
                className="text-cyan-400 font-semibold hover:text-cyan-300 transition-all"
              >

                সাইন আপ করুন

              </button>
            </>
          ) : (
            <>
              আগে থেকেই অ্যাকাউন্ট আছে?{" "}

              <button
                onClick={() =>
                  setMode(
                    "login"
                  )
                }
                className="text-cyan-400 font-semibold hover:text-cyan-300 transition-all"
              >

                লগইন করুন

              </button>
            </>
          )}

        </div>

      </div>

    </div>

  );

}