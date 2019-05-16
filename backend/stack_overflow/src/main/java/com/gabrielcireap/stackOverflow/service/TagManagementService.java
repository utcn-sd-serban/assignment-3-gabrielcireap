package com.gabrielcireap.stackOverflow.service;

import com.gabrielcireap.stackOverflow.dto.TagDTO;
import com.gabrielcireap.stackOverflow.entity.Tag;
import com.gabrielcireap.stackOverflow.repository.RepositoryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@RequiredArgsConstructor
public class TagManagementService {

    private final RepositoryFactory repositoryFactory;
    private final UserManagementService userManagementService;

    @Transactional
    public TagDTO save(TagDTO tagDTO) {
        Tag tag = new Tag();
        tag.setName(tagDTO.getName());
        tag.setId(repositoryFactory.createTagRepository().save(tag).getId());
        return TagDTO.ofEntity(tag);
    }
}
