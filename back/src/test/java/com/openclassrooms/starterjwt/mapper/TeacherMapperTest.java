package com.openclassrooms.starterjwt.mapper;

import com.openclassrooms.starterjwt.dto.TeacherDto;
import com.openclassrooms.starterjwt.models.Teacher;
import org.junit.jupiter.api.Test;
import org.mapstruct.factory.Mappers;

import java.util.Collections;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

public class TeacherMapperTest {

    private final TeacherMapper teacherMapper = Mappers.getMapper(TeacherMapper.class);

    @Test
    void toEntity_shouldMapDtoToEntity() {
        TeacherDto teacherDto = new TeacherDto();
        teacherDto.setId(1L);
        teacherDto.setFirstName("John");
        teacherDto.setLastName("Doe");

        Teacher teacher = teacherMapper.toEntity(teacherDto);

        assertThat(teacher.getId()).isEqualTo(teacherDto.getId());
        assertThat(teacher.getFirstName()).isEqualTo(teacherDto.getFirstName());
        assertThat(teacher.getLastName()).isEqualTo(teacherDto.getLastName());
    }

    @Test
    void toDto_shouldMapEntityToDto() {
        Teacher teacher = new Teacher();
        teacher.setId(1L);
        teacher.setFirstName("John");
        teacher.setLastName("Doe");

        TeacherDto teacherDto = teacherMapper.toDto(teacher);

        assertThat(teacherDto.getId()).isEqualTo(teacher.getId());
        assertThat(teacherDto.getFirstName()).isEqualTo(teacher.getFirstName());
        assertThat(teacherDto.getLastName()).isEqualTo(teacher.getLastName());
    }

    @Test
    void toEntity_withNullDto_shouldReturnNull() {
        assertThat(teacherMapper.toEntity((TeacherDto) null)).isNull();
    }

    @Test
    void toDto_withNullEntity_shouldReturnNull() {
        assertThat(teacherMapper.toDto((Teacher) null)).isNull();
    }

    @Test
    void toEntity_listToEntityList() {
        TeacherDto teacherDto = new TeacherDto();
        teacherDto.setId(1L);
        List<Teacher> teacherList = teacherMapper.toEntity(Collections.singletonList(teacherDto));
        assertThat(teacherList).hasSize(1);
        assertThat(teacherList.get(0).getId()).isEqualTo(1L);
    }

    @Test
    void toDto_listToDtoList() {
        Teacher teacher = new Teacher();
        teacher.setId(1L);
        List<TeacherDto> teacherDtoList = teacherMapper.toDto(Collections.singletonList(teacher));
        assertThat(teacherDtoList).hasSize(1);
        assertThat(teacherDtoList.get(0).getId()).isEqualTo(1L);
    }

    @Test
    void toEntity_nullListShouldReturnNull() {
        assertThat(teacherMapper.toEntity((List<TeacherDto>) null)).isNull();
    }

    @Test
    void toDto_nullListShouldReturnNull() {
        assertThat(teacherMapper.toDto((List<Teacher>) null)).isNull();
    }
}