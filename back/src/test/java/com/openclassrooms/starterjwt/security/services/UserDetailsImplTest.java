package com.openclassrooms.starterjwt.security.services;

import org.junit.jupiter.api.Test;
import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;

import static org.assertj.core.api.Assertions.assertThat;

public class UserDetailsImplTest {

    @Test
    void testUserDetailsImplementation() {
        // Create a UserDetailsImpl instance using the builder
        UserDetailsImpl userDetails = UserDetailsImpl.builder()
                .id(1L)
                .username("test@test.com")
                .firstName("John")
                .lastName("Doe")
                .admin(true)
                .password("password")
                .build();

        // Verify getters
        assertThat(userDetails.getId()).isEqualTo(1L);
        assertThat(userDetails.getUsername()).isEqualTo("test@test.com");
        assertThat(userDetails.getFirstName()).isEqualTo("John");
        assertThat(userDetails.getLastName()).isEqualTo("Doe");
        assertThat(userDetails.getAdmin()).isTrue();
        assertThat(userDetails.getPassword()).isEqualTo("password");

        // Verify account status methods
        assertThat(userDetails.isAccountNonExpired()).isTrue();
        assertThat(userDetails.isAccountNonLocked()).isTrue();
        assertThat(userDetails.isCredentialsNonExpired()).isTrue();
        assertThat(userDetails.isEnabled()).isTrue();

        // Verify authorities (should be empty for this implementation)
        Collection<? extends GrantedAuthority> authorities = userDetails.getAuthorities();
        assertThat(authorities).isNotNull();
        assertThat(authorities).isEmpty();
    }

    @Test
    void testEquals() {
        UserDetailsImpl user1 = UserDetailsImpl.builder().id(1L).username("user1").build();
        UserDetailsImpl user2 = UserDetailsImpl.builder().id(1L).username("user2").build();
        UserDetailsImpl user3 = UserDetailsImpl.builder().id(2L).username("user3").build();
        UserDetailsImpl user4 = UserDetailsImpl.builder().id(1L).username("user1").build();

        // Test equality based on ID
        assertThat(user1).isEqualTo(user2); // Same ID, different username -> should be equal
        assertThat(user1).isNotEqualTo(user3); // Different ID -> should not be equal
        assertThat(user1).isEqualTo(user4); // Identical objects -> should be equal
        
        // Test against null and different class
        assertThat(user1.equals(null)).isFalse();
        assertThat(user1.equals(new Object())).isFalse();
    }
}
