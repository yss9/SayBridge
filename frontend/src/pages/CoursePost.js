import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { coursePostApi } from "../api/courseApi";
import { uploadApi } from "../api/fileUploadApi";

const CoursePostForm = () => {
    const location = useLocation();
    const post = location.state || null;

    const { courseId } = useParams();
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [file, setFile] = useState(null);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    useEffect(() => {
        if (post) {
            setTitle(post.title);
            setContent(post.content);
        }
    }, [post]);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        try {
            let postId = post?.postId;

            // 기존 게시글이 없으면 새로 생성
            if (!post) {
                const createResponse = await coursePostApi.createCoursePost({
                    courseId,
                    title,
                    content,
                });
                postId = createResponse.data;
            } else {
                // 게시글 수정
                await coursePostApi.updateCoursePost(postId, {
                    title,
                    content
                });
            }

            let uploadedUrl = '';

            // 파일 업로드 처리
            if (file) {
                const uploadResponse = await uploadApi.coursePostFileUpload(postId, file);
                uploadedUrl = uploadResponse.data;

                // 첨부파일이 있다면 업데이트
                await coursePostApi.updateCoursePost(postId, {
                    attachmentUrl: uploadedUrl
                });
            }

            setSuccess(post ? '게시글이 수정되었습니다!' : '게시글이 작성되었습니다!');
            setTitle('');
            setContent('');
            setFile(null);

            navigate(`/course/${courseId}`);
        } catch (err) {
            setError('서버 에러: ' + (err.response?.data?.message || err.message));
        }
    };

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <h1>{post ? '게시글 수정' : '강의 작성'}</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}

            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '1rem' }}>
                    <label>제목:
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem' }}
                        />
                    </label>
                </div>

                <div style={{ marginBottom: '1rem' }}>
                    <label>내용:
                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            required
                            rows="5"
                            style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem' }}
                        />
                    </label>
                </div>

                <div style={{ marginBottom: '1rem' }}>
                    <label>첨부파일:
                        <input
                            type="file"
                            onChange={handleFileChange}
                            style={{ display: 'block', marginTop: '0.5rem' }}
                        />
                    </label>
                </div>

                <button type="submit" style={{ padding: '0.75rem 1.5rem' }}>
                    {post ? '수정 완료' : '작성 완료'}
                </button>
            </form>
        </div>
    );
};

export default CoursePostForm;
