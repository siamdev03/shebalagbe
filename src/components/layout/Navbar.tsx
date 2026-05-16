"use client";

import Link from "next/link";

import { useEffect, useState } from "react";

import { supabase } from "@/lib/supabase";

import toast from "react-hot-toast";

type UserType = {
  email?: string;
};

export default function Navbar() {

  const [user, setUser] =
    useState<UserType | null>(null);

  useEffect(() => {

    async function getUser() {

      const {
        data: { user },
      } = await supabase.auth.getUser();

      setUser(user);

    }

    getUser();

  }, []);

  async function handleLogout() {

    await supabase.auth.signOut();

    toast.success(
      "লগআউট সফল হয়েছে 👋"
    );

    window.location.reload();

  }

  return (

    <nav className="w-full fixed top-0 left-0 z-50 bg-slate-950/70 backdrop-blur-xl border-b border-white/10">

      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* LOGO */}
        <Link
          href="/"
          className="text-2xl font-extrabold text-white"
        >

          
        সেবা লাগবে



        </Link>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-4">

          {user ? (

            <div className="flex items-center gap-3">

              {/* PROFILE */}
              <div className="w-11 h-11 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white flex items-center justify-center font-bold text-lg">

                {user.email?.charAt(0).toUpperCase()}

              </div>

              {/* EMAIL */}
              <div className="hidden md:block">

                <p className="text-white text-sm font-semibold">

                  {user.email}

                </p>

                <p className="text-slate-400 text-xs">

                  লগইন করা আছে

                </p>

              </div>

              {/* LOGOUT */}
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-xl bg-red-500/20 text-red-300 hover:bg-red-500/30 transition-all"
              >

                লগআউট

              </button>

            </div>

          ) : (

            <Link
              href="/login"
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold"
            >

              লগইন

            </Link>

          )}

        </div>

      </div>

    </nav>

  );

}