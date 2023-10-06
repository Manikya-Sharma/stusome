import { useSession } from "next-auth/react";
import { useEffect, useRef } from "react";

export default function Welcome() {
  const { data: session } = useSession();
  const syncedData = useRef<string | null>(null);
  useEffect(() => {
    syncedData.current = localStorage.getItem("account");
  }, []);
  return (
    <section>
      <h1 className="text-xl sm:pb-4 sm:text-3xl">
        Hi,{" "}
        {syncedData && syncedData.current
          ? JSON.parse(syncedData.current).name.split(" ")[0]
          : session?.user?.name?.split(" ")[0]}
      </h1>
    </section>
  );
}
