package com.gabrielcireap.stackOverflow.dto;

import com.gabrielcireap.stackOverflow.entity.Vote;
import lombok.Data;

@Data
public class VoteDTO {

    private Integer id;
    private QuestionDTO question;
    private AnswerDTO answer;
    private UserShowDTO user;
    private Boolean isUpvote;

    public static VoteDTO ofEntity(Vote vote){
        VoteDTO voteDTO = new VoteDTO();
        voteDTO.setId(vote.getId());
        voteDTO.setQuestion(vote.getQuestion() == null ? null : QuestionDTO.ofEntity(vote.getQuestion()));
        voteDTO.setAnswer(vote.getAnswer() == null ? null : AnswerDTO.ofEntity(vote.getAnswer()));
        voteDTO.setUser(UserShowDTO.ofEntity(vote.getUser()));
        voteDTO.setIsUpvote(vote.getIs_upvote());

        return voteDTO;
    }
}
