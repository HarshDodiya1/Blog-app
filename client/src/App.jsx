import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Header } from "./Components/Header";
import { Home } from "./Pages/Home";
import { Projects } from "./Pages/Projects";
import { SignIn } from "./Pages/SignIn";
import { SignUp } from "./Pages/SignUp";
import { Dashboard } from "./Pages/Dashboard";
import { About } from "./Pages/About";
import { FooterComponent } from "./Components/Footer";
import { PrivateRoute } from "./Components/PrivateRoute";
import { OnlyAdminPrivateRoute } from "./Components/OnlyAdminPrivateRoute";
import { CreatePost } from "./Pages/CreatePost";
import { UpdatePost } from "./Pages/UpdatePost";
import { PostPage } from "./Pages/PostPage";
import ScrollToTop from "./Components/ScrollToTop";
import Search from "./Pages/Search";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path='/search' element={<Search />} />
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        <Route element={<OnlyAdminPrivateRoute />}>
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/update-post/:postId/" element={<UpdatePost />} />
        </Route>

        <Route path="/about" element={<About />} />
        
        <Route path="/projects" element={<Projects />} />
        <Route path="/post/:postSlug" element={<PostPage />} />

      </Routes>
      <FooterComponent />
    </BrowserRouter>
  );
}

export default App;
