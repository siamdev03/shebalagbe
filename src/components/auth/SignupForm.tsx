"use client";

import { useState } from "react";

import { supabase } from "@/lib/supabase";

import toast from "react-hot-toast";

export default function SignupForm() {

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  async function handleSignup(
    e: React.FormEvent
  ) {

    e.preventDefault();

    const { error } =
      await supabase.auth.signUp({

        email,

        password,

      });

    if (error) {

      toast.error(error.message);
      return;

    }

    toast.success(
      "Account created ✅"
    );

  }

  return (

    <form
      onSubmit={handleSignup}
      className="space-y-4"
    >

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) =>
          setEmail(e.target.value)
        }
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) =>
          setPassword(e.target.value)
        }
      />

      <button type="submit">

        Signup

      </button>

    </form>

  );

}