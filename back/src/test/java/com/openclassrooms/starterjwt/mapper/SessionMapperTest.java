package com.openclassrooms.starterjwt.mapper;

import com.openclassrooms.starterjwt.dto.SessionDto;
import com.openclassrooms.starterjwt.models.Session;
import com.openclassrooms.starterjwt.models.Teacher;
import com.openclassrooms.starterjwt.models.User;
import com.openclassrooms.starterjwt.services.TeacherService;
import com.openclassrooms.starterjwt.services.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.Collections;
import java.util.Date;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class SessionMapperTest {

    @Mock
    private TeacherService teacherService;

    @Mock
    private UserService userService;

    @InjectMocks
    private SessionMapper sessionMapper = new SessionMapperImpl();

    private Session session;
    private SessionDto sessionDto;
    private Teacher teacher;
    private User user;

    @BeforeEach
    void setUp() {
        teacher = new Teacher();
        teacher.setId(1L);
        teacher.setFirstName("John");
        teacher.setLastName("Doe");

        user = new User();
        user.setId(1L);
        user.setEmail("test@test.com");

        session = new Session();
        session.setId(1L);
        session.setName("Test Session");
        session.setDate(new Date());
        session.setDescription("Test Description");
        session.setTeacher(teacher);
        session.setUsers(Collections.singletonList(user));

        sessionDto = new SessionDto();
        sessionDto.setId(1L);
        sessionDto.setName("Test Session");
        sessionDto.setDate(new Date());
        sessionDto.setTeacher_id(1L);
        sessionDto.setDescription("Test Description");
        sessionDto.setUsers(Collections.singletonList(1L));
    }

    @Test
    void toEntity_shouldMapFullDtoToEntity() {
        when(teacherService.findById(1L)).thenReturn(teacher);
        when(userService.findById(1L)).thenReturn(user);

        Session mappedSession = sessionMapper.toEntity(sessionDto);

        assertThat(mappedSession.getId()).isEqualTo(sessionDto.getId());
        assertThat(mappedSession.getName()).isEqualTo(sessionDto.getName());
        assertThat(mappedSession.getTeacher().getId()).isEqualTo(teacher.getId());
        assertThat(mappedSession.getUsers()).hasSize(1);
        assertThat(mappedSession.getUsers().get(0).getId()).isEqualTo(user.getId());
    }

    @Test
    void toDto_shouldMapFullEntityToDto() {
        SessionDto mappedDto = sessionMapper.toDto(session);

        assertThat(mappedDto.getId()).isEqualTo(session.getId());
        assertThat(mappedDto.getName()).isEqualTo(session.getName());
        assertThat(mappedDto.getTeacher_id()).isEqualTo(session.getTeacher().getId());
        assertThat(mappedDto.getUsers()).hasSize(1);
        assertThat(mappedDto.getUsers().get(0)).isEqualTo(user.getId());
    }

    @Test
    void toEntity_whenTeacherIdIsNull_shouldMapToNullTeacher() {
        sessionDto.setTeacher_id(null);
        when(userService.findById(1L)).thenReturn(user);

        Session mappedSession = sessionMapper.toEntity(sessionDto);

        assertThat(mappedSession.getTeacher()).isNull();
    }

    @Test
    void toDto_whenTeacherIsNull_shouldMapToNullTeacherId() {
        session.setTeacher(null);

        SessionDto mappedDto = sessionMapper.toDto(session);

        assertThat(mappedDto.getTeacher_id()).isNull();
    }

    @Test
    void toEntity_whenUsersListIsNull_shouldMapToEmptyList() {
        sessionDto.setUsers(null);
        when(teacherService.findById(1L)).thenReturn(teacher);

        Session mappedSession = sessionMapper.toEntity(sessionDto);

        assertThat(mappedSession.getUsers()).isNotNull().isEmpty();
    }

    @Test
    void toDto_whenUsersListIsNull_shouldMapToEmptyList() {
        session.setUsers(null);

        SessionDto mappedDto = sessionMapper.toDto(session);

        assertThat(mappedDto.getUsers()).isNotNull().isEmpty();
    }

    @Test
    void toEntity_whenUserIdNotFound_shouldSkipUser() {
        sessionDto.setUsers(Arrays.asList(1L, 2L));
        when(teacherService.findById(1L)).thenReturn(teacher);
        when(userService.findById(1L)).thenReturn(user);
        when(userService.findById(2L)).thenReturn(null);

        Session mappedSession = sessionMapper.toEntity(sessionDto);

        assertThat(mappedSession.getUsers()).hasSize(2);
        assertThat(mappedSession.getUsers().get(0)).isNotNull();
        assertThat(mappedSession.getUsers().get(1)).isNull();
    }

    @Test
    void toDto_listToDtoList() {
        List<SessionDto> dtoList = sessionMapper.toDto(Collections.singletonList(session));
        assertThat(dtoList).hasSize(1);
        assertThat(dtoList.get(0).getId()).isEqualTo(session.getId());
    }

    @Test
    void toEntity_listToEntityList() {
        when(teacherService.findById(1L)).thenReturn(teacher);
        when(userService.findById(1L)).thenReturn(user);
        List<Session> entityList = sessionMapper.toEntity(Collections.singletonList(sessionDto));
        assertThat(entityList).hasSize(1);
        assertThat(entityList.get(0).getId()).isEqualTo(sessionDto.getId());
    }

    @Test
    void toDto_nullListShouldReturnNull() {
        assertThat(sessionMapper.toDto((List<Session>) null)).isNull();
    }

    @Test
    void toEntity_nullListShouldReturnNull() {
        assertThat(sessionMapper.toEntity((List<SessionDto>) null)).isNull();
    }
}
