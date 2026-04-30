package com.csenotes.config;

import com.csenotes.security.JwtAuthFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.firewall.HttpFirewall;
import org.springframework.security.web.firewall.StrictHttpFirewall;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
public class SecurityConfig {

    private final JwtAuthFilter jwtAuthFilter;

    public SecurityConfig(JwtAuthFilter jwtAuthFilter) {
        this.jwtAuthFilter = jwtAuthFilter;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                .csrf(csrf -> csrf.disable())
                .headers(headers -> headers.frameOptions(frame -> frame.disable()))

//                .authorizeHttpRequests(auth -> auth
//                        .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll() // preflight
//                        .requestMatchers(HttpMethod.GET, "/uploads/**").permitAll()
//                        .requestMatchers(HttpMethod.GET,
//                                "/api/companypdf/**",
//                                "/api/txtnotes/**",
//                                "/api/interview-txt/**",
//                                "/api/company-txt/**",
//                                "/api/ads/**",
//                                "/api/affiliate",
//                                "/api/interviewpdfs",
//                                "/api/notespdf/**",
//                                "/api/sponsorship",
//                                "/api/subjectsimage/**"
//                        ).permitAll()
////                        .requestMatchers(
////                                "/admin/**",
////                                "/admin/login",
////                                "/admin/refresh",
////                                "/admin/logout",
////                                "/admin/request-otp",
////                                "/admin/verify-otp",
////                                "/admin/reset-password",
////                                "/admin/reset-username"
////                        ).permitAll()
////                                .requestMatchers("/admin/**").permitAll()
//
//                                .requestMatchers(
//                                        "/api/admin/login",
//                                        "/api/admin/refresh",
//                                        "/api/admin/logout",
//                                        "/api/admin/request-otp",
//                                        "/api/admin/verify-otp",
//                                        "/api/admin/reset-password",
//                                        "/api/admin/reset-username",
//                                        "/api/admin/forgot-reset"
//                                ).permitAll()
//
//                                .requestMatchers("/api/admin/**").authenticated()
//                        .anyRequest().authenticated()
//                )


                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
                        .requestMatchers(HttpMethod.GET, "/uploads/**").permitAll()

                        .requestMatchers(HttpMethod.GET,
                                "/api/companypdf/**",
                                "/api/txtnotes/**",
                                "/api/interview-txt/**",
                                "/api/company-txt/**",
                                "/api/ads/**",
                                "/api/affiliate",
                                "/api/interviewpdfs",
                                "/api/notespdf/**",
                                "/api/sponsorship",
                                "/api/subjectsimage/**"
                        ).permitAll()

                        // 🔥 FIXED ADMIN ROUTES
                        .requestMatchers(
                                "/admin/login",
                                "/admin/refresh",
                                "/admin/logout",
                                "/admin/request-otp",
                                "/admin/forgot-reset"
                        ).permitAll()

                        .requestMatchers("/admin/**").authenticated()

                        .anyRequest().permitAll()
                )
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowedOriginPatterns(List.of(
                "https://csenotes.com",
                "https://www.csenotes.com",
                "http://localhost:3000"
        ));
        config.setAllowedMethods(List.of("GET","POST","PUT","DELETE","OPTIONS"));
        config.setAllowedHeaders(List.of("*"));
        config.setAllowCredentials(true); // cookies/auth ke liye

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }

@Bean
    public HttpFirewall allowDoubleSlashHttpFirewall() {
        StrictHttpFirewall firewall = new StrictHttpFirewall();
        firewall.setAllowUrlEncodedDoubleSlash(true); // "//" allow करने के लिए
        return firewall;
    }
}
