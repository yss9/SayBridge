package com.backend.service;

import com.backend.entity.CoursePost;
import com.backend.entity.Homework;
import com.backend.entity.TeacherProfile;
import com.backend.entity.User;
import com.backend.repository.CoursePostRepository;
import com.backend.repository.HomeworkRepository;
import com.backend.repository.TeacherProfileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.UUID;

@Service
public class FileStorageService {

    @Autowired
    private S3Service s3Service;

    @Autowired
    private TeacherProfileRepository teacherProfileRepository;

    @Autowired
    private CoursePostRepository coursePostRepository;

    @Autowired
    private HomeworkRepository homeworkRepository;

    public String uploadUserProfile(User user, MultipartFile multipartFile) throws IOException {
        File file = convertMultipartFileToFile(multipartFile);

        String oldKey = user.getProfileImageUrl();
        System.out.println("oldKey = " + oldKey);
        if (oldKey != null) {
            System.out.println("oldKey = " + oldKey);
            s3Service.deleteFile(oldKey);
        }

        String newKey = "user/profile/" + user.getId() + "/" + UUID.randomUUID() + "-" + multipartFile.getOriginalFilename();
        String fileUrl = s3Service.uploadFile(newKey, file);
        file.delete();

        return fileUrl;
    }

    public String uploadTeacherProfile(User user, MultipartFile multipartFile) throws IOException {
        File file = convertMultipartFileToFile(multipartFile);
        TeacherProfile teacherProfile = teacherProfileRepository.findByUser(user).orElseThrow();

        String oldKey = teacherProfile.getImageUrl();
        if (oldKey != null) {
            s3Service.deleteFile(oldKey);
        }

        String newKey = "teacher/profile/" + teacherProfile.getId() + "/" + UUID.randomUUID() + "-" + multipartFile.getOriginalFilename();
        String fileUrl = s3Service.uploadFile(newKey, file);
        file.delete();

        return fileUrl;
    }

    public String uploadHomeworkFile(Long coursePostId, User user, MultipartFile multipartFile) throws IOException {
        File file = convertMultipartFileToFile(multipartFile);
        Homework homework = homeworkRepository.findByStudentIdAndCoursePostId(user.getId(), coursePostId).orElseThrow();

        String oldKey = homework.getAttachmentUrl();
         if (oldKey != null) {
             s3Service.deleteFile(oldKey);
         }

        String newKey = "user/homework/" + coursePostId + "/" + user.getId() + "/" + UUID.randomUUID() + "-" + multipartFile.getOriginalFilename();
        String fileUrl = s3Service.uploadFile(newKey, file);
        file.delete();

        return fileUrl;
    }

    public String uploadCoursePostFile(Long coursePostId, MultipartFile multipartFile) throws IOException {
        File file = convertMultipartFileToFile(multipartFile);

         CoursePost coursePost = coursePostRepository.findById(coursePostId).orElseThrow();
         String oldKey = coursePost.getAttachmentUrl();
         if (oldKey != null) {
             s3Service.deleteFile(oldKey);
         }

        String newKey = "user/homework/" + coursePostId + "/" + multipartFile.getOriginalFilename();
        String fileUrl = s3Service.uploadFile(newKey, file);
        file.delete();

        return fileUrl;
    }

    private File convertMultipartFileToFile(MultipartFile multipartFile) throws IOException {
        File file = new File(System.getProperty("java.io.tmpdir") + "/" + multipartFile.getOriginalFilename());
        try (FileOutputStream fos = new FileOutputStream(file)) {
            fos.write(multipartFile.getBytes());
        }
        return file;
    }
}
