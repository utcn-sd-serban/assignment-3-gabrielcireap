package com.gabrielcireap.stackOverflow.service;

import com.gabrielcireap.stackOverflow.entity.User;
import com.gabrielcireap.stackOverflow.exception.BannedUserException;
import com.gabrielcireap.stackOverflow.repository.RepositoryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
@RequiredArgsConstructor
public class LoginUserDetailsService implements UserDetailsService {

    private final RepositoryFactory repositoryFactory;
    private final UserManagementService userManagementService;

    @Override
    public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException, BannedUserException {
        User user = repositoryFactory.createUserRepository().findUserByUsername(s)
                .orElseThrow(() -> new UsernameNotFoundException("User not found!"));

        userManagementService.login(user);
        String role = user.getIsAdmin() == true ? "ROLE_ADMIN" : "ROLE_USER";
        return new org.springframework.security.core.userdetails.User(
                user.getUsername(), user.getPassword(),
                Collections.singletonList(new SimpleGrantedAuthority(role))
        );
    }
}
