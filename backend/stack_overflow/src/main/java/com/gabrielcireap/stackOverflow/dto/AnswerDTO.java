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
        answerDTO.setId(answer.getId());
        answerDTO.setQuestion(QuestionDTO.ofEntity(answer.getQuestion()));
        answerDTO.setUser(UserShowDTO.ofEntity(answer.getUser()));
        answerDTO.setText(answer.getText());
        answerDTO.setCreationDate(answer.getCreationDate());
        answerDTO.setVoteCount(answer.getVoteCount());

        return answerDTO;
    }

    public static Answer newEntity(AnswerDTO answerDTO){
        Answer answer = new Answer();
        answer.setId(answerDTO.getId());
        answer.setText(answerDTO.getText());
        answer.setVoteCount(answerDTO.getVoteCount());
        answer.setCreationDate(answerDTO.getCreationDate());
        answer.setUser(UserShowDTO.newEntity(answerDTO.getUser()));
        answer.setQuestion(QuestionDTO.newEntity(answerDTO.getQuestion()));

        return answer;
    }
}
