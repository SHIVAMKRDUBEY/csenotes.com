package com.csenotes.service;

import com.csenotes.config.CodeExecutionConfig;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.*;
import java.nio.file.*;
import java.util.Comparator;

@Service
public class CodeExecutionService {

    @Autowired
    private CodeExecutionConfig config;

    public String runJavaCode(String code, String input) throws IOException, InterruptedException {

        // Ensure base temp directory exists
        Files.createDirectories(Paths.get(config.getTempDir()));

        // Create unique temporary directory for this code execution
        Path tempDir = Files.createTempDirectory(
                Paths.get(config.getTempDir()),
                "java-"
        );

        try {
            // Write Java code to Main.java
            Path codeFile = tempDir.resolve("Main.java");
            Files.write(codeFile, code.getBytes());

            // Prepare Docker command with -i flag for interactive stdin
            ProcessBuilder pb = new ProcessBuilder(
                    "docker", "run", "--rm", "-i",
                    "-v", tempDir.toAbsolutePath() + ":/app",
                    "--memory=" + config.getMemoryLimitMB() + "m",
                    "--cpus=" + config.getCpuLimit(),
                    config.getJavaImage()
            );

            Process process = pb.start();

            // Send input if provided
            if (input != null && !input.isEmpty()) {
                try (BufferedWriter writer = new BufferedWriter(
                        new OutputStreamWriter(process.getOutputStream()))) {

                    // Split input into lines and send each line with newline
                    String[] lines = input.split("\\r?\\n");
                    for (String line : lines) {
                        writer.write(line);
                        writer.newLine(); // important for Scanner.nextLine()
                    }
                    writer.flush();
                }
            }

            // Read output & error
            String output = new String(process.getInputStream().readAllBytes());
            String error = new String(process.getErrorStream().readAllBytes());

            // Wait for process to finish
            process.waitFor();

            if (!error.isEmpty()) {
                return "Error:\n" + error;
            }

            return output;

        } finally {
            // Cleanup temp directory
            Files.walk(tempDir)
                    .sorted(Comparator.reverseOrder())
                    .map(Path::toFile)
                    .forEach(File::delete);
        }
    }
}
