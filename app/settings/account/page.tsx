import Link from "next/link";
import Tile from "@/app/components/Settings/Tile";
import SyncTile from "@/app/components/Settings/SyncTile";

export default function AccountSettings() {
  return (
    <div className="pt-10">
      <Link href={`/settings/account/changePicture`}>
        <Tile
          description="Change Profile Picture"
          type="normal"
          logo="addPhoto"
        />
      </Link>
      <Link href={`/settings/account/changeUsername`}>
        <Tile description="Change Display Name" type="normal" logo="rename" />
      </Link>
      {/* <Link href={`/settings/account/changePassword`}>
        <Tile description="Change Password" type="normal" logo="password" />
      </Link> */}
      <SyncTile />
    </div>
  );
}
