package com.backend.controller;

import com.backend.service.S3Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;

@RestController
@RequestMapping("/api/files")
public class FileController {

    @Autowired
    private S3Service s3Service;

    @PostMapping("/upload")
    public ResponseEntity<String> uploadFile(@RequestPart(value = "file", required = false) MultipartFile multipartFile) throws IOException {
        File file = convertMultipartFileToFile(multipartFile);
        System.out.println("file = " + file);
        String fileUrl = s3Service.uploadFile(file);
        System.out.println("fileUrl = " + fileUrl);
        file.delete();
        return ResponseEntity.ok(fileUrl);
    }

    private File convertMultipartFileToFile(MultipartFile multipartFile) throws IOException {
        File file = new File(System.getProperty("java.io.tmpdir") + "/" + multipartFile.getOriginalFilename());
        try (FileOutputStream fos = new FileOutputStream(file)) {
            fos.write(multipartFile.getBytes());
        }
        return file;
    }
}
