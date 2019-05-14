package com.gabrielcireap.stackOverflow.service;

import com.gabrielcireap.stackOverflow.dto.UserRegisterDTO;
import com.gabrielcireap.stackOverflow.dto.UserShowDTO;
import com.gabrielcireap.stackOverflow.entity.User;
import com.gabrielcireap.stackOverflow.exception.BannedUserException;
import com.gabrielcireap.stackOverflow.exception.NotEnoughPermissionsException;
import com.gabrielcireap.stackOverflow.exception.UserNotFoundException;
import com.gabrielcireap.stackOverflow.exception.UserNotLoggedInException;
import com.gabrielcireap.stackOverflow.repository.RepositoryFactory;
import com.gabrielcireap.stackOverflow.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserManagementService {

    private final RepositoryFactory repositoryFactory;
    private User currentUser = new User(1, "user1", "pass1", "email1", 0, true, false);

    @Transactional
    public List<UserShowDTO> listUsers() {
        return repositoryFactory.createUserRepository().findAll().stream().map(UserShowDTO::ofEntity).collect(Collectors.toList());
    }

    @Transactional
    public void remove(int userId) {
        UserRepository userRepository = repositoryFactory.createUserRepository();
        User user = userRepository.findById(userId).orElseThrow(UserNotFoundException::new);
        userRepository.remove(user);
    }

    /*@Transactional
    public UserDTO save(String username, String password, String email) {
        Optional<UserDTO> user = listUsers().stream().filter(user1 -> user1.getEmail().equals(email) || user1.getUsername().equals(username)).findFirst();
        if (user.isPresent()) {
            throw new DuplicateUserException();
        }
        return UserDTO.ofEntity(repositoryFactory.createUserRepository().save(new User(username, password, email)));
    }*/

    @Transactional
    public UserShowDTO save(UserRegisterDTO userDTO) {
        return UserShowDTO.ofEntity(repositoryFactory.createUserRepository().save(UserRegisterDTO.newEntity(userDTO)));
    }

    @Transactional
    public UserShowDTO save(UserShowDTO userDTO) {
        User user = new User();
        user.setUsername(userDTO.getUsername());
        user.setScore(userDTO.getScore());
        user.setIsAdmin(userDTO.getIsAdmin());
        user.setIsBanned(userDTO.getIsBanned());
        user.setId(repositoryFactory.createUserRepository().save(user).getId());
        return UserShowDTO.ofEntity(user);
    }

    @Transactional
    public UserShowDTO findById(int id) {
        return UserShowDTO.ofEntity(repositoryFactory.createUserRepository().findById(id).orElseThrow(UserNotFoundException::new));
    }

    @Transactional
    public UserShowDTO login(UserRegisterDTO userRegisterDTO) {

        User user = repositoryFactory.createUserRepository().findUserByLogin(userRegisterDTO.getUsername(), userRegisterDTO.getPassword()).orElseThrow(UserNotFoundException::new);
        if (user.getIsBanned()) {
            currentUser = null;
            throw new BannedUserException();
        } else {
            currentUser = user;
        }
        return UserShowDTO.ofEntity(user);
    }

    @Transactional
    public void logout() {
        currentUser = null;
    }

    public UserShowDTO ban(int userId) {
        checkIfUserIsLogged();
        if (!currentUser.getIsAdmin()) {
            throw new NotEnoughPermissionsException();
        }

        UserShowDTO user = findById(userId);
        user.setIsBanned(true);
        save(user);
        return user;
    }

    @Transactional
    public void checkIfUserIsLogged() {
        if (currentUser == null) {
            throw new UserNotLoggedInException();
        }
    }

    @Transactional
    public User getLoggedUser() {
        return currentUser;
    }
}
