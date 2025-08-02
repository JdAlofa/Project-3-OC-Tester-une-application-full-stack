package com.openclassrooms.starterjwt.models;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.time.LocalDateTime;

import static org.junit.jupiter.api.Assertions.*;

public class TeacherTest {

    private Teacher teacher1;
    private Teacher teacher2;
    private final LocalDateTime fixedDateTime = LocalDateTime.of(2025, 8, 2, 1, 0);

    @BeforeEach
    public void setUp() {
        teacher1 = new Teacher(1L, "Doe", "John", fixedDateTime, fixedDateTime);
        teacher2 = new Teacher(1L, "Smith", "Jane", fixedDateTime, fixedDateTime);
    }

    @Test
    public void testNoArgsConstructor() {
        Teacher teacher = new Teacher();
        assertNull(teacher.getId());
    }

    @Test
    public void testAllArgsConstructor() {
        assertEquals(1L, teacher1.getId());
        assertEquals("Doe", teacher1.getLastName());
        assertEquals("John", teacher1.getFirstName());
        assertEquals(fixedDateTime, teacher1.getCreatedAt());
        assertEquals(fixedDateTime, teacher1.getUpdatedAt());
    }

    @Test
    public void testEquals_SameId() {
        assertTrue(teacher1.equals(teacher2));
    }

    @Test
    public void testEquals_DifferentId() {
        teacher2.setId(2L);
        assertFalse(teacher1.equals(teacher2));
    }

    @Test
    public void testEquals_NullId() {
        teacher1.setId(null);
        teacher2.setId(null);
        assertTrue(teacher1.equals(teacher2));
    }

    @Test
    public void testEquals_OneNullId() {
        teacher1.setId(null);
        assertFalse(teacher1.equals(teacher2));
        assertFalse(teacher2.equals(teacher1));
    }

    @Test
    public void testEquals_SameInstance() {
        assertTrue(teacher1.equals(teacher1));
    }

    @Test
    public void testEquals_NullObject() {
        assertFalse(teacher1.equals(null));
    }

    @Test
    public void testEquals_DifferentClass() {
        assertFalse(teacher1.equals(new Object()));
    }

    @Test
    public void testHashCode_SameId() {
        assertEquals(teacher1.hashCode(), teacher2.hashCode());
    }

    @Test
    public void testHashCode_DifferentId() {
        teacher2.setId(2L);
        assertNotEquals(teacher1.hashCode(), teacher2.hashCode());
    }

    @Test
    public void testHashCode_NullId() {
        teacher1.setId(null);
        teacher2.setId(null);
        assertEquals(teacher1.hashCode(), teacher2.hashCode());
    }

    @Test
    public void testToString() {
        String expected = "Teacher(id=1, lastName=Doe, firstName=John, createdAt=" + fixedDateTime + ", updatedAt=" + fixedDateTime + ")";
        assertEquals(expected, teacher1.toString());
    }

    @Test
    public void testBuilder() {
        Teacher teacher = Teacher.builder()
                .id(1L)
                .lastName("Doe")
                .firstName("John")
                .createdAt(fixedDateTime)
                .updatedAt(fixedDateTime)
                .build();

        assertEquals(1L, teacher.getId());
        assertEquals("Doe", teacher.getLastName());
        assertEquals("John", teacher.getFirstName());
        assertEquals(fixedDateTime, teacher.getCreatedAt());
        assertEquals(fixedDateTime, teacher.getUpdatedAt());
    }
    
    @Test
    public void testSetters() {
        Teacher teacher = new Teacher();
        teacher.setId(1L);
        teacher.setLastName("Doe");
        teacher.setFirstName("John");
        teacher.setCreatedAt(fixedDateTime);
        teacher.setUpdatedAt(fixedDateTime);

        assertEquals(1L, teacher.getId());
        assertEquals("Doe", teacher.getLastName());
        assertEquals("John", teacher.getFirstName());
        assertEquals(fixedDateTime, teacher.getCreatedAt());
        assertEquals(fixedDateTime, teacher.getUpdatedAt());
    }
}
