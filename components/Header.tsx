import Link from "next/link";

export default function Header() {
  return (
    <header className="flex justify-between items-center w-full mt-5 border-b-2 pb-7 sm:px-4 px-2 border-gray-200">
      <Link href="/" className="flex space-x-3 items-center">
        <h1 className="sm:text-3xl text-2xl font-bold tracking-tight">
          AI Roaster 🔥
        </h1>
      </Link>
    </header>
  );
}
