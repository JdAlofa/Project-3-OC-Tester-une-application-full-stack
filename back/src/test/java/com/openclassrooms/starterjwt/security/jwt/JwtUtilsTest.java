package com.openclassrooms.starterjwt.security.jwt;

import com.openclassrooms.starterjwt.security.services.UserDetailsImpl;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.core.Authentication;
import org.springframework.test.util.ReflectionTestUtils;

import java.util.Date;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class JwtUtilsTest {

    @InjectMocks
    private JwtUtils jwtUtils;

    @Mock
    private Authentication authentication;

    @BeforeEach
    void setUp() {
        ReflectionTestUtils.setField(jwtUtils, "jwtSecret", "testSecret");
        ReflectionTestUtils.setField(jwtUtils, "jwtExpirationMs", 3600000); // 1 hour
    }

    @Test
    void generateJwtToken_shouldGenerateValidToken() {
        UserDetailsImpl userDetails = UserDetailsImpl.builder().username("testuser").build();
        when(authentication.getPrincipal()).thenReturn(userDetails);

        String token = jwtUtils.generateJwtToken(authentication);

        assertThat(token).isNotNull();
        String username = Jwts.parser().setSigningKey("testSecret").parseClaimsJws(token).getBody().getSubject();
        assertThat(username).isEqualTo("testuser");
    }

    @Test
    void getUserNameFromJwtToken_shouldReturnUsername() {
        String token = Jwts.builder()
                .setSubject("testuser")
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 3600000))
                .signWith(SignatureAlgorithm.HS512, "testSecret")
                .compact();

        String username = jwtUtils.getUserNameFromJwtToken(token);
        assertThat(username).isEqualTo("testuser");
    }

    @Test
    void validateJwtToken_shouldReturnTrueForValidToken() {
        String token = Jwts.builder()
                .setSubject("testuser")
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 3600000))
                .signWith(SignatureAlgorithm.HS512, "testSecret")
                .compact();

        boolean isValid = jwtUtils.validateJwtToken(token);
        assertThat(isValid).isTrue();
    }

    @Test
    void validateJwtToken_shouldReturnFalseForInvalidSignature() {
        String token = Jwts.builder()
                .setSubject("testuser")
                .signWith(SignatureAlgorithm.HS512, "wrongSecret")
                .compact();

        boolean isValid = jwtUtils.validateJwtToken(token);
        assertThat(isValid).isFalse();
    }

    @Test
    void validateJwtToken_shouldReturnFalseForExpiredToken() {
        String token = Jwts.builder()
                .setSubject("testuser")
                .setExpiration(new Date(System.currentTimeMillis() - 1000))
                .signWith(SignatureAlgorithm.HS512, "testSecret")
                .compact();

        boolean isValid = jwtUtils.validateJwtToken(token);
        assertThat(isValid).isFalse();
    }
    
    @Test
    void validateJwtToken_shouldReturnFalseForMalformedToken() {
        boolean isValid = jwtUtils.validateJwtToken("malformed.token.string");
        assertThat(isValid).isFalse();
    }

    @Test
    void validateJwtToken_shouldReturnFalseForUnsupportedToken() {
        String token = Jwts.builder().setSubject("test").compact(); // No signature
        boolean isValid = jwtUtils.validateJwtToken(token);
        assertThat(isValid).isFalse();
    }

    @Test
    void validateJwtToken_shouldReturnFalseForEmptyClaims() {
        boolean isValid = jwtUtils.validateJwtToken("");
        assertThat(isValid).isFalse();
    }
}
