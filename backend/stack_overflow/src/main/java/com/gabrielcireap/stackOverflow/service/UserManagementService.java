package com.gabrielcireap.stackOverflow.service;

import com.gabrielcireap.stackOverflow.dto.UserShowDTO;
import com.gabrielcireap.stackOverflow.entity.User;
import com.gabrielcireap.stackOverflow.event.UserCreatedEvent;
import com.gabrielcireap.stackOverflow.event.UserUpdatedEvent;
import com.gabrielcireap.stackOverflow.event.UsersLoadedEvent;
import com.gabrielcireap.stackOverflow.exception.DuplicateUserException;
import com.gabrielcireap.stackOverflow.exception.NotEnoughPermissionsException;
import com.gabrielcireap.stackOverflow.exception.UserNotFoundException;
import com.gabrielcireap.stackOverflow.repository.RepositoryFactory;
import com.gabrielcireap.stackOverflow.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserManagementService {

    private final RepositoryFactory repositoryFactory;
    private final ApplicationEventPublisher eventPublisher;
    private User currentUser;

    @Transactional
    public List<UserShowDTO> listUsers() {
        List<UserShowDTO> users = repositoryFactory.createUserRepository().findAll().stream().map(UserShowDTO::ofEntity).collect(Collectors.toList());
        eventPublisher.publishEvent(new UsersLoadedEvent(users));
        return users;
    }

    @Transactional
    public void remove(int userId) {
        UserRepository userRepository = repositoryFactory.createUserRepository();
        User user = userRepository.findById(userId).orElseThrow(UserNotFoundException::new);
        userRepository.remove(user);
    }

    @Transactional
    public UserShowDTO save(String username, String password, String email) {
        List<User> users = repositoryFactory.createUserRepository().findAll().stream()
                .filter(user -> user.getEmail().equals(email) || user.getUsername().equals(username))
                .collect(Collectors.toList());

        if (!users.isEmpty()) {
            throw new DuplicateUserException();
        }

        UserShowDTO user = UserShowDTO.ofEntity(repositoryFactory.createUserRepository().save(new User(username, password, email)));
        eventPublisher.publishEvent(new UserCreatedEvent(user));
        return user;
    }

    @Transactional
    public UserShowDTO save(UserShowDTO userDTO) {
        User user = repositoryFactory.createUserRepository().findById(userDTO.getId()).orElseThrow(UserNotFoundException::new);
        user.setScore(userDTO.getScore());
        user.setIsAdmin(userDTO.getIsAdmin());
        user.setIsBanned(userDTO.getIsBanned());
        UserShowDTO userShowDTO = UserShowDTO.ofEntity(repositoryFactory.createUserRepository().save(user));
        eventPublisher.publishEvent(new UserUpdatedEvent(userShowDTO));
        return userShowDTO;
    }

    @Transactional
    public UserShowDTO findById(int id) {
        return UserShowDTO.ofEntity(repositoryFactory.createUserRepository().findById(id).orElseThrow(UserNotFoundException::new));
    }

    @Transactional
    public void login(User user) {
        this.currentUser = user;
    }

    @Transactional
    public void logout() {
        currentUser = null;
    }

    public UserShowDTO ban(int userId) {
        if (!currentUser.getIsAdmin()) {
            throw new NotEnoughPermissionsException();
        }

        UserShowDTO user = findById(userId);
        user.setIsBanned(true);
        save(user);
        eventPublisher.publishEvent(new UserUpdatedEvent(user));
        return user;
    }

    @Transactional
    public User getLoggedUser() {
        return currentUser;
    }
}
