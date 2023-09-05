import { LuUser, LuSettings2, LuLock, LuLogOut } from "react-icons/lu";
import {
  MdAddAPhoto,
  MdDriveFileRenameOutline,
  MdPassword,
} from "react-icons/md";

type Props = {
  description: string;
  type: "normal" | "danger" | "warning";
  logo?:
    | "user"
    | "settings"
    | "lock"
    | "logout"
    | "addPhoto"
    | "rename"
    | "password";
};

export default function Tile(props: Props) {
  return (
    <section
      className={
        "cursor-pointer flex justify-between font-[450] w-[90%] sm:w-full min-w-fit py-5 px-3 rounded-lg  my-3 mx-auto border transition-all duration-200 " +
        (props.type == "normal" &&
          " bg-slate-200 text-slate-700 hover:bg-slate-100 hover:text-black dark:bg-slate-700 dark:text-slate-100 dark:border-slate-700 dark:hover:bg-slate-600 dark:hover:text-slate-200 ") +
        (props.type == "warning" &&
          " bg-slate-200 border-orange-500 dark:bg-slate-700 ") +
        (props.type == "danger" &&
          " bg-slate-200 border-red-500 text-red-700 hover:bg-red-700 hover:text-white dark:bg-red-900 dark:text-red-200 dark:hover:bg-red-600 dark:hover:text-red-200 ")
      }
    >
      <div className="flex items-center justify-start gap-3">
        {props.logo == "user" && (
          <div className="">
            <LuUser />
          </div>
        )}
        {props.logo == "settings" && (
          <div className="">
            <LuSettings2 />
          </div>
        )}
        {props.logo == "lock" && (
          <div className="">
            <LuLock />
          </div>
        )}
        {props.logo == "logout" && (
          <div className="">
            <LuLogOut />
          </div>
        )}
        {props.logo == "addPhoto" && (
          <div className="">
            <MdAddAPhoto />
          </div>
        )}
        {props.logo == "rename" && (
          <div className="">
            <MdDriveFileRenameOutline />
          </div>
        )}
        {props.logo == "password" && (
          <div className="">
            <MdPassword />
          </div>
        )}
        <p>{props.description}</p>
      </div>
      <div>&gt;</div>
    </section>
  );
}
