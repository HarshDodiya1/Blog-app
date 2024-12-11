import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { FooterComponent } from "./Components/Footer";
import { Header } from "./Components/Header";
import { OnlyAdminPrivateRoute } from "./Components/OnlyAdminPrivateRoute";
import { PrivateRoute } from "./Components/PrivateRoute";
import ScrollToTop from "./Components/ScrollToTop";
import { About } from "./Pages/About";
import { CreatePost } from "./Pages/CreatePost";
import { Dashboard } from "./Pages/Dashboard";
import { Home } from "./Pages/Home";
import { PostPage } from "./Pages/PostPage";
import { Projects } from "./Pages/Projects";
import Search from "./Pages/Search";
import { SignIn } from "./Pages/SignIn";
import { SignUp } from "./Pages/SignUp";
import { UpdatePost } from "./Pages/UpdatePost";

function App() {
  const FooterWithoutDashboard = () => {
    const location = useLocation();
    const isDashboardRoute = location.pathname.includes("/dashboard");
    return !isDashboardRoute && <FooterComponent />;
  };
  return (
    <BrowserRouter>
      <Header />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/search" element={<Search />} />
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        <Route element={<OnlyAdminPrivateRoute />}>
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/update-post/:postId/" element={<UpdatePost />} />
        </Route>
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Projects />} />
        <Route path="/post/:postSlug" element={<PostPage />} />
      </Routes>
      <FooterWithoutDashboard />
    </BrowserRouter>
  );
}

export default App;
