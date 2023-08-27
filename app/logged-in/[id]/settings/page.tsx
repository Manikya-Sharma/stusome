"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";

import Tile from "@/app/components/Settings/Tile";

type Params = {
  params: { id: string };
};

export default function LoggedIn({ params }: Params) {
  const router = useRouter();
  return (
    <main className="px-4">
      <div className="mt-5 mb-7">
        <h1 className="text-6xl text-center font-merri tracking-tighter">
          Settings
        </h1>
      </div>

      <div className="text-lg">
        <div className="sm:mx-auto sm:grid sm:grid-cols-2 sm:grid-rows-2 gap-x-4">
          <div>
            <Link href={`/logged-in/${params.id}/settings/account`}>
              <Tile description="Account" danger={false} warning={false} />
            </Link>
          </div>
          <div>
            <Link href={`/logged-in/${params.id}/settings/app`}>
              <Tile description="App Settings" danger={false} warning={false} />
            </Link>
          </div>
          <div>
            <Link href={`/logged-in/${params.id}/settings/privacy`}>
              <Tile description="Privacy" danger={false} warning={false} />
            </Link>
          </div>
        </div>
        <div
          onClick={() => {
            localStorage.clear();
            router.push("/");
          }}
        >
          <Tile description="Logout" danger={true} warning={false} />
        </div>
      </div>
    </main>
  );
}
