import { Link } from 'react-router-dom';

export default function PostCard({ post }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col">
      {/* Image Container */}
      <Link 
        to={`/post/${post.slug}`}
        className="relative overflow-hidden aspect-video"
      >
        <img
          src={post.image}
          alt={post.title}
          className="object-cover w-full h-full transform hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end">
          <span className="text-white p-4 font-medium">Read More</span>
        </div>
      </Link>

      {/* Content Container */}
      <div className="p-5 flex flex-col flex-grow">
        {/* Category Badge */}
        <div className="mb-3">
          <span className="px-3 py-1 text-xs font-medium bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300 rounded-full">
            {post.category}
          </span>
        </div>

        {/* Title */}
        <Link to={`/post/${post.slug}`}>
          <h2 className="text-xl font-bold mb-2 text-gray-800 dark:text-white hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300 line-clamp-2">
            {post.title}
          </h2>
        </Link>

        {/* Preview Text */}
        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
          {post.content.replace(/<[^>]*>/g, '').substring(0, 100)}...
        </p>

        {/* Footer */}
        <div className="mt-auto flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
          <span>
            {new Date(post.createdAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric'
            })}
          </span>
          <span>
            {Math.ceil(post.content.length / 1000)} min read
          </span>
        </div>
      </div>
    </div>
  );
}
