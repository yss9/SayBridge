package com.backend.repository;


import com.backend.dto.CourseSearchResponse;
import com.backend.entity.*;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;


import java.util.List;

@RequiredArgsConstructor
public class CourseRepositoryImpl implements CourseRepositoryCustom{

    private final JPAQueryFactory queryFactory;

    @Override
    public List<CourseSearchResponse> searchCourses(Language language, CourseLevel level) {
        QCourse course = QCourse.course;
        QTeacherProfile teacher = QTeacherProfile.teacherProfile;
        QUser user = QUser.user;

        BooleanBuilder builder = new BooleanBuilder();

        if (level != null) {
            builder.and(course.level.eq(level));
        }
        if (language != null) {
            builder.and(course.language.eq(language));
        }

        return queryFactory
                .select(Projections.constructor(
                        CourseSearchResponse.class,
                        course.id,
                        user.nickname,
                        course.title,
                        course.level.stringValue(),
                        course.language.stringValue(),
                        course.description,
                        course.maxStudents,
                        course.currentStudents
                ))
                .from(course)
                .join(course.teacher, teacher)
                .join(teacher.user, user)
                .where(builder)
                .fetch();
    }

}
