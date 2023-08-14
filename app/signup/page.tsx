import Link from "next/link";
export default function Signup() {
  return (
    <main className="h-screen flex items-center gradient font-fancy">
      <Link
        href="/"
        className="absolute top-1 left-1 text-slate-200 text-lg hover:underline underline-offset-2"
      >
        Home
      </Link>
      <div className="w-fit mx-auto">
        <div className="max-w-[80%] gradient-sub w-fit mx-auto p-10 text-white rounded-lg">
          <h1 className="font-merri text-center text-5xl mb-10">Signup</h1>
          <form
            action=""
            className="grid grid-rows-2 grid-cols-2 items-center gap-2"
          >
            <label className="text-xl" htmlFor="email">
              Email
            </label>
            <input
              type="text"
              name="email"
              id="email"
              className="bg-fuchsia-200 text-fuchsia-800 font-semibold px-3 py-2 rounded-xl"
            />

            <label className="text-xl" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className="bg-fuchsia-200 text-fuchsia-800 font-semibold px-3 py-2 rounded-xl"
            />
          </form>
          <button
            type="submit"
            className="block w-fit mx-auto px-4 py-2 rounded-md mt-5 bg-gradient-to-br from-fuchsia-300 to-fuchsia-500 hover:from-fuchsia-100 hover:to-rose-300 hover:text-rose-900 transition-all duration-300"
          >
            Continue
          </button>
        </div>
        <p className="mt-10 text-center text-slate-100">
          Already a user?{" "}
          <Link
            href="/login"
            className="text-fuchsia-200 hover:underline underline-offset-2"
          >
            login
          </Link>
          !
        </p>
      </div>
    </main>
  );
}
