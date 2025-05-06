package com.backend.config;

import com.backend.service.CustomOAuth2UserService;
import com.backend.util.JwtTokenUtil;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.HttpStatusEntryPoint;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfigurationSource;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
@EnableMethodSecurity(prePostEnabled = true)
public class SecurityConfig {

    @Autowired
    private CustomAuthenticationSuccessHandler customAuthenticationSuccessHandler;

    @Bean
    public SecurityFilterChain securityFilterChain(
            HttpSecurity http,
            CustomOAuth2UserService customOAuth2UserService,
            JwtTokenUtil jwtTokenUtil,
            CorsConfigurationSource corsConfigurationSource
    ) throws Exception {
        http
                // 1) CORS / CSRF
                .cors(withDefaults())
                .csrf(csrf -> csrf.disable())

                // 2) 인증 실패 시 401 반환 (로그인 폼 리다이렉트 방지)
                .exceptionHandling(ex ->
                        ex.authenticationEntryPoint(new HttpStatusEntryPoint(HttpStatus.UNAUTHORIZED))
                )

                // 3) 접근 권한 설정
                .authorizeHttpRequests(auth -> auth
                        // 정적 리소스
                        .requestMatchers(
                                "/", "/index.html", "/favicon.ico",
                                "/manifest.json", "/static/**", "/*.js", "/*.css"
                        ).permitAll()
                        // 회원가입·로그인·로그아웃·OAuth2 콜백
                        .requestMatchers(
                                "/api/auth/**",
                                "/api/login",
                                "/api/oauth2/**"
                        ).permitAll()
                        // Chatrooms, Course 조회 등 공개 API
                        .requestMatchers(
                                "/chatrooms/**",
                                "/api/course",
                                "/v3/api-docs/**"
                        ).permitAll()
                        // OPTIONS 메서드
                        .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
                        // 그 외는 인증 필요 (예: /api/user/me, /api/teacher/** 등)
                        .anyRequest().authenticated()
                )

                // 4) 로그인 설정 비활성화
                .formLogin(form -> form.disable())
                .httpBasic(basic -> basic.disable())

                // 5) OAuth2 로그인
                .oauth2Login(oauth2 -> oauth2
                        .successHandler(customAuthenticationSuccessHandler)
                        .failureUrl("/login?error=true")
                        .userInfoEndpoint(ui -> ui.userService(customOAuth2UserService))
                )

                // 6) 세션 없이 JWT 토큰 사용
                .sessionManagement(sm ->
                        sm.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                )

                // 7) JWT 필터 등록
                .addFilterBefore(
                        new JwtAuthenticationFilter(jwtTokenUtil),
                        UsernamePasswordAuthenticationFilter.class
                );

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
