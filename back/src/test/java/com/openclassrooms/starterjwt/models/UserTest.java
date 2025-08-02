package com.openclassrooms.starterjwt.models;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.time.LocalDateTime;

import static org.junit.jupiter.api.Assertions.*;

public class UserTest {

    private User user1;
    private User user2;
    private final LocalDateTime fixedDateTime = LocalDateTime.of(2025, 8, 2, 1, 0);

    @BeforeEach
    public void setUp() {
        user1 = new User(1L, "test@test.com", "Doe", "John", "password123", false, fixedDateTime, fixedDateTime);
        user2 = new User(1L, "test2@test.com", "Smith", "Jane", "password456", true, fixedDateTime, fixedDateTime);
    }

    @Test
    public void testNoArgsConstructor() {
        User user = new User();
        assertNull(user.getId());
    }

    @Test
    public void testAllArgsConstructor() {
        assertEquals(1L, user1.getId());
        assertEquals("test@test.com", user1.getEmail());
        assertEquals("Doe", user1.getLastName());
        assertEquals("John", user1.getFirstName());
        assertEquals("password123", user1.getPassword());
        assertFalse(user1.isAdmin());
        assertEquals(fixedDateTime, user1.getCreatedAt());
        assertEquals(fixedDateTime, user1.getUpdatedAt());
    }

    @Test
    public void testRequiredArgsConstructor() {
        User user = new User("test@test.com", "Doe", "John", "password", true);
        assertEquals("test@test.com", user.getEmail());
        assertEquals("Doe", user.getLastName());
        assertEquals("John", user.getFirstName());
        assertEquals("password", user.getPassword());
        assertTrue(user.isAdmin());
    }

    @Test
    public void testRequiredArgsConstructor_NullValues() {
        assertThrows(NullPointerException.class, () -> new User(null, "Doe", "John", "password", true));
        assertThrows(NullPointerException.class, () -> new User("test@test.com", null, "John", "password", true));
        assertThrows(NullPointerException.class, () -> new User("test@test.com", "Doe", null, "password", true));
        assertThrows(NullPointerException.class, () -> new User("test@test.com", "Doe", "John", null, true));
    }

    @Test
    public void testEquals_SameId() {
        assertTrue(user1.equals(user2));
    }

    @Test
    public void testEquals_DifferentId() {
        user2.setId(2L);
        assertFalse(user1.equals(user2));
    }

    @Test
    public void testEquals_NullId() {
        user1.setId(null);
        user2.setId(null);
        assertTrue(user1.equals(user2));
    }

    @Test
    public void testEquals_OneNullId() {
        user1.setId(null);
        assertFalse(user1.equals(user2));
        assertFalse(user2.equals(user1));
    }

    @Test
    public void testEquals_SameInstance() {
        assertTrue(user1.equals(user1));
    }

    @Test
    public void testEquals_NullObject() {
        assertFalse(user1.equals(null));
    }

    @Test
    public void testEquals_DifferentClass() {
        assertFalse(user1.equals(new Object()));
    }

    @Test
    public void testHashCode_SameId() {
        assertEquals(user1.hashCode(), user2.hashCode());
    }

    @Test
    public void testHashCode_DifferentId() {
        user2.setId(2L);
        assertNotEquals(user1.hashCode(), user2.hashCode());
    }

    @Test
    public void testHashCode_NullId() {
        user1.setId(null);
        user2.setId(null);
        assertEquals(user1.hashCode(), user2.hashCode());
    }

    @Test
    public void testToString() {
        String expected = "User(id=1, email=test@test.com, lastName=Doe, firstName=John, password=password123, admin=false, createdAt=" + fixedDateTime + ", updatedAt=" + fixedDateTime + ")";
        assertEquals(expected, user1.toString());
    }

    @Test
    public void testBuilder() {
        User user = User.builder()
                .id(1L)
                .email("test@test.com")
                .lastName("Doe")
                .firstName("John")
                .password("password")
                .admin(true)
                .createdAt(fixedDateTime)
                .updatedAt(fixedDateTime)
                .build();

        assertEquals(1L, user.getId());
        assertEquals("test@test.com", user.getEmail());
        assertEquals("Doe", user.getLastName());
        assertEquals("John", user.getFirstName());
        assertEquals("password", user.getPassword());
        assertTrue(user.isAdmin());
        assertEquals(fixedDateTime, user.getCreatedAt());
        assertEquals(fixedDateTime, user.getUpdatedAt());
    }
    
    @Test
    public void testSetters() {
        User user = new User();
        user.setId(1L);
        user.setEmail("test@test.com");
        user.setLastName("Doe");
        user.setFirstName("John");
        user.setPassword("password");
        user.setAdmin(true);
        user.setCreatedAt(fixedDateTime);
        user.setUpdatedAt(fixedDateTime);

        assertEquals(1L, user.getId());
        assertEquals("test@test.com", user.getEmail());
        assertEquals("Doe", user.getLastName());
        assertEquals("John", user.getFirstName());
        assertEquals("password", user.getPassword());
        assertTrue(user.isAdmin());
        assertEquals(fixedDateTime, user.getCreatedAt());
        assertEquals(fixedDateTime, user.getUpdatedAt());
    }
}