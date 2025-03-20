package com.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.DeleteObjectRequest;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

import java.io.File;
import java.nio.file.Path;
import java.util.UUID;

@Service
public class S3Service {

    @Autowired
    private S3Client s3Client;

    @Value("${aws.s3.bucket-name}")
    private String bucketName;


    public String uploadFile(String key, File file) {
        PutObjectRequest request = PutObjectRequest.builder()
                .bucket(bucketName)
                .key(key)
                .build();
        s3Client.putObject(request, Path.of(file.getPath()));
        return "https://" + bucketName + ".s3." +
                s3Client.serviceClientConfiguration().region() + ".amazonaws.com/" + key;
    }

    public void deleteFile(String keyOrUrl) {
        String key = keyOrUrl;
        String prefix = "https://" + bucketName + ".s3." +
                s3Client.serviceClientConfiguration().region() + ".amazonaws.com/";
        if (keyOrUrl.startsWith(prefix)) {
            key = keyOrUrl.substring(prefix.length());
        }
        System.out.println("Deleting file with key: " + key);
        DeleteObjectRequest request = DeleteObjectRequest.builder()
                .bucket(bucketName)
                .key(key)
                .build();
        s3Client.deleteObject(request);
    }


}
