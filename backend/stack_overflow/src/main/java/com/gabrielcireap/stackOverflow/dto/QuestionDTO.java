package com.gabrielcireap.stackOverflow.dto;

import com.gabrielcireap.stackOverflow.entity.Question;
import com.gabrielcireap.stackOverflow.entity.Tag;
import lombok.Data;
import org.springframework.util.CollectionUtils;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Data
public class QuestionDTO {

    private Integer id;
    private UserShowDTO user;
    private String title;
    private String text;
    private Timestamp creationDate;
    private Integer voteCount;
    private List<String> tags;

    public static QuestionDTO ofEntity(Question question) {
        QuestionDTO questionDTO = new QuestionDTO();
        questionDTO.setId(question.getId());
        questionDTO.setTitle(question.getTitle());
        questionDTO.setText(question.getText());
        questionDTO.setCreationDate(question.getCreationDate());
        questionDTO.setVoteCount(question.getVoteCount());
        questionDTO.setUser(UserShowDTO.ofEntity(question.getUser()));
        if(!CollectionUtils.isEmpty(question.getTags())) {
            questionDTO.setTags(question.getTags().stream().map(Tag::getName).collect(Collectors.toList()));
        }
        return questionDTO;
    }

    public static Question newEntity(QuestionDTO questionDTO){
        Question question = new Question();
        question.setId(questionDTO.getId());
        question.setUser(UserShowDTO.newEntity(questionDTO.getUser()));
        question.setTitle(questionDTO.getTitle());
        question.setText(questionDTO.getText());
        question.setVoteCount(questionDTO.getVoteCount());
        question.setCreationDate(questionDTO.getCreationDate());
        if(!questionDTO.getTags().isEmpty()){
            question.setTags(questionDTO.getTags().stream().map(x -> new Tag(x)).collect(Collectors.toList()));
        } else {
            question.setTags(new ArrayList<>());
        }

        return question;
    }
}
