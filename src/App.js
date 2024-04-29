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
import AllJobPostsComponent from "./Components/JobTracker/AllJobPostsComponent";
import AddJobPostsComponent from "./Components/JobTracker/AddJobPostsComponent";
import UserComponent from "./Components/User/UserComponent";
import UserJobPostsComponent from "./Components/User/UserJobPostsComponents";
import UsersResumeComponent from "./Components/User/UsersResumesComponent";
import UploadResumeComponent from "./Components/ResumeComponents/UploadResumeComponent";

function AuthenticatedRoute({ children }) {
  const authContext = useAuth();
  if (authContext.isAuthenticated) {
    return children;
  }
  return <Navigate to="/login" />;
}

function App() {
  return (
    <div className="p-3 mb-2 bg-light text-dark">
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
              path="/upload-resume"
              element={
                <AuthenticatedRoute>
                  <UploadResumeComponent />
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
            <Route path="/" element={<AllJobPostsComponent />} />
            <Route path="/all-job-posts" element={<AllJobPostsComponent />} />
            <Route path="*" element={<NoPage />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
