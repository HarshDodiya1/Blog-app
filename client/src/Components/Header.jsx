import { Avatar, Button, Dropdown, Navbar, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon, FaSun } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "../assets/H_Logo2.svg";
import { toggleTheme } from "../redux/Theme/themeSlice";
import { signoutSuccess } from "../redux/User/userSlice";

export function Header() {
  const path = useLocation().pathname;
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  const handleSignout = async () => {
    try {
      const res = await fetch("/api/user/signout", {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
      } else {
        dispatch(signoutSuccess());
      }
    } catch (error) {}
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };
  return (
    <Navbar className="border-b-2 fixed w-full top-0 left-0 z-50 bg-white dark:bg-gray-900 shadow-md">
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo Section */}
        <Link
          to="/"
          className="flex items-center space-x-3 hover:scale-105 transition-transform duration-300"
        >
          <img
            src={Logo}
            alt="Quillier Blog"
            className="w-10 h-10 rounded-lg"
          />
          <span className="text-xl font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-transparent bg-clip-text hidden sm:inline">
            Quillier
          </span>
        </Link>

        {/* Search Bar - Desktop */}
        <div className="hidden md:flex items-center flex-1 max-w-xl mx-4">
          <form onSubmit={handleSubmit} className="w-full">
            <div className="relative">
              <TextInput
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-full"
                icon={AiOutlineSearch}
              />
            </div>
          </form>
        </div>

        {/* Navigation Links - Desktop */}
        <div className="hidden md:flex items-center space-x-6">
          <NavLink to="/" active={path === "/"}>
            Home
          </NavLink>
          <NavLink to="/about" active={path === "/about"}>
            About
          </NavLink>
          <NavLink to="/contact" active={path === "/contact"}>
            Contact
          </NavLink>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          {/* Theme Toggle */}
          <Button
            className="rounded-full p-2 hover:scale-110 transition-transform duration-300"
            color="gray"
            pill
            onClick={() => dispatch(toggleTheme())}
          >
            {theme === "light" ? (
              <FaMoon className="w-5 h-5" />
            ) : (
              <FaSun className="w-5 h-5" />
            )}
          </Button>

          {/* User Menu */}
          {currentUser ? (
            <Dropdown
              arrowIcon={false}
              inline
              label={
                <Avatar
                  alt="user"
                  img={currentUser.user.profilePicture}
                  rounded
                  className="cursor-pointer hover:ring-2 hover:ring-purple-500 transition-all duration-300"
                />
              }
            >
              <Dropdown.Header>
                <span className="block text-sm font-medium">
                  @{currentUser.user.username}
                </span>
                <span className="block text-sm truncate text-gray-500">
                  {currentUser.user.email}
                </span>
              </Dropdown.Header>
              <Link to="/dashboard?tab=profile">
                <Dropdown.Item>
                  <span className="flex items-center space-x-2">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                    <span>Profile</span>
                  </span>
                </Dropdown.Item>
              </Link>
              <Dropdown.Divider />
              <Dropdown.Item onClick={handleSignout}>
                <span className="flex items-center space-x-2 text-red-500">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                  <span>Sign out</span>
                </span>
              </Dropdown.Item>
            </Dropdown>
          ) : (
            <Link to="/signin">
              <Button
                gradientDuoTone="purpleToBlue"
                outline
                className="rounded-full hover:scale-105 transition-transform duration-300"
              >
                Sign In
              </Button>
            </Link>
          )}

          {/* Mobile Menu Button */}
          <Navbar.Toggle />
        </div>
      </div>

      {/* Mobile Search and Navigation */}
      <Navbar.Collapse className="md:hidden mt-2">
        <div className="px-4 pb-4">
          <form onSubmit={handleSubmit}>
            <TextInput
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
              icon={AiOutlineSearch}
            />
          </form>
        </div>
        <NavLink mobile to="/" active={path === "/"}>
          Home
        </NavLink>
        <NavLink mobile to="/about" active={path === "/about"}>
          About
        </NavLink>
        <NavLink mobile to="/contact" active={path === "/contact"}>
          Contact
        </NavLink>
      </Navbar.Collapse>
    </Navbar>
  );
}

// Helper component for navigation links
const NavLink = ({ to, children, active, mobile }) => (
  <Link
    to={to}
    className={`
      ${mobile ? "block py-2 px-4" : "inline-block"} 
      ${active ? "text-purple-500 font-semibold" : "text-gray-700 dark:text-gray-300"} 
      hover:text-purple-500 transition-colors duration-300
    `}
  >
    {children}
  </Link>
);
