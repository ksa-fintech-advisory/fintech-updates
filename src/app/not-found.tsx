import Link from 'next/link';

export default function RootNotFound() {
  return (
    <html lang="en">
      <body className="min-h-screen bg-zinc-950 text-zinc-100 antialiased">
        <main className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-emerald-400">
            404
          </p>
          <h1 className="mb-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Page not found
          </h1>
          <p className="mb-8 max-w-md text-zinc-400">
            The page you are looking for does not exist or has been moved.
          </p>
          <Link
            href="/en"
            className="inline-flex h-11 items-center rounded-full bg-white px-6 text-sm font-bold text-zinc-950 transition-colors hover:bg-zinc-200"
          >
            Return home
          </Link>
        </main>
      </body>
    </html>
  );
}
