import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './context/PrivateRoute';

import Introduce from './pages/Introduce';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import CourseList from './pages/CourseList';
import MyPage from './pages/MyPage';
import TeacherProfile from './pages/TeacherProfile';
import VideoChatPage from './pages/VideoChatPage';
import Course from './pages/Course';
import CoursePost from './pages/CoursePost';
import FileUpload from './pages/FileUpload';
import ReviewTest from './pages/ReviewTest';
import RequestTest from './pages/RequestTest';
import FileTest from './pages/FileTest';
import ChatRoomPage from './pages/ChatRoomPage';
import CreateChatroom from './pages/CreateChatroom';
import VideoChat from './pages/VideoChat';
import AdminUserPage from './pages/AdminUserPage';
import WebRtcTest from "./pages/WebRTCTEST";

function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    {/* Public Routes */}
                    <Route path="/" element={<Introduce />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/signin" element={<SignIn />} />
                    <Route path="/rtctest" element={<WebRtcTest/>}/>
                    {/* Protected Routes */}
                    <Route element={<PrivateRoute />}>
                        <Route path="/courselist" element={<CourseList />} />
                        <Route path="/mypage" element={<MyPage />} />
                        <Route path="/teacherprofile" element={<TeacherProfile />} />
                        <Route path="/teacher/:teacherId" element={<TeacherProfile />} />
                        <Route path="/videochat" element={<VideoChatPage />} />
                        <Route path="/video/:chatCode" element={<VideoChat />} />
                        <Route path="/course/:courseId" element={<Course />} />
                        <Route path="/posting/:courseId" element={<CoursePost />} />
                        <Route path="/file" element={<FileUpload />} />
                        <Route path="/reviewTest" element={<ReviewTest />} />
                        <Route path="/requestTest" element={<RequestTest />} />
                        <Route path="/fileTest" element={<FileTest />} />
                        <Route path="/chatroom/:chatCode" element={<ChatRoomPage />} />
                        <Route path="/create-chatroom" element={<CreateChatroom />} />
                        <Route path="/updateRole" element={<AdminUserPage />} />
                    </Route>
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;
