export default function Login() {
  return (
    <main className="h-screen w-full flex items-center bg-[#00d9c0]">
      <div className="w-fit mx-auto">
        <div className="max-w-[80%] w-fit mx-auto p-10 bg-[#1466a0] text-white rounded-lg">
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
              className="bg-slate-200 text-slate-800 px-3 py-2 rounded-xl"
            />

            <label className="text-xl" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className="bg-slate-200 text-slate-800 px-3 py-2 rounded-xl"
            />
          </form>
        </div>
        <p className="mt-10 text-center text-slate-100">
          Already a user? signup!
        </p>
      </div>
    </main>
  );
}
