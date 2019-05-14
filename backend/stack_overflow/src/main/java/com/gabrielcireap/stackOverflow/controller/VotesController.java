package com.gabrielcireap.stackOverflow.controller;

import com.gabrielcireap.stackOverflow.service.VoteManagementService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class VotesController {
    private final VoteManagementService voteManagementService;

    @PutMapping("/questions/{id}/upvote")
    public void upvoteQuestion(@PathVariable int id){
        voteManagementService.upvoteQuestion(id);
    }

    @PutMapping("/questions/{id}/downvote")
    public void downvoteQuestion(@PathVariable int id){
        voteManagementService.downvoteQuestion(id);
    }

    @PutMapping("/answers/{id}/upvote")
    public void upvoteAnswer(@PathVariable int id){
        voteManagementService.upvoteAnswer(id);
    }

    @PutMapping("/answers/{id}/downvote")
    public void downvoteAnswer(@PathVariable int id){
        voteManagementService.downvoteAnswer(id);
    }
}
