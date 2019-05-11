package com.gabrielcireap.stackOverflow.dto;

import com.gabrielcireap.stackOverflow.entity.Answer;
import lombok.Data;

import java.sql.Timestamp;

@Data
public class AnswerDTO {

    private Integer id;
    private QuestionDTO question;
    private UserShowDTO user;
    private String text;
    private Timestamp creationDate;
    private Integer voteCount;

    public static AnswerDTO ofEntity(Answer answer) {
        AnswerDTO answerDTO = new AnswerDTO();
        answerDTO.setQuestion(QuestionDTO.ofEntity(answer.getQuestion()));
        answerDTO.setUser(UserShowDTO.ofEntity(answer.getUser()));
        answerDTO.setText(answer.getText());
        answerDTO.setCreationDate(answer.getCreationDate());
        answerDTO.setVoteCount(answer.getVoteCount());

        return answerDTO;
    }
}
