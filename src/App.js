import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import WelcomeComponenet from "./Components/Home/WelcomeComponent";
import NavbarComponent from "./Components/Navbar/NavbarComponent";
import NoPage from "./Components/Extra/NoPageComponent";
import LoginComponent from "./Components/Navbar/LoginComponent";
import LogoutComponent from "./Components/Navbar/LogoutComponent";
import AuthProvider, { useAuth } from "./Components/Security/AuthContext";
import EditJobPostsComponent from "./Components/JobTracker/EditJobPostsComponent";
import SignupComponent from "./Components/Navbar/SignupComponent";
import AllJobPostsComponent from "./Components/JobTracker/AllJobPosts";
import AddJobPostsComponent from "./Components/JobTracker/AddJobPostsComponent";
import UserComponent from "./Components/User/UserComponent";
import UserJobPostsComponent from "./Components/User/UserJobPostsComponents";
import UsersResumeComponent from "./Components/User/UsersResumes";

function AuthenticatedRoute({ children }) {
  const authContext = useAuth();
  if (authContext.isAuthenticated) {
    return children;
  }
  return <Navigate to="/login" />;
}

function App() {
  return (
    <div>
      <AuthProvider>
        <BrowserRouter>
          <NavbarComponent />
          <Routes>
            <Route path="/login" element={<LoginComponent />} />
            <Route path="/signup" element={<SignupComponent />} />
            <Route
              path="/logout"
              element={
                <AuthenticatedRoute>
                  <LogoutComponent />
                </AuthenticatedRoute>
              }
            />
            {/* <Route
              path="/welcome/:username"
              element={
                <AuthenticatedRoute>
                  <WelcomeComponenet />
                </AuthenticatedRoute>
              }
            /> */}
            <Route
              path="/user-profile"
              element={
                <AuthenticatedRoute>
                  <UserComponent />
                </AuthenticatedRoute>
              }
            />
            <Route
              path="/user-job-posts"
              element={
                <AuthenticatedRoute>
                  <UserJobPostsComponent />
                </AuthenticatedRoute>
              }
            />
            <Route
              path="/user-resumes"
              element={
                <AuthenticatedRoute>
                  <UsersResumeComponent />
                </AuthenticatedRoute>
              }
            />
            <Route
              path="/editJobPost/:id"
              element={
                <AuthenticatedRoute>
                  <EditJobPostsComponent />
                </AuthenticatedRoute>
              }
            />
            <Route
              path="/add-job-posts"
              element={
                <AuthenticatedRoute>
                  <AddJobPostsComponent />
                </AuthenticatedRoute>
              }
            />
            <Route path="/" element={<WelcomeComponenet />} />
            <Route path="/all-job-posts" element={<AllJobPostsComponent />} />
            <Route path="*" element={<NoPage />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
