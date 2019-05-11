package com.gabrielcireap.stackOverflow.service;

import com.gabrielcireap.stackOverflow.dto.*;
import com.gabrielcireap.stackOverflow.entity.Answer;
import com.gabrielcireap.stackOverflow.entity.Question;
import com.gabrielcireap.stackOverflow.entity.User;
import com.gabrielcireap.stackOverflow.entity.Vote;
import com.gabrielcireap.stackOverflow.exception.DownvoteDuplicateException;
import com.gabrielcireap.stackOverflow.exception.UpvoteDuplicateException;
import com.gabrielcireap.stackOverflow.exception.VoteNotFoundException;
import com.gabrielcireap.stackOverflow.exception.VoteYourOwnException;
import com.gabrielcireap.stackOverflow.repository.RepositoryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@RequiredArgsConstructor
public class VoteManagementService {

    private final RepositoryFactory repositoryFactory;
    private final UserManagementService userManagementService;
    private final AnswerManagementService answerManagementService;
    private final QuestionManagementService questionManagementService;

    @Transactional
    public VoteDTO save(VoteDTO voteDTO) {
        Vote vote = new Vote();
        Answer answer;
        Question question;
        User user;

        vote.setIs_upvote(voteDTO.getIsUpvote());
        if (voteDTO.getAnswer() == null) {
            answer = null;
            question = new Question();
            question.setId(voteDTO.getQuestion().getId());
        } else {
            answer = new Answer();
            answer.setId(voteDTO.getAnswer().getId());
            question = null;
        }
        user = new User();
        user.setId(vote.getUser().getId());

        vote.setUser(user);
        vote.setQuestion(question);
        vote.setAnswer(answer);
        return VoteDTO.ofEntity(repositoryFactory.createVoteRepository().save(vote));
    }

    @Transactional
    public void remove(int id) {
        Vote vote = repositoryFactory.createVoteRepository().findById(id).orElseThrow(VoteNotFoundException::new);
        repositoryFactory.createVoteRepository().remove(vote);
    }

    @Transactional
    public VoteDTO findByAnswerId(int answerId, int userId) {
        return VoteDTO.ofEntity(repositoryFactory.createVoteRepository().findByAnswerId(answerId, userId).orElseThrow(VoteNotFoundException::new));
    }

    @Transactional
    public VoteDTO findByQuestionId(int questionId, int userId) {
        return VoteDTO.ofEntity(repositoryFactory.createVoteRepository().findByQuestionId(questionId, userId).orElseThrow(VoteNotFoundException::new));
    }

    @Transactional
    public void upvoteAnswer(int answerId) {
        userManagementService.checkIfUserIsLogged();
        AnswerDTO answerDTO = answerManagementService.findById(answerId);
        if (answerDTO.getUser().equals(userManagementService.getLoggedUser())) {
            throw new VoteYourOwnException();
        }

        try {
            VoteDTO voteDTO = findByAnswerId(answerId, userManagementService.getLoggedUser().getId());
            if (voteDTO.getIsUpvote()) {
                throw new UpvoteDuplicateException();
            } else {
                voteDTO.setIsUpvote(true);
                save(voteDTO);

                answerDTO.setVoteCount(answerDTO.getVoteCount() + 2);
                answerManagementService.save(answerDTO);

                answerDTO.getUser().setScore(answerDTO.getUser().getScore() + 12);
                userManagementService.save(answerDTO.getUser());

                userManagementService.getLoggedUser().setScore(userManagementService.getLoggedUser().getScore() + 1);
                userManagementService.save(UserRegisterDTO.ofEntity(userManagementService.getLoggedUser()));
            }

        } catch (VoteNotFoundException voteNotFoundException) {
            VoteDTO voteDTO = new VoteDTO();
            voteDTO.setId(null);
            voteDTO.setQuestion(null);
            voteDTO.setAnswer(answerDTO);
            voteDTO.setUser(UserShowDTO.ofEntity(userManagementService.getLoggedUser()));
            voteDTO.setIsUpvote(true);
            save(voteDTO);

            answerDTO.setVoteCount(answerDTO.getVoteCount() + 1);
            answerManagementService.save(answerDTO);

            answerDTO.getUser().setScore(answerDTO.getUser().getScore() + 10);
            userManagementService.save(answerDTO.getUser());
        }
    }

