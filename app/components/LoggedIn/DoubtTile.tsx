import Link from "next/link";

export default function DoubtTile({
  doubt,
  authorName,
}: {
  doubt: Doubt;
  authorName: string;
}) {
  return (
    <div>
      <Link
        href={`/doubts/${doubt.id}`}
        className="mx-3 flex h-[30vh] flex-col items-center justify-between rounded-md border border-rose-300 px-2 py-2 text-center transition-all duration-150 hover:bg-rose-300 hover:text-pink-800 dark:border-rose-300 dark:bg-zinc-700 dark:text-rose-100 dark:hover:bg-rose-200 dark:hover:text-rose-950"
      >
        <p>{doubt.title}</p>
        <div>
          <p>- {authorName}</p>
          <p>Answers: {doubt.answers.length}</p>
        </div>
      </Link>
    </div>
  );
}
