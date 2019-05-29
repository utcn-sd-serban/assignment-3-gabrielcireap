package com.gabrielcireap.stackOverflow.service;

import com.gabrielcireap.stackOverflow.dto.AnswerDTO;
import com.gabrielcireap.stackOverflow.dto.QuestionDTO;
import com.gabrielcireap.stackOverflow.dto.UserShowDTO;
import com.gabrielcireap.stackOverflow.dto.VoteDTO;
import com.gabrielcireap.stackOverflow.entity.Question;
import com.gabrielcireap.stackOverflow.entity.Vote;
import com.gabrielcireap.stackOverflow.event.AnswerUpdatedEvent;
import com.gabrielcireap.stackOverflow.event.QuestionUpdatedEvent;
import com.gabrielcireap.stackOverflow.event.UserUpdatedEvent;
import com.gabrielcireap.stackOverflow.exception.*;
import com.gabrielcireap.stackOverflow.repository.RepositoryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@RequiredArgsConstructor
public class VoteManagementService {

    private final RepositoryFactory repositoryFactory;
    private final UserManagementService userManagementService;
    private final AnswerManagementService answerManagementService;
    private final QuestionManagementService questionManagementService;
    private final ApplicationEventPublisher eventPublisher;

    @Transactional
    public VoteDTO save(VoteDTO voteDTO) {
        return VoteDTO.ofEntity(repositoryFactory.createVoteRepository().save(VoteDTO.newEntity(voteDTO)));
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
        AnswerDTO answerDTO = answerManagementService.findById(answerId);
        if (answerDTO.getUser().getUsername().equals(userManagementService.getLoggedUser().getUsername())) {
            throw new VoteYourOwnException();
        }

        try {
            VoteDTO voteDTO = findByAnswerId(answerId, userManagementService.getLoggedUser().getId());
            if (voteDTO.getIsUpvote()) {
                throw new UpvoteDuplicateException();
            } else {
                voteDTO.setIsUpvote(true);
                answerDTO.setVoteCount(answerDTO.getVoteCount() + 2);
                answerDTO.getUser().setScore(answerDTO.getUser().getScore() + 12);
                answerManagementService.save(answerDTO);
                userManagementService.save(answerDTO.getUser());
                userManagementService.getLoggedUser().setScore(userManagementService.getLoggedUser().getScore() + 1);
                userManagementService.save(UserShowDTO.ofEntity(userManagementService.getLoggedUser()));
                save(voteDTO);

                eventPublisher.publishEvent(new AnswerUpdatedEvent(answerDTO));
                eventPublisher.publishEvent(new UserUpdatedEvent(answerDTO.getUser()));
                eventPublisher.publishEvent(new UserUpdatedEvent(UserShowDTO.ofEntity(userManagementService.getLoggedUser())));
            }

        } catch (VoteNotFoundException voteNotFoundException) {
            VoteDTO voteDTO = new VoteDTO();
            voteDTO.setId(null);
            voteDTO.setQuestion(null);
            voteDTO.setAnswer(answerDTO);
            voteDTO.setUser(UserShowDTO.ofEntity(userManagementService.getLoggedUser()));
            voteDTO.setIsUpvote(true);
            answerDTO.setVoteCount(answerDTO.getVoteCount() + 1);
            answerDTO.getUser().setScore(answerDTO.getUser().getScore() + 10);
            answerManagementService.save(answerDTO);
            userManagementService.save(answerDTO.getUser());
            save(voteDTO);

            eventPublisher.publishEvent(new AnswerUpdatedEvent(answerDTO));
            eventPublisher.publishEvent(new UserUpdatedEvent(answerDTO.getUser()));
        }
    }

    @Transactional
    public void downvoteAnswer(int answerId) {
        AnswerDTO answerDTO = answerManagementService.findById(answerId);
        if (answerDTO.getUser().getUsername().equals(userManagementService.getLoggedUser().getUsername())) {
            throw new VoteYourOwnException();
        }

        try {
            VoteDTO voteDTO = findByAnswerId(answerId, userManagementService.getLoggedUser().getId());
            if (!voteDTO.getIsUpvote()) {
                throw new DownvoteDuplicateException();
            } else {
                voteDTO.setIsUpvote(false);
                answerDTO.setVoteCount(answerDTO.getVoteCount() - 2);
                answerManagementService.save(answerDTO);
                answerDTO.getUser().setScore(answerDTO.getUser().getScore() - 12);
                userManagementService.save(answerDTO.getUser());
                userManagementService.getLoggedUser().setScore(userManagementService.getLoggedUser().getScore() - 1);
                userManagementService.save(UserShowDTO.ofEntity(userManagementService.getLoggedUser()));
                save(voteDTO);

                eventPublisher.publishEvent(new UserUpdatedEvent(answerDTO.getUser()));
                eventPublisher.publishEvent(new UserUpdatedEvent(UserShowDTO.ofEntity(userManagementService.getLoggedUser())));
                eventPublisher.publishEvent(new AnswerUpdatedEvent(answerDTO));
            }

        } catch (VoteNotFoundException voteNotFoundException) {
            VoteDTO voteDTO = new VoteDTO();
            voteDTO.setId(null);
            voteDTO.setQuestion(null);
            voteDTO.setAnswer(answerDTO);
            voteDTO.setUser(UserShowDTO.ofEntity(userManagementService.getLoggedUser()));
            voteDTO.setIsUpvote(false);
            answerDTO.setVoteCount(answerDTO.getVoteCount() - 1);
            answerDTO.getUser().setScore(answerDTO.getUser().getScore() - 2);
            answerManagementService.save(answerDTO);
            userManagementService.save(answerDTO.getUser());
            userManagementService.getLoggedUser().setScore(userManagementService.getLoggedUser().getScore() - 1);
            userManagementService.save(UserShowDTO.ofEntity(userManagementService.getLoggedUser()));
            save(voteDTO);

            eventPublisher.publishEvent(new AnswerUpdatedEvent(answerDTO));
            eventPublisher.publishEvent(new UserUpdatedEvent(answerDTO.getUser()));
            eventPublisher.publishEvent(new UserUpdatedEvent(UserShowDTO.ofEntity(userManagementService.getLoggedUser())));
        }
    }

