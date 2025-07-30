package com.openclassrooms.starterjwt.payload.request;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;

public class LoginRequestTest {

    @Test
    public void testGettersAndSetters() {
        LoginRequest loginRequest = new LoginRequest();
        loginRequest.setEmail("test@example.com");
        loginRequest.setPassword("password");

        assertThat(loginRequest.getEmail()).isEqualTo("test@example.com");
        assertThat(loginRequest.getPassword()).isEqualTo("password");
    }
}
