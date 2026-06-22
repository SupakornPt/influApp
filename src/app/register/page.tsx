import Link from "next/link";
import { GeistSans } from "geist/font/sans";

export default function RegisterPage() {
  return (
    <div
      className={`${GeistSans.className} relative flex min-h-screen w-full items-center justify-end px-6 py-6 md:px-12 lg:px-16`}
    >
      <Link
        href="/"
        className="absolute left-6 top-[calc(1.5rem+2cm)] inline-flex items-center gap-2 text-lg font-bold text-slate-900 md:left-12 lg:left-16"
      >
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-sm text-white">
          IA
        </span>
        InfluApp
      </Link>

      <blockquote className="absolute bottom-[calc(1.5rem+2cm)] left-6 hidden max-w-lg md:left-12 md:block lg:left-16">
        <p className="text-xl font-medium leading-relaxed text-slate-700 md:text-2xl">
          &ldquo;Launch faster, match smarter, and scale your partnerships with trusted creator insights.&rdquo;
        </p>
        <footer className="mt-4 flex items-center gap-3">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 text-sm font-semibold text-indigo-700">
            AM
          </span>
          <div>
            <p className="font-semibold text-slate-900">Alya Morgan</p>
            <p className="text-sm text-slate-500">Partnership Lead, Nexa Commerce</p>
          </div>
        </footer>
      </blockquote>

      <section className="min-h-[37.4rem] w-full max-w-xl overflow-hidden rounded-3xl bg-white shadow-xl ring-1 ring-slate-200">
        <div className="flex min-h-[37.4rem] flex-col justify-center px-6 py-12 md:px-10 md:py-14">
          <div className="w-full">
            <h1 className="text-3xl font-bold text-slate-900">Create your account</h1>
            <p className="mt-1.5 text-sm text-slate-600">Join InfluApp and start connecting with the right creators.</p>

            <button
              type="button"
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
                <path fill="#EA4335" d="M12 10.2v3.9h5.5c-.2 1.2-.9 2.2-1.9 2.9l3.1 2.4c1.8-1.7 2.9-4.1 2.9-6.9 0-.7-.1-1.5-.2-2.2H12z" />
                <path fill="#34A853" d="M12 22c2.6 0 4.8-.9 6.4-2.5l-3.1-2.4c-.9.6-2 .9-3.3.9-2.5 0-4.6-1.7-5.4-4H3.4v2.5A10 10 0 0 0 12 22z" />
                <path fill="#4A90E2" d="M6.6 14c-.2-.6-.3-1.3-.3-2s.1-1.4.3-2V7.5H3.4A10 10 0 0 0 2.4 12c0 1.6.4 3.1 1 4.5L6.6 14z" />
                <path fill="#FBBC05" d="M12 6c1.4 0 2.6.5 3.5 1.4l2.6-2.6A10 10 0 0 0 3.4 7.5L6.6 10c.8-2.3 2.9-4 5.4-4z" />
              </svg>
              Google
            </button>

            <div className="my-6 flex items-center gap-3">
              <span className="h-px flex-1 bg-slate-200" />
              <span className="text-xs font-medium text-slate-400">Or continue with email</span>
              <span className="h-px flex-1 bg-slate-200" />
            </div>

            <form className="space-y-4">
              <label className="block space-y-1.5">
                <span className="text-sm font-medium text-slate-700">Full name</span>
                <input
                  type="text"
                  placeholder="Your full name"
                  className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none ring-indigo-500 transition focus:ring-2"
                />
              </label>

              <label className="block space-y-1.5">
                <span className="text-sm font-medium text-slate-700">Email Address</span>
                <input
                  type="email"
                  placeholder="name@company.com"
                  className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none ring-indigo-500 transition focus:ring-2"
                />
              </label>

              <label className="block space-y-1.5">
                <span className="text-sm font-medium text-slate-700">Password</span>
                <input
                  type="password"
                  placeholder="At least 8 characters"
                  className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none ring-indigo-500 transition focus:ring-2"
                />
              </label>

              <label className="inline-flex items-start gap-2 text-sm text-slate-600">
                <input type="checkbox" className="mt-0.5 h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-600" />
                I agree to the Terms of Service and Privacy Policy.
              </label>

              <button
                type="button"
                className="w-full rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-200 transition hover:bg-indigo-700"
              >
                Create Account
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-slate-600">
              Already have an account?{" "}
              <Link href="/login" className="font-semibold text-indigo-600 hover:underline">
                Log in
              </Link>
            </p>

            <div className="mt-10 flex justify-center gap-5 text-xs text-slate-400">
              <Link href="#" className="hover:text-slate-600">
                Privacy Policy
              </Link>
              <Link href="#" className="hover:text-slate-600">
                Terms of Service
              </Link>
              <Link href="#" className="hover:text-slate-600">
                Contact Support
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
