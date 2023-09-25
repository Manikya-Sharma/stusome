"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useRef } from "react";

export default function ProfilePic() {
  const stored_account = useRef<string | null>(null);
  useEffect(() => {
    const account = localStorage.getItem("account");
    if (account) {
      stored_account.current = account;
    }
  }, []);
  const { data: session } = useSession();
  return (
    <div>
      {stored_account &&
      stored_account.current &&
      !JSON.parse(stored_account.current).image_third_party ? (
        <Image
          src={`data:image/png;base64,${
            JSON.parse(stored_account.current).image
          }`}
          referrerPolicy="no-referrer"
          alt=""
          width={260}
          height={260}
        />
      ) : (
        session &&
        session.user &&
        session.user.image && (
          <Image
            src={session?.user?.image}
            referrerPolicy="no-referrer"
            alt=""
            width={260}
            height={260}
          />
        )
      )}
    </div>
  );
}
