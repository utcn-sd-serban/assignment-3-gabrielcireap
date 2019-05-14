package com.gabrielcireap.stackOverflow.service;

import com.gabrielcireap.stackOverflow.dto.TagDTO;
import com.gabrielcireap.stackOverflow.entity.Tag;
import com.gabrielcireap.stackOverflow.repository.RepositoryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TagManagementService {

    private final RepositoryFactory repositoryFactory;
    private final UserManagementService userManagementService;

    @Transactional
    public TagDTO save(TagDTO tagDTO){
        Tag tag = new Tag();
        tag.setName(tagDTO.getName());
        tag.setId(repositoryFactory.createTagRepository().save(tag).getId());
        return TagDTO.ofEntity(tag);
    }

    @Transactional
    public List<TagDTO> listTags(){
        userManagementService.checkIfUserIsLogged();
        return repositoryFactory.createTagRepository().findAll().stream().map(TagDTO::ofEntity).collect(Collectors.toList());
    }
}