    @Transactional
    public void upvoteQuestion(int questionId) {
        Question question = repositoryFactory.createQuestionRepository().findById(questionId).orElseThrow(QuestionNotFoundException::new);
        QuestionDTO questionDTO = QuestionDTO.ofEntity(question);
        if (question.getUser().getUsername().equals(userManagementService.getLoggedUser().getUsername())) {
            throw new VoteYourOwnException();
        }

        try {
            VoteDTO voteDTO = findByQuestionId(questionId, userManagementService.getLoggedUser().getId());
            if (voteDTO.getIsUpvote()) {
                throw new UpvoteDuplicateException();
            } else {
                voteDTO.setIsUpvote(true);
                questionDTO.setVoteCount(questionDTO.getVoteCount() + 2);
                questionDTO.getUser().setScore(questionDTO.getUser().getScore() + 7);
                questionManagementService.save(questionDTO);
                userManagementService.save(questionDTO.getUser());
                save(voteDTO);

                eventPublisher.publishEvent(new QuestionUpdatedEvent(questionDTO));
                eventPublisher.publishEvent(new UserUpdatedEvent(questionDTO.getUser()));
            }

        } catch (VoteNotFoundException voteNotFoundException) {
            VoteDTO voteDTO = new VoteDTO();
            voteDTO.setId(null);
            voteDTO.setQuestion(questionDTO);
            voteDTO.setAnswer(null);
            voteDTO.setUser(UserShowDTO.ofEntity(userManagementService.getLoggedUser()));
            voteDTO.setIsUpvote(true);
            questionDTO.getUser().setScore(questionDTO.getUser().getScore() + 5);
            questionDTO.setVoteCount(questionDTO.getVoteCount() + 1);
            userManagementService.save(questionDTO.getUser());
            questionManagementService.save(questionDTO);
            save(voteDTO);

            eventPublisher.publishEvent(new UserUpdatedEvent(questionDTO.getUser()));
            eventPublisher.publishEvent(new QuestionUpdatedEvent(questionDTO));
        }
    }

    @Transactional
    public void downvoteQuestion(int questionId) {
        Question question = repositoryFactory.createQuestionRepository().findById(questionId).orElseThrow(QuestionNotFoundException::new);
        QuestionDTO questionDTO = QuestionDTO.ofEntity(question);
        if (question.getUser().getUsername().equals(userManagementService.getLoggedUser().getUsername())) {
            throw new VoteYourOwnException();
        }

        try {
            VoteDTO voteDTO = findByQuestionId(questionId, userManagementService.getLoggedUser().getId());
            if (voteDTO.getIsUpvote() == false) {
                throw new DownvoteDuplicateException();
            } else {
                voteDTO.setIsUpvote(false);
                questionDTO.setVoteCount(questionDTO.getVoteCount() - 2);
                questionManagementService.save(questionDTO);
                questionDTO.getUser().setScore(questionDTO.getUser().getScore() - 7);
                userManagementService.save(questionDTO.getUser());
                save(voteDTO);

                eventPublisher.publishEvent(new QuestionUpdatedEvent(questionDTO));
                eventPublisher.publishEvent(new UserUpdatedEvent(questionDTO.getUser()));
            }

        } catch (VoteNotFoundException voteNotFoundException) {
            VoteDTO voteDTO = new VoteDTO();
            voteDTO.setId(null);
            voteDTO.setQuestion(questionDTO);
            voteDTO.setAnswer(null);
            voteDTO.setUser(UserShowDTO.ofEntity(userManagementService.getLoggedUser()));
            voteDTO.setIsUpvote(false);

            questionDTO.setVoteCount(questionDTO.getVoteCount() - 1);
            questionDTO.getUser().setScore(questionDTO.getUser().getScore() - 2);
            questionManagementService.save(questionDTO);
            userManagementService.save(questionDTO.getUser());
            save(voteDTO);

            eventPublisher.publishEvent(new QuestionUpdatedEvent(questionDTO));
            eventPublisher.publishEvent(new UserUpdatedEvent(questionDTO.getUser()));
        }
    }
}
