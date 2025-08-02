package com.openclassrooms.starterjwt.payload.request;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

public class SignupRequestTest {

    private SignupRequest request1;
    private SignupRequest request2;

    @BeforeEach
    public void setUp() {
        request1 = new SignupRequest();
        request1.setEmail("test@test.com");
        request1.setFirstName("John");
        request1.setLastName("Doe");
        request1.setPassword("password123");

        request2 = new SignupRequest();
        request2.setEmail("test@test.com");
        request2.setFirstName("John");
        request2.setLastName("Doe");
        request2.setPassword("password123");
    }

    @Test
    public void testEquals_Symmetric() {
        assertTrue(request1.equals(request2) && request2.equals(request1));
    }

    @Test
    public void testEquals_SameInstance() {
        assertTrue(request1.equals(request1));
    }

    @Test
    public void testEquals_Null() {
        assertFalse(request1.equals(null));
    }

    @Test
    public void testEquals_DifferentClass() {
        assertFalse(request1.equals(new Object()));
    }

    @Test
    public void testEquals_DifferentEmail() {
        request2.setEmail("different@test.com");
        assertFalse(request1.equals(request2));
    }

    @Test
    public void testEquals_DifferentFirstName() {
        request2.setFirstName("Jane");
        assertFalse(request1.equals(request2));
    }

    @Test
    public void testEquals_DifferentLastName() {
        request2.setLastName("Smith");
        assertFalse(request1.equals(request2));
    }

    @Test
    public void testEquals_DifferentPassword() {
        request2.setPassword("differentPassword");
        assertFalse(request1.equals(request2));
    }

    @Test
    public void testEquals_NullEmail() {
        request1.setEmail(null);
        assertFalse(request1.equals(request2));
        request2.setEmail(null);
        assertTrue(request1.equals(request2));
    }

    @Test
    public void testEquals_NullFirstName() {
        request1.setFirstName(null);
        assertFalse(request1.equals(request2));
        request2.setFirstName(null);
        assertTrue(request1.equals(request2));
    }

    @Test
    public void testEquals_NullLastName() {
        request1.setLastName(null);
        assertFalse(request1.equals(request2));
        request2.setLastName(null);
        assertTrue(request1.equals(request2));
    }

    @Test
    public void testEquals_NullPassword() {
        request1.setPassword(null);
        assertFalse(request1.equals(request2));
        request2.setPassword(null);
        assertTrue(request1.equals(request2));
    }

    @Test
    public void testHashCode_Consistent() {
        int initialHashCode = request1.hashCode();
        assertEquals(initialHashCode, request1.hashCode());
    }

    @Test
    public void testHashCode_EqualsObjects() {
        assertEquals(request1.hashCode(), request2.hashCode());
    }

    @Test
    public void testHashCode_NotEqualsObjects() {
        request2.setEmail("different@test.com");
        assertNotEquals(request1.hashCode(), request2.hashCode());
    }
    
    @Test
    public void testHashCode_NullFields() {
        SignupRequest r1 = new SignupRequest();
        SignupRequest r2 = new SignupRequest();
        assertEquals(r1.hashCode(), r2.hashCode());

        r1.setEmail("test@test.com");
        assertNotEquals(r1.hashCode(), r2.hashCode());
        r2.setEmail("test@test.com");
        assertEquals(r1.hashCode(), r2.hashCode());
    }

    @Test
    public void testToString() {
        String expectedToString = "SignupRequest(email=test@test.com, firstName=John, lastName=Doe, password=password123)";
        assertEquals(expectedToString, request1.toString());
    }
    
    @Test
    public void testToString_NullFields() {
        SignupRequest request = new SignupRequest();
        String expectedToString = "SignupRequest(email=null, firstName=null, lastName=null, password=null)";
        assertEquals(expectedToString, request.toString());
    }
}