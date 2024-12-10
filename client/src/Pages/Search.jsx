import { Button, Label, Select, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PostCard from "../Components/PostCard";

export default function Search() {
  const [sidebarData, setSidebarData] = useState({
    searchTerm: "",
    sort: "desc",
    category: "uncategorized",
  });

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showMore, setShowMore] = useState(false);

  const location = useLocation();

  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    const sortFromUrl = urlParams.get("sort");
    const categoryFromUrl = urlParams.get("category");
    if (searchTermFromUrl || sortFromUrl || categoryFromUrl) {
      setSidebarData({
        ...sidebarData,
        searchTerm: searchTermFromUrl,
        sort: sortFromUrl,
        category: categoryFromUrl,
      });
    }

    const fetchPosts = async () => {
      setLoading(true);
      const searchQuery = urlParams.toString();
      const res = await fetch(`/api/post/getposts?${searchQuery}`);
      if (!res.ok) {
        setLoading(false);
        return;
      }
      if (res.ok) {
        const data = await res.json();
        setPosts(data.posts);
        setLoading(false);
        if (data.posts.length === 9) {
          setShowMore(true);
        } else {
          setShowMore(false);
        }
      }
    };
    fetchPosts();
  }, [location.search]);

  const handleChange = (e) => {
    if (e.target.id === "searchTerm") {
      setSidebarData({ ...sidebarData, searchTerm: e.target.value });
    }
    if (e.target.id === "sort") {
      const order = e.target.value || "desc";
      setSidebarData({ ...sidebarData, sort: order });
    }
    if (e.target.id === "category") {
      const category = e.target.value || "uncategorized";
      setSidebarData({ ...sidebarData, category });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("searchTerm", sidebarData.searchTerm);
    urlParams.set("sort", sidebarData.sort);
    urlParams.set("category", sidebarData.category);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  const handleShowMore = async () => {
    const numberOfPosts = posts.length;
    const startIndex = numberOfPosts;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("startIndex", startIndex);
    const searchQuery = urlParams.toString();
    const res = await fetch(`/api/post/getposts?${searchQuery}`);
    if (!res.ok) {
      return;
    }
    if (res.ok) {
      const data = await res.json();
      setPosts([...posts, ...data.posts]);
      if (data.posts.length === 9) {
        setShowMore(true);
      } else {
        setShowMore(false);
      }
    }
  };

  return (
    <div className="flex flex-col md:flex-row mt-[73px] min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Filter Sidebar */}
      <div className="md:w-72 p-6 bg-white dark:bg-gray-800 shadow-lg md:min-h-screen">
        <div className="sticky top-[85px]">
          <h2 className="text-xl font-bold mb-6 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
            Filter Posts
          </h2>
          <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label
                value="Search Term"
                className="text-gray-700 dark:text-gray-300"
              />
              <TextInput
                placeholder="Search posts..."
                id="searchTerm"
                type="text"
                value={sidebarData.searchTerm}
                onChange={handleChange}
                className="w-full rounded-lg"
              />
            </div>

            <div className="space-y-2">
              <Label
                value="Sort By"
                className="text-gray-700 dark:text-gray-300"
              />
              <Select
                onChange={handleChange}
                value={sidebarData.sort}
                id="sort"
                className="w-full rounded-lg"
              >
                <option value="desc">Latest</option>
                <option value="asc">Oldest</option>
              </Select>
            </div>

            <div className="space-y-2">
              <Label
                value="Category"
                className="text-gray-700 dark:text-gray-300"
              />
              <Select
                onChange={handleChange}
                value={sidebarData.category}
                id="category"
                className="w-full rounded-lg"
              >
                <option value="uncategorized">All Categories</option>
                <option value="reactjs">React.js</option>
                <option value="nextjs">Next.js</option>
                <option value="javascript">JavaScript</option>
              </Select>
            </div>

            <Button
              type="submit"
              gradientDuoTone="purpleToPink"
              className="w-full rounded-lg transform hover:scale-[1.02] transition-transform"
            >
              Apply Filters
            </Button>
          </form>
        </div>
      </div>

      {/* Results Section */}
      <div className="flex-1 p-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
            Search Results
          </h1>

          {/* Results Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {!loading && posts.length === 0 && (
              <div className="col-span-full text-center py-10">
                <p className="text-xl text-gray-500 dark:text-gray-400">
                  No posts found.
                </p>
              </div>
            )}

            {loading && (
              <div className="col-span-full text-center py-10">
                <p className="text-xl text-gray-500 dark:text-gray-400">
                  Loading...
                </p>
              </div>
            )}

            {!loading &&
              posts &&
              posts.map((post) => <PostCard key={post._id} post={post} />)}
          </div>

          {/* Show More Button */}
          {showMore && (
            <button
              onClick={handleShowMore}
              className="w-full mt-8 py-3 text-teal-500 dark:text-teal-400 hover:text-teal-600 dark:hover:text-teal-300 text-lg font-medium transition-colors duration-300"
            >
              Show More Posts
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
