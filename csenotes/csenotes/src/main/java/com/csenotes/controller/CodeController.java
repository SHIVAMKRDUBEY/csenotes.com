
package com.csenotes.controller;

import com.csenotes.service.CodeExecutionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api")
public class CodeController {

    @Autowired
    private CodeExecutionService codeService;

    @PostMapping("/run-code")
    public Map<String, String> runCode(@RequestBody Map<String, String> request) {
        String language = request.get("language");
        String code = request.get("code");
        String input = request.getOrDefault("input", "");

        try {
            String output = "";
            if ("java".equalsIgnoreCase(language)) {
                output = codeService.runJavaCode(code, input);
            } else {
                output = "Language not supported yet!";
            }

            return Map.of("status", "success", "output", output);

        } catch (Exception e) {
            return Map.of("status", "error", "output", e.getMessage());
        }
    }
}
