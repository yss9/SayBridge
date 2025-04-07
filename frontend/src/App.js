import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CourseList from "./pages/CourseList";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Course from "./pages/Course";
import Introduce from "./pages/Introduce";
import MyPage from "./pages/MyPage";
import TeacherProfile from "./pages/TeacherProfile";
import FileUpload from "./pages/FileUpload";
import RequestTest from "./pages/RequestTest";
import ReviewTest from "./pages/ReviewTest";
import {AuthProvider} from "./context/AuthContext";
import CoursePost from "./pages/CoursePost";
import FileTest from "./pages/FileTest";
import ChatRoomPage from "./pages/ChatRoomPage";
import CreateChatroom from "./pages/CreateChatroom";
import VideoChatPage from "./pages/VideoChatPage";
import VideoChat from "./pages/VideoChat";

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Introduce />} />
                    <Route path="/courselist" element={<CourseList />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/signin" element={<SignIn />} />
                    <Route path="/mypage" element={<MyPage />} />
                    <Route path="/teacherprofile" element={<TeacherProfile />}/>
                    <Route path="/videochat" element={<VideoChatPage />} />
                    <Route path="/course/:courseId" element={<Course />} />
                    <Route path="/teacher/:teacherId" element={<TeacherProfile />} />
                    <Route path="/posting/:courseId" element={<CoursePost/>}/>

                    <Route path="/file" element={<FileUpload/>}/>
                    <Route path="/reviewTest" element={<ReviewTest/>}/>
                    <Route path="/requestTest" element={<RequestTest/>}/>
                    <Route path="/fileTest" element={<FileTest/>}/>
                    <Route path="/create-chatroom" element={<CreateChatroom />} />
                    <Route path="/chatroom/:chatCode" element={<ChatRoomPage />} />
                    <Route path="/videotest" element={<VideoChat />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
};

export default App;
