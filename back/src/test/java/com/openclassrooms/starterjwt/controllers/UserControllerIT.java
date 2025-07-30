package com.openclassrooms.starterjwt.controllers;

import com.openclassrooms.starterjwt.dto.UserDto;
import com.openclassrooms.starterjwt.mapper.UserMapper;
import com.openclassrooms.starterjwt.models.User;
import com.openclassrooms.starterjwt.services.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
public class UserControllerIT {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private UserService userService;

    @MockBean
    private UserMapper userMapper;

    private User user;
    private UserDto userDto;

    @BeforeEach
    void setUp() {
        user = new User();
        user.setId(1L);
        user.setEmail("test@test.com");

        userDto = new UserDto();
        userDto.setId(1L);
        userDto.setEmail("test@test.com");
    }

    @Test
    @WithMockUser
    void findById_shouldReturnUser() throws Exception {
        when(userService.findById(1L)).thenReturn(user);
        when(userMapper.toDto(user)).thenReturn(userDto);

        mockMvc.perform(get("/api/user/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1L));
    }

    @Test
    @WithMockUser
    void findById_shouldReturnNotFound() throws Exception {
        when(userService.findById(1L)).thenReturn(null);

        mockMvc.perform(get("/api/user/1"))
                .andExpect(status().isNotFound());
    }

    @Test
    @WithMockUser
    void findById_shouldReturnBadRequest() throws Exception {
        mockMvc.perform(get("/api/user/abc"))
                .andExpect(status().isBadRequest());
    }

    @Test
    @WithMockUser(username = "test@test.com")
    void delete_shouldDeleteUser() throws Exception {
        when(userService.findById(1L)).thenReturn(user);

        mockMvc.perform(delete("/api/user/1"))
                .andExpect(status().isOk());
    }

    @Test
    @WithMockUser(username = "other@test.com")
    void delete_shouldReturnUnauthorized() throws Exception {
        when(userService.findById(1L)).thenReturn(user);

        mockMvc.perform(delete("/api/user/1"))
                .andExpect(status().isUnauthorized());
    }

    @Test
    @WithMockUser
    void delete_shouldReturnNotFound() throws Exception {
        when(userService.findById(1L)).thenReturn(null);

        mockMvc.perform(delete("/api/user/1"))
                .andExpect(status().isNotFound());
    }

    @Test
    @WithMockUser
    void delete_shouldReturnBadRequest() throws Exception {
        mockMvc.perform(delete("/api/user/abc"))
                .andExpect(status().isBadRequest());
    }
}
