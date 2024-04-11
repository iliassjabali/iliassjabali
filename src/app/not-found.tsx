import Link from "next/link";
export default function NotFound() {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
        404 - Page Not Found
      </h1>
      <p className="mb-4">The page you are looking for does not exist.</p>
      <Link href="/" className="text-blue-500">
        Go back home
      </Link>
    </section>
  );
}