    @Transactional
    public void downvoteAnswer(int answerId) {
        userManagementService.checkIfUserIsLogged();
        AnswerDTO answerDTO = answerManagementService.findById(answerId);
        if (answerDTO.getUser().equals(userManagementService.getLoggedUser())) {
            throw new VoteYourOwnException();
        }

        try {
            VoteDTO voteDTO = findByAnswerId(answerId, userManagementService.getLoggedUser().getId());
            if (!voteDTO.getIsUpvote()) {
                throw new DownvoteDuplicateException();
            } else {
                voteDTO.setIsUpvote(false);
                save(voteDTO);

                answerDTO.setVoteCount(answerDTO.getVoteCount() - 2);
                answerManagementService.save(answerDTO);

                answerDTO.getUser().setScore(answerDTO.getUser().getScore() - 12);
                userManagementService.save(answerDTO.getUser());

                userManagementService.getLoggedUser().setScore(userManagementService.getLoggedUser().getScore() - 1);
                userManagementService.save(UserRegisterDTO.ofEntity(userManagementService.getLoggedUser()));
            }

        } catch (VoteNotFoundException voteNotFoundException) {
            VoteDTO voteDTO = new VoteDTO();
            voteDTO.setId(null);
            voteDTO.setQuestion(null);
            voteDTO.setAnswer(answerDTO);
            voteDTO.setUser(UserShowDTO.ofEntity(userManagementService.getLoggedUser()));
            voteDTO.setIsUpvote(false);
            save(voteDTO);

            answerDTO.setVoteCount(answerDTO.getVoteCount() - 1);
            answerManagementService.save(answerDTO);

            answerDTO.getUser().setScore(answerDTO.getUser().getScore() - 2);
            userManagementService.save(answerDTO.getUser());

            userManagementService.getLoggedUser().setScore(userManagementService.getLoggedUser().getScore() - 1);
            userManagementService.save(UserRegisterDTO.ofEntity(userManagementService.getLoggedUser()));
        }
    }

    @Transactional
    public void upvoteQuestion(int questionId) {
        userManagementService.checkIfUserIsLogged();
        QuestionDTO questionDTO = (QuestionDTO) questionManagementService.findById(questionId).keySet().toArray()[0];
        if (questionDTO.getUser().equals(userManagementService.getLoggedUser())) {
            throw new VoteYourOwnException();
        }

        try {
            VoteDTO voteDTO = findByQuestionId(questionId, userManagementService.getLoggedUser().getId());
            if (voteDTO.getIsUpvote()) {
                throw new UpvoteDuplicateException();
            } else {
                voteDTO.setIsUpvote(true);
                save(voteDTO);

                questionDTO.setVoteCount(questionDTO.getVoteCount() + 2);
                questionManagementService.save(questionDTO);

                questionDTO.getUser().setScore(questionDTO.getUser().getScore() + 7);
                userManagementService.save(questionDTO.getUser());
            }

        } catch (VoteNotFoundException voteNotFoundException) {
            VoteDTO voteDTO = new VoteDTO();
            voteDTO.setId(null);
            voteDTO.setQuestion(questionDTO);
            voteDTO.setAnswer(null);
            voteDTO.setUser(UserShowDTO.ofEntity(userManagementService.getLoggedUser()));
            voteDTO.setIsUpvote(true);
            save(voteDTO);

            questionDTO.setVoteCount(questionDTO.getVoteCount() + 1);
            questionManagementService.save(questionDTO);

            questionDTO.getUser().setScore(questionDTO.getUser().getScore() + 5);
            userManagementService.save(questionDTO.getUser());
        }
    }

    @Transactional
    public void downvoteQuestion(int questionId) {
        userManagementService.checkIfUserIsLogged();
        QuestionDTO questionDTO = (QuestionDTO) questionManagementService.findById(questionId).keySet().toArray()[0];
        if (questionDTO.getUser().equals(userManagementService.getLoggedUser())) {
            throw new VoteYourOwnException();
        }

        try {
            VoteDTO voteDTO = findByQuestionId(questionId, userManagementService.getLoggedUser().getId());
            if (!voteDTO.getIsUpvote()) {
                throw new DownvoteDuplicateException();
            } else {
                voteDTO.setIsUpvote(true);
                save(voteDTO);

                questionDTO.setVoteCount(questionDTO.getVoteCount() - 2);
                questionManagementService.save(questionDTO);

                questionDTO.getUser().setScore(questionDTO.getUser().getScore() - 7);
                userManagementService.save(questionDTO.getUser());
            }

        } catch (VoteNotFoundException voteNotFoundException) {
            VoteDTO voteDTO = new VoteDTO();
            voteDTO.setId(null);
            voteDTO.setQuestion(questionDTO);
            voteDTO.setAnswer(null);
            voteDTO.setUser(UserShowDTO.ofEntity(userManagementService.getLoggedUser()));
            voteDTO.setIsUpvote(false);
            save(voteDTO);

            questionDTO.setVoteCount(questionDTO.getVoteCount() - 1);
            questionManagementService.save(questionDTO);

            questionDTO.getUser().setScore(questionDTO.getUser().getScore() - 2);
            userManagementService.save(questionDTO.getUser());
        }
    }
}
