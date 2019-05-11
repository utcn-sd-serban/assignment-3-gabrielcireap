package com.gabrielcireap.stackOverflow.repository.memory;

import com.gabrielcireap.stackOverflow.entity.User;
import com.gabrielcireap.stackOverflow.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.stream.Collectors;

public class InMemoryUserRepository implements UserRepository {

    private final Map<Integer, User> data = new ConcurrentHashMap<>();
    private final AtomicInteger currentId = new AtomicInteger(0);

    @Override
    public User save(User user){
        if(user.getId() == null){
            user.setId(currentId.incrementAndGet());
        }
        data.put(user.getId(), user);
        return user;
    }

    @Override
    public void remove(User user){
        data.remove(user.getId());
    }

    @Override
    public Optional<User> findById(int id){
        return Optional.ofNullable(data.get(id));
    }

    @Override
    public List<User> findAll(){
        return new ArrayList<>(data.values());
    }

    @Override
    public Optional<User> findUserByLogin(String username, String password) {
        System.out.println(data.values());
        List<User> u =  data.values().stream().filter(user -> user.getUsername().equals(username) && user.getPassword().equals(password)).collect(Collectors.toList());
        System.out.println(u);
        return Optional.ofNullable(u.get(0));
    }

    @Override
    public Optional<User> findUserByUsername(String username) {
        return data.values().stream().filter(user -> user.getUsername().equals(username)).findFirst();
    }
}