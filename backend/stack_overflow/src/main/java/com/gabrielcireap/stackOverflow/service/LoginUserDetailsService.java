package com.gabrielcireap.stackOverflow.service;

import com.gabrielcireap.stackOverflow.entity.User;
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

    @Override
    public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {
        User user = repositoryFactory.createUserRepository().findUserByUsername(s)
                .orElseThrow(() -> new UsernameNotFoundException("User not found!"));
        String role = user.getIsAdmin() == true ? "ROLE_ADMIN" : "ROLE_USER";
        return new org.springframework.security.core.userdetails.User(
                user.getUsername(), user.getPassword(),
                Collections.singletonList(new SimpleGrantedAuthority(role))
        );
    }
}
