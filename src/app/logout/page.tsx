"use client";

import { useEffect }
from "react";

import { useRouter }
from "next/navigation";

import { supabase }
from "@/lib/supabase";

export default function LogoutPage() {

  const router =
    useRouter();

  useEffect(() => {

    async function logout() {

      await supabase.auth.signOut();

      router.push("/login");

    }

    logout();

  }, [router]);

  return (

    <div className="min-h-screen flex items-center justify-center bg-[#020617] text-white text-3xl font-bold">

      Logging out...

    </div>

  );

}