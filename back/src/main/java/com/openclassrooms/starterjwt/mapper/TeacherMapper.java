package com.openclassrooms.starterjwt.mapper;

import com.openclassrooms.starterjwt.dto.TeacherDto;
import com.openclassrooms.starterjwt.models.Teacher;
import org.mapstruct.Mapper;


@Mapper(componentModel = "spring")
public interface TeacherMapper extends EntityMapper<TeacherDto, Teacher> {
}
