package com.openclassrooms.starterjwt.services;

import com.openclassrooms.starterjwt.models.Teacher;
import com.openclassrooms.starterjwt.repository.TeacherRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class TeacherServiceTest {

    @InjectMocks
    private TeacherService teacherService;

    @Mock
    private TeacherRepository teacherRepository;

    private Teacher teacher;

    @BeforeEach
    void setUp() {
        teacher = new Teacher();
        teacher.setId(1L);
        teacher.setFirstName("John");
        teacher.setLastName("Doe");
    }

    @Test
    void findAll_shouldReturnAllTeachers() {
        when(teacherRepository.findAll()).thenReturn(Collections.singletonList(teacher));
        List<Teacher> teachers = teacherService.findAll();
        assertThat(teachers).containsExactly(teacher);
    }

    @Test
    void findById_shouldReturnTeacher() {
        when(teacherRepository.findById(1L)).thenReturn(Optional.of(teacher));
        Teacher foundTeacher = teacherService.findById(1L);
        assertThat(foundTeacher).isEqualTo(teacher);
    }

    @Test
    void findById_shouldReturnNull() {
        when(teacherRepository.findById(1L)).thenReturn(Optional.empty());
        Teacher foundTeacher = teacherService.findById(1L);
        assertThat(foundTeacher).isNull();
    }
}
