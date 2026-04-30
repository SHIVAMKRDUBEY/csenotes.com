package com.csenotes.util;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

@Component
public class FileUploadUtil {

    private static String BASE_DIR;
    private static final long MAX_SIZE = 300 * 1024;

    @Value("${file.upload-dir}")
    public void setBaseDir(String baseDir) {
        BASE_DIR = baseDir;
    }

public static String saveFile(String subDir, MultipartFile file) {
    try {
        // Ensure cross-platform path
        subDir = subDir.replace("/", File.separator);

        Path dir = Paths.get(BASE_DIR, subDir);
        Files.createDirectories(dir); // create if not exists

        String originalName = file.getOriginalFilename();
        String ext = "";
        if (originalName != null && originalName.contains(".")) {
            ext = originalName.substring(originalName.lastIndexOf("."));
        }

        String fileName = UUID.randomUUID() + ext;

        Path filePath = dir.resolve(fileName);

        // Save file
        Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

        return fileName;

    } catch (Exception e) {
        e.printStackTrace();
        throw new RuntimeException("Failed to save file", e);
    }
}

    // ================= DELETE =================
    public static void deleteFile(String fileName, String subDir) {
        if (fileName == null || fileName.isBlank()) return;

        File f = Paths.get(BASE_DIR, subDir, fileName).toFile();
        if (f.exists()) f.delete();
    }

    // ================= URL =================
    public static String getFileUrl(String fileName, String subDir) {
        if (fileName == null || fileName.isBlank()) return "";

        String cleanSubDir = subDir
                .replace("\\", "/")
                .replaceAll("^/+", "")
                .replaceAll("/+$", "");

        return "/uploads/" + cleanSubDir + "/" + fileName;
    }


    // ================= VALIDATION =================
    public static boolean isValidPdf(MultipartFile file) {
        return file != null && !file.isEmpty()
                && "application/pdf".equalsIgnoreCase(file.getContentType())
                && file.getSize() <= 50 * 1024 * 1024;
    }

    public static boolean isValidImage(MultipartFile file) {
        if (file == null || file.isEmpty()) return false;
        String ct = file.getContentType();
        return (ct.equals("image/png")
                || ct.equals("image/jpeg")
                || ct.equals("image/jpg"))
                && file.getSize() <= 300 * 1024;
    }
// IMAGEUPLOAD
    public static String saveFile(MultipartFile file) throws Exception {

        if (file == null || file.isEmpty())
            throw new RuntimeException("File is empty");

        if (file.getSize() > MAX_SIZE)
            throw new RuntimeException("Image size should not exceed 300 KB");

        Path uploadPath = Paths.get(BASE_DIR).toAbsolutePath().normalize();
        Files.createDirectories(uploadPath);

        String fileName = System.currentTimeMillis() + "_" +
                Paths.get(file.getOriginalFilename()).getFileName().toString();

        Path filePath = uploadPath.resolve(fileName);

        Files.copy(file.getInputStream(), filePath,
                StandardCopyOption.REPLACE_EXISTING);

        return fileName;
    }

}