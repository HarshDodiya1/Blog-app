import { Link } from "react-router-dom";
import CallToAction from "../Components/CallToAction";
import { useEffect, useState } from "react";
import PostCard from "../Components/PostCard";

export function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch("/api/post/getPosts");
      const data = await res.json();
      setPosts(data.posts);
    };
    fetchPosts();
  }, []);
  return (
    <div>
      <div className="relative bg-gradient-to-b from-purple-50 to-white dark:from-gray-900 dark:to-gray-800 py-24 sm:py-32">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center">
            {/* Main Heading with Gradient */}
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
              Welcome to Harsh's Blog
            </h1>

            {/* Subtitle with better typography */}
            <p className="text-gray-600 dark:text-gray-300 text-lg md:text-xl max-w-3xl mb-8 leading-relaxed">
              Here you'll find a variety of Blogs, Project Updates, Important
              Notes and Snippets that keeps you up to date about the information
              and trends.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/search"
                className="px-8 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-full font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-300"
              >
                Explore Posts
              </Link>
              <Link
                to="/about"
                className="px-8 py-3 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-full font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-300 border-2 border-purple-500"
              >
                Learn More
              </Link>
            </div>

            {/* Optional: Add decorative elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-50">
              <div className="absolute -top-1/4 -right-1/4 w-1/2 h-1/2 bg-gradient-to-br from-purple-200 to-transparent dark:from-purple-900 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-1/4 -left-1/4 w-1/2 h-1/2 bg-gradient-to-tr from-pink-200 to-transparent dark:from-pink-900 rounded-full blur-3xl"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="p-3 bg-amber-100 dark:bg-slate-700">
        <CallToAction />
      </div>

      <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 py-7">
        {posts && posts.length > 0 && (
          <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-semibold text-center">Recent Posts</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
            <Link
              to={"/search"}
              className="text-lg text-teal-500 hover:underline text-center"
            >
              View all posts
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
