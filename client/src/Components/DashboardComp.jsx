import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  HiAnnotation,
  HiArrowNarrowUp,
  HiDocumentText,
  HiOutlineUserGroup,
  HiChartBar,
  HiClock,
} from "react-icons/hi";

export function DashboardComp() {
  const [users, setUsers] = useState([]);
  const [comments, setComments] = useState([]);
  const [posts, setPosts] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPosts, setTotalPosts] = useState(0);
  const [totalComments, setTotalComments] = useState(0);
  const [lastMonthUsers, setLastMonthUsers] = useState(0);
  const [lastMonthPosts, setLastMonthPosts] = useState(0);
  const [lastMonthComments, setLastMonthComments] = useState(0);
  const { currentUser } = useSelector((state) => state.user);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("/api/user/getusers?limit=5");
        const data = await res.json();
        if (res.ok) {
          setUsers(data.users);
          setTotalUsers(data.totalUsers);
          setLastMonthUsers(data.lastMonthUsers);
        }
      } catch (error) {}
    };
    const fetchPosts = async () => {
      try {
        const res = await fetch("/api/post/getposts?limit=5");
        const data = await res.json();
        if (res.ok) {
          setPosts(data.posts);
          setTotalPosts(data.totalPosts);
          setLastMonthPosts(data.lastMonthPosts);
        }
      } catch (error) {}
    };
    const fetchComments = async () => {
      try {
        const res = await fetch("/api/comment/getcomments?limit=5");
        const data = await res.json();
        if (res.ok) {
          setComments(data.comments);
          setTotalComments(data.totalComments);
          setLastMonthComments(data.lastMonthComments);
        }
      } catch (error) {}
    };
    if (currentUser.user.isAdmin) {
      fetchUsers();
      fetchPosts();
      fetchComments();
    }
  }, [currentUser]);
  const StatCard = ({ title, total, lastMonth, icon: Icon, color }) => (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-transform hover:scale-105">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white mt-1">
            {total}
          </h3>
        </div>
        <div className={`p-3 rounded-full ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
      <div className="flex items-center text-sm">
        <HiArrowNarrowUp className="text-green-500 mr-1" />
        <span className="text-green-500 font-medium">{lastMonth}</span>
        <span className="text-gray-500 dark:text-gray-400 ml-2">
          Last month
        </span>
      </div>
    </div>
  );

  const RecentSection = ({ title, data, type }) => (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
          {title}
        </h2>
        <Link
          to={`/dashboard?tab=${type}`}
          className="text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 text-sm font-medium"
        >
          View All
        </Link>
      </div>
      <div className="space-y-4">
        {data.map((item) => (
          <div
            key={item._id}
            className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            {type === "users" && (
              <>
                <img
                  src={item.profilePicture}
                  alt={item.username}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="font-medium text-gray-800 dark:text-white">
                    {item.username}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Joined {new Date(item.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </>
            )}
            {type === "comments" && (
              <>
                <div className="flex-1">
                  <p className="text-gray-800 dark:text-white line-clamp-1">
                    {item.content}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    <HiClock className="inline mr-1" />
                    {new Date(item.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
                  <HiChartBar className="w-4 h-4" />
                  <span>{item.numberOfLikes}</span>
                </div>
              </>
            )}
            {type === "posts" && (
              <>
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-16 h-12 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <p className="font-medium text-gray-800 dark:text-white line-clamp-1">
                    {item.title}
                  </p>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {item.category}
                  </span>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <StatCard
          title="Total Users"
          total={totalUsers}
          lastMonth={lastMonthUsers}
          icon={HiOutlineUserGroup}
          color="bg-blue-600"
        />
        <StatCard
          title="Total Comments"
          total={totalComments}
          lastMonth={lastMonthComments}
          icon={HiAnnotation}
          color="bg-purple-600"
        />
        <StatCard
          title="Total Posts"
          total={totalPosts}
          lastMonth={lastMonthPosts}
          icon={HiDocumentText}
          color="bg-green-600"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <RecentSection title="Recent Users" data={users} type="users" />
        <RecentSection
          title="Recent Comments"
          data={comments}
          type="comments"
        />
        <RecentSection title="Recent Posts" data={posts} type="posts" />
      </div>
    </div>
  );
}
