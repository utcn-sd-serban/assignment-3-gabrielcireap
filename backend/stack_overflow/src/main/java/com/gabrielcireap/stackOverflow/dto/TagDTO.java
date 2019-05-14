package com.gabrielcireap.stackOverflow.dto;

import com.gabrielcireap.stackOverflow.entity.Tag;
import lombok.Data;

@Data
public class TagDTO {
    //momentan nu e folosita clasa asta
    private String name;

    public static TagDTO ofEntity(Tag tag){
        TagDTO tagDTO = new TagDTO();
        tagDTO.setName(tag.getName());

        return tagDTO;
    }
}
