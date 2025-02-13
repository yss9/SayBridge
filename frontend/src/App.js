import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import VideoChat from "./pages/VideoChat";
import Course from "./pages/Course";
import Introduce from "./pages/Introduce";
import MyPage from "./pages/MyPage";
import TeacherProfile from "./pages/TeacherProfile";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Introduce />} />
                <Route path="/home" element={<Home />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/mypage" element={<MyPage />} />
                <Route path="/teacherprofile" element={<TeacherProfile />}/>
                <Route path="/videochat" element={<VideoChat />} />
                <Route path="/course" element={<Course />} />
            </Routes>
        </Router>
    );
};

export default App;
