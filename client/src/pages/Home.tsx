import { Link } from "react-router";
import { Search, ChevronRight, BookOpen } from "lucide-react";

export const Home = () => {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2">
            <BookOpen className="h-6 w-6" />
            <span className="text-xl font-bold">Blogify</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link to="/" className="text-sm font-medium hover:text-primary">Home</Link>
            <Link to="#" className="text-sm font-medium text-gray-500 hover:text-primary">Explore</Link>
            <Link to="#" className="text-sm font-medium text-gray-500 hover:text-primary">About</Link>
            <Link to="#" className="text-sm font-medium text-gray-500 hover:text-primary">Contact</Link>
          </nav>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
              <input type="search" placeholder="Search..." className="w-[200px] pl-8 border rounded-md py-1 px-2" />
            </div>
            <Link to="/login" className="border px-4 py-2 rounded-md text-sm">Log in</Link>
            <Link to="/signup" className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm">Sign up</Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex justify-center items-center h-full w-full bg-gray-100">
        <section className="w-full">
          <div className="container px-4 md:px-6 text-center">
            <h1 className="text-4xl font-bold">Share Your Stories with the World</h1>
            <p className="mt-2 text-gray-600">Join our community of writers and readers today.</p>
            <div className="mt-4 flex justify-center gap-4">
              <Link to="/signup" className="bg-blue-600 text-white px-6 py-3 rounded-md">Get Started</Link>
              <Link to="/feed" className="border px-6 py-3 rounded-md flex items-center">
                Explore Blogs <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};