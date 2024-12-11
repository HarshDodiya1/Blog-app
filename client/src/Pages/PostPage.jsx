import { Button, Spinner } from "flowbite-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import CallToAction from "../Components/CallToAction";
import CommentSection from "../Components/CommentSection";
import PostCard from "../Components/PostCard";

export function PostPage() {
  const { theme } = useSelector((state) => state.theme);
  const { postSlug } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [post, setPost] = useState(null);
  const [recentPosts, setRecentPosts] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/post/getposts?slug=${postSlug}`);
        const data = await res.json();
        if (!res.ok) {
          setError(true);
          setLoading(false);
          return;
        }
        if (res.ok) {
          setPost(data.posts[0]);
          setLoading(false);
          setError(false);
        }
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchPost();
  }, [postSlug]);

  useEffect(() => {
    const fetchRecentPosts = async () => {
      try {
        const res = await fetch(`/api/post/getposts?limit=3`);
        const data = await res.json();
        if (res.ok) {
          setRecentPosts(data.posts);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchRecentPosts();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner size="xl" />
      </div>
    );

  return (
    <main
      className={`mt-[70px] min-h-screen ${theme === "dark" ? "bg-gray-900 text-gray-200" : "bg-gray-50 text-gray-900"}`}
    >
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="flex flex-col items-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text leading-tight">
            {post && post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 mb-6 justify-center">
            <Link to={`/search?category=${post && post.category}`}>
              <Button
                color="gray"
                pill
                size="xs"
                className="transform hover:scale-105 transition-all duration-300"
              >
                {post && post.category}
              </Button>
            </Link>
            <span className="text-sm font-medium">
              {post &&
                new Date(post.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
            </span>
            <span className="text-sm italic text-gray-600 dark:text-gray-400">
              {post && (post.content.length / 1000).toFixed(0)} mins read
            </span>
          </div>
        </div>

        {/* Featured Image */}
        <div className="rounded-xl overflow-hidden shadow-2xl mb-12 max-h-[600px] group">
          <img
            src={post && post.image}
            alt={post && post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* Content Section */}
        <div
          className={`max-w-4xl mx-auto ${theme === "dark" ? "text-gray-300" : "text-gray-800"}`}
        >
          <div
            className="post-content prose prose-lg md:prose-xl dark:prose-invert prose-headings:font-bold prose-headings:text-purple-600 dark:prose-headings:text-purple-400 prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-img:rounded-xl prose-img:shadow-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: post && post.content }}
          />
        </div>

        {/* Call to Action */}
        <div className="my-16">
          <CallToAction />
        </div>

        {/* Comments Section */}
        <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <CommentSection postId={post._id} />
        </div>

        {/* Recent Posts Section */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-center mb-10 bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text">
            Recent Stories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentPosts &&
              recentPosts.map((post) => (
                <div
                  key={post._id}
                  className="transform hover:-translate-y-2 transition-transform duration-300"
                >
                  <PostCard post={post} />
                </div>
              ))}
          </div>
        </div>
      </div>
    </main>
  );
}
