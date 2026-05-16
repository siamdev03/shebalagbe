
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function AdminGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const checkAdmin = async () => {
      console.log("ADMIN GUARD RUNNING");

      const {
        data: { user },
      } = await supabase.auth.getUser();

      /* NOT LOGGED IN */
      if (!user) {
        router.replace("/login");
        return;
      }

      console.log("USER ID:", user.id);
      console.log("USER EMAIL:", user.email);

      /* FETCH ALL PROFILES */
      const { data, error } = await supabase
        .from("profiles")
        .select("*");

      console.log("ALL PROFILES:", data);
      console.log("ERROR:", error);

      /* FIND CURRENT USER */
      const adminUser = data?.find(
        (item) => item.id === user.id
      );

      console.log("MATCHED USER:", adminUser);

      /* NOT ADMIN */
      if (
        error ||
        !adminUser ||
        adminUser.role !== "admin"
      ) {
        router.replace("/unauthorized");
        return;
      }

      /* ADMIN OK */
      setAuthorized(true);
      setLoading(false);
    };

    checkAdmin();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white text-3xl">
        Loading...
      </div>
    );
  }

  if (!authorized) {
    return null;
  }

  return <>{children}</>;
}

