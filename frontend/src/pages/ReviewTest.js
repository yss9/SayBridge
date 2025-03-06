// ReviewTestPage.jsx
import React, { useState, useEffect } from 'react';
import { reviewApi } from '../api/reviewApi'; // 실제 파일 경로로 변경

function ReviewTestPage() {
    const [myReviews, setMyReviews] = useState([]);
    const [courseReviews, setCourseReviews] = useState([]);

    // 입력값(코스 ID, 삭제할 리뷰 ID 등)
    const [courseId, setCourseId] = useState('');
    const [deleteReviewId, setDeleteReviewId] = useState('');

    // 리뷰 생성에 필요한 데이터 (rating, content, courseId 등)
    const [reviewDto, setReviewDto] = useState({
        rating: 5,
        content: '',
        courseId: null, // 코스 ID 지정 필요
    });

    // 1) 컴포넌트 마운트 시, 내 리뷰(MyReview) 목록 불러오기
    useEffect(() => {
        fetchMyReviews();
    }, []);

    // 내 리뷰 목록 가져오기
    const fetchMyReviews = async () => {
        try {
            const response = await reviewApi.getMyReview();
            setMyReviews(response.data);
        } catch (error) {
            console.error('getMyReview Error:', error);
            alert('내 리뷰 목록을 불러오는데 실패했습니다.');
        }
    };

    // 특정 코스 리뷰 목록 가져오기
    const fetchCourseReviews = async () => {
        try {
            if (!courseId) {
                alert('코스 ID를 입력하세요.');
                return;
            }
            const response = await reviewApi.getCourseReview(courseId);
            setCourseReviews(response.data);
        } catch (error) {
            console.error('getCourseReview Error:', error);
            alert('해당 코스 리뷰 목록을 불러오는데 실패했습니다.');
        }
    };

    // 리뷰 생성 요청
    const handleCreateReview = async () => {
        try {
            if (!reviewDto.courseId || !reviewDto.content) {
                alert('courseId와 content를 입력해주세요.');
                return;
            }
            await reviewApi.createReview(reviewDto);
            alert('리뷰가 생성되었습니다.');
            // 리뷰 생성 후 다시 내 리뷰 목록 갱신
            fetchMyReviews();
        } catch (error) {
            console.error('createReview Error:', error);
            alert('리뷰 생성에 실패했습니다.');
        }
    };

    // 리뷰 삭제
    const handleDeleteReview = async () => {
        try {
            if (!deleteReviewId) {
                alert('삭제할 리뷰 ID를 입력하세요.');
                return;
            }
            await reviewApi.deleteReview(deleteReviewId);
            alert('리뷰가 삭제되었습니다.');
            // 삭제 후 다시 내 리뷰 목록 갱신
            fetchMyReviews();
        } catch (error) {
            console.error('deleteReview Error:', error);
            alert('리뷰 삭제에 실패했습니다.');
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>Review Test Page</h1>

            {/* 1) 내 리뷰 목록 */}
            <section>
                <h2>내 리뷰 목록</h2>
                <button onClick={fetchMyReviews}>내 리뷰 다시 불러오기</button>
                <ul>
                    {myReviews.map((review) => (
                        <li key={review.id}>
                            ID: {review.id}, CourseTitle:{review.courseTitle}, courseId:{review.courseId} Content: {review.content}, Rating: {review.rating}
                        </li>
                    ))}
                </ul>
            </section>
            <hr />

            {/* 2) 코스별 리뷰 목록 */}
            <section>
                <h2>코스 리뷰 목록</h2>
                <div>
                    <label>코스 ID: </label>
                    <input
                        value={courseId}
                        onChange={(e) => setCourseId(e.target.value)}
                        placeholder="코스 ID 입력"
                    />
                    <button onClick={fetchCourseReviews}>해당 코스 리뷰 불러오기</button>
                </div>
                <ul>
                    {courseReviews.map((review) => (
                        <li key={review.id}>
                            ID: {review.id}, Content: {review.content}, Rating: {review.rating}
                        </li>
                    ))}
                </ul>
            </section>
            <hr />

            {/* 3) 리뷰 생성 */}
            <section>
                <h2>리뷰 생성</h2>
                <div>
                    <label>Course ID: </label>
                    <input
                        type="number"
                        value={reviewDto.courseId || ''}
                        onChange={(e) =>
                            setReviewDto({ ...reviewDto, courseId: Number(e.target.value) })
                        }
                        placeholder="코스 ID"
                    />
                </div>
                <div>
                    <label>Rating: </label>
                    <input
                        type="number"
                        value={reviewDto.rating}
                        onChange={(e) =>
                            setReviewDto({ ...reviewDto, rating: Number(e.target.value) })
                        }
                        placeholder="별점"
                    />
                </div>
                <div>
                    <label>Content: </label>
                    <input
                        type="text"
                        value={reviewDto.content}
                        onChange={(e) => setReviewDto({ ...reviewDto, content: e.target.value })}
                        placeholder="리뷰 내용"
                    />
                </div>
                <button onClick={handleCreateReview}>리뷰 생성하기</button>
            </section>
            <hr />

            {/* 4) 리뷰 삭제 */}
            <section>
                <h2>리뷰 삭제</h2>
                <div>
                    <label>삭제할 리뷰 ID: </label>
                    <input
                        value={deleteReviewId}
                        onChange={(e) => setDeleteReviewId(e.target.value)}
                        placeholder="리뷰 ID"
                    />
                    <button onClick={handleDeleteReview}>리뷰 삭제</button>
                </div>
            </section>
        </div>
    );
}

export default ReviewTestPage;
