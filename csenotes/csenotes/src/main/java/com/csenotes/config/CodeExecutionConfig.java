
package com.csenotes.config;

import org.springframework.context.annotation.Configuration;

@Configuration
public class CodeExecutionConfig {

    private String javaImage = "java-runner-image";  // Docker image name
    private int memoryLimitMB = 256;                 // Memory limit for Docker container
    private double cpuLimit = 0.5;                   // CPU limit for Docker container
    private String tempDir = "D:/video/csenotes/csenotes/tmp-code"; // Temporary folder

    // Getters
    public String getJavaImage() {
        return javaImage;
    }

    public int getMemoryLimitMB() {
        return memoryLimitMB;
    }

    public double getCpuLimit() {
        return cpuLimit;
    }

    public String getTempDir() {
        return tempDir;
    }
}
