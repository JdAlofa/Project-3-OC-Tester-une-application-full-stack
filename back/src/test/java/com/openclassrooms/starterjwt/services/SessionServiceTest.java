package com.openclassrooms.starterjwt.services;

import com.openclassrooms.starterjwt.exception.BadRequestException;
import com.openclassrooms.starterjwt.exception.NotFoundException;
import com.openclassrooms.starterjwt.models.Session;
import com.openclassrooms.starterjwt.models.User;
import com.openclassrooms.starterjwt.repository.SessionRepository;
import com.openclassrooms.starterjwt.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class SessionServiceTest {

    @InjectMocks
    private SessionService sessionService;

    @Mock
    private SessionRepository sessionRepository;

    @Mock
    private UserRepository userRepository;

    private Session session;
    private User user;

    @BeforeEach
    void setUp() {
        session = new Session();
        session.setId(1L);
        session.setUsers(new ArrayList<>());

        user = new User();
        user.setId(1L);
    }

    @Test
    void create_shouldCreateSession() {
        when(sessionRepository.save(session)).thenReturn(session);
        Session createdSession = sessionService.create(session);
        assertThat(createdSession).isEqualTo(session);
    }

    @Test
    void delete_shouldDeleteSession() {
        sessionService.delete(1L);
        verify(sessionRepository).deleteById(1L);
    }

    @Test
    void findAll_shouldReturnAllSessions() {
        when(sessionRepository.findAll()).thenReturn(Collections.singletonList(session));
        List<Session> sessions = sessionService.findAll();
        assertThat(sessions).containsExactly(session);
    }

    @Test
    void getById_shouldReturnSession() {
        when(sessionRepository.findById(1L)).thenReturn(Optional.of(session));
        Session foundSession = sessionService.getById(1L);
        assertThat(foundSession).isEqualTo(session);
    }

    @Test
    void getById_shouldReturnNull() {
        when(sessionRepository.findById(1L)).thenReturn(Optional.empty());
        Session foundSession = sessionService.getById(1L);
        assertThat(foundSession).isNull();
    }

    @Test
    void update_shouldUpdateSession() {
        when(sessionRepository.save(session)).thenReturn(session);
        Session updatedSession = sessionService.update(1L, session);
        assertThat(updatedSession).isEqualTo(session);
    }

    @Test
    void participate_shouldParticipateInSession() {
        when(sessionRepository.findById(1L)).thenReturn(Optional.of(session));
        when(userRepository.findById(1L)).thenReturn(Optional.of(user));

        sessionService.participate(1L, 1L);

        assertThat(session.getUsers()).contains(user);
    }

    @Test
    void participate_shouldThrowNotFoundException_whenSessionNotFound() {
        when(sessionRepository.findById(1L)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> sessionService.participate(1L, 1L))
                .isInstanceOf(NotFoundException.class);
    }

    @Test
    void participate_shouldThrowBadRequestException_whenAlreadyParticipating() {
        session.getUsers().add(user);
        when(sessionRepository.findById(1L)).thenReturn(Optional.of(session));
        when(userRepository.findById(1L)).thenReturn(Optional.of(user));

        assertThatThrownBy(() -> sessionService.participate(1L, 1L))
                .isInstanceOf(BadRequestException.class);
    }

    @Test
    void noLongerParticipate_shouldNoLongerParticipateInSession() {
        session.getUsers().add(user);
        when(sessionRepository.findById(1L)).thenReturn(Optional.of(session));

        sessionService.noLongerParticipate(1L, 1L);

        assertThat(session.getUsers()).doesNotContain(user);
    }

    @Test
    void noLongerParticipate_shouldThrowNotFoundException_whenSessionNotFound() {
        when(sessionRepository.findById(1L)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> sessionService.noLongerParticipate(1L, 1L))
                .isInstanceOf(NotFoundException.class);
    }

    @Test
    void noLongerParticipate_shouldThrowBadRequestException_whenNotParticipating() {
        when(sessionRepository.findById(1L)).thenReturn(Optional.of(session));

        assertThatThrownBy(() -> sessionService.noLongerParticipate(1L, 1L))
                .isInstanceOf(BadRequestException.class);
    }
}
