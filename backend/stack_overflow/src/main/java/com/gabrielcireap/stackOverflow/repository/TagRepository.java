package com.gabrielcireap.stackOverflow.repository;

import com.gabrielcireap.stackOverflow.entity.Tag;

import java.util.List;
import java.util.Optional;

public interface TagRepository {

    List<Tag> findAll();
    Tag save(Tag tag);
    void remove(Tag tag);
    Optional<Tag> findById(int id);
    Optional<Tag> findByName(String name);
}
