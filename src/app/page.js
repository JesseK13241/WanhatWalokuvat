import Link from "next/link";

export const metadata = {
  title: "TODO title",
  description: "TODO description"
};

export default function HomePage() {
  return (
    <div>
      <h1 className="text-3xl">Aineopintojen projektityö</h1>
      <main></main>
      <footer>
        <Link href="https://github.com/JesseK13241/TIEA207-projekti/">
          View on GitHub
        </Link>
      </footer>
    </div>
  );
}
