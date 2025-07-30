package com.openclassrooms.starterjwt.mapper;

import com.openclassrooms.starterjwt.dto.UserDto;
import com.openclassrooms.starterjwt.models.User;
import org.junit.jupiter.api.Test;
import org.mapstruct.factory.Mappers;

import java.util.Collections;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

public class UserMapperTest {

    private final UserMapper userMapper = Mappers.getMapper(UserMapper.class);

    @Test
    void toEntity_shouldMapDtoToEntity() {
        UserDto userDto = new UserDto();
        userDto.setId(1L);
        userDto.setEmail("test@test.com");
        userDto.setFirstName("John");
        userDto.setLastName("Doe");
        userDto.setAdmin(true);
        userDto.setPassword("password");

        User user = userMapper.toEntity(userDto);

        assertThat(user.getId()).isEqualTo(userDto.getId());
        assertThat(user.getEmail()).isEqualTo(userDto.getEmail());
        assertThat(user.getFirstName()).isEqualTo(userDto.getFirstName());
        assertThat(user.getLastName()).isEqualTo(userDto.getLastName());
        assertThat(user.isAdmin()).isEqualTo(userDto.isAdmin());
        assertThat(user.getPassword()).isEqualTo(userDto.getPassword());
    }

    @Test
    void toDto_shouldMapEntityToDto() {
        User user = new User();
        user.setId(1L);
        user.setEmail("test@test.com");
        user.setFirstName("John");
        user.setLastName("Doe");
        user.setAdmin(true);
        user.setPassword("password");

        UserDto userDto = userMapper.toDto(user);

        assertThat(userDto.getId()).isEqualTo(user.getId());
        assertThat(userDto.getEmail()).isEqualTo(user.getEmail());
        assertThat(userDto.getFirstName()).isEqualTo(user.getFirstName());
        assertThat(userDto.getLastName()).isEqualTo(user.getLastName());
        assertThat(userDto.isAdmin()).isEqualTo(user.isAdmin());
        assertThat(userDto.getPassword()).isEqualTo(user.getPassword());
    }

    @Test
    void toEntity_withNullDto_shouldReturnNull() {
        assertThat(userMapper.toEntity((UserDto) null)).isNull();
    }

    @Test
    void toDto_withNullEntity_shouldReturnNull() {
        assertThat(userMapper.toDto((User) null)).isNull();
    }

    @Test
    void toEntity_listToEntityList() {
        UserDto userDto = new UserDto();
        userDto.setId(1L);
        userDto.setEmail("test@test.com");
        userDto.setFirstName("John");
        userDto.setLastName("Doe");
        userDto.setPassword("password");
        List<User> userList = userMapper.toEntity(Collections.singletonList(userDto));
        assertThat(userList).hasSize(1);
        assertThat(userList.get(0).getId()).isEqualTo(1L);
    }

    @Test
    void toDto_listToDtoList() {
        User user = new User();
        user.setId(1L);
        user.setEmail("test@test.com");
        user.setFirstName("John");
        user.setLastName("Doe");
        user.setPassword("password");
        List<UserDto> userDtoList = userMapper.toDto(Collections.singletonList(user));
        assertThat(userDtoList).hasSize(1);
        assertThat(userDtoList.get(0).getId()).isEqualTo(1L);
    }

    @Test
    void toEntity_nullListShouldReturnNull() {
        assertThat(userMapper.toEntity((List<UserDto>) null)).isNull();
    }

    @Test
    void toDto_nullListShouldReturnNull() {
        assertThat(userMapper.toDto((List<User>) null)).isNull();
    }
}
