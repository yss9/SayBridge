package com.backend.service;

import com.backend.dto.HomeworkAttachmentProjection;
import com.backend.entity.User;
import com.backend.repository.CoursePostRepository;
import com.backend.repository.HomeworkRepository;
import com.backend.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Map;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class HomeworkServiceTest {

    @Mock
    private HomeworkRepository homeworkRepository;

    @Mock
    private CoursePostRepository coursePostRepository;

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private HomeworkService homeworkService;

    @Test
    void loadsSubmissionAttachmentsWithOneBatchQuery() {
        User student = new User();
        student.setId(7L);
        List<Long> postIds = List.of(10L, 20L, 30L);

        HomeworkAttachmentProjection first = projection(10L, "homework/10.pdf");
        HomeworkAttachmentProjection second = projection(30L, "homework/30.pdf");
        when(homeworkRepository.findSubmissionAttachments(7L, postIds))
                .thenReturn(List.of(first, second));

        Map<Long, String> result = homeworkService.getStudentSubmissionsMap(postIds, student);

        assertThat(result).containsExactly(
                Map.entry(10L, "homework/10.pdf"),
                Map.entry(30L, "homework/30.pdf")
        );
        verify(homeworkRepository).findSubmissionAttachments(7L, postIds);
        verify(homeworkRepository, never()).findByStudentIdAndCoursePostId(7L, 10L);
    }

    @Test
    void skipsDatabaseQueryWhenPostIdsAreEmpty() {
        User student = new User();
        student.setId(7L);

        assertThat(homeworkService.getStudentSubmissionsMap(List.of(), student)).isEmpty();

        verify(homeworkRepository, never()).findSubmissionAttachments(7L, List.of());
    }

    private HomeworkAttachmentProjection projection(Long coursePostId, String attachmentUrl) {
        return new HomeworkAttachmentProjection() {
            @Override
            public Long getCoursePostId() {
                return coursePostId;
            }

            @Override
            public String getAttachmentUrl() {
                return attachmentUrl;
            }
        };
    }
}
