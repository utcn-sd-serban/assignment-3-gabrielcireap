package com.gabrielcireap.stackOverflow.controller;

import com.gabrielcireap.stackOverflow.dto.ErrorDTO;
import com.gabrielcireap.stackOverflow.exception.*;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@Component
@RestControllerAdvice
public class ErrorHandler {

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(BannedUserException.class)
    public ErrorDTO handleBannedUserException(BannedUserException ex) {
        return new ErrorDTO("User has been banned!");
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(UserNotFoundException.class)
    public ErrorDTO handleUserNotFoundException(UserNotFoundException ex) {
        return new ErrorDTO("Username not found!");
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(DuplicateUserException.class)
    public ErrorDTO handleDuplicateUserException(DuplicateUserException ex) {
        return new ErrorDTO("User already exists!");
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(QuestionNotFoundException.class)
    public ErrorDTO handleAnswerNotFoundException(QuestionNotFoundException ex) {
        return new ErrorDTO("Question not found!");
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(AnswerNotFoundException.class)
    public ErrorDTO handleAnswerNotFoundException(AnswerNotFoundException ex) {
        return new ErrorDTO("Answer not found!");
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(TagNotFoundException.class)
    public ErrorDTO handleTagNotFoundException(TagNotFoundException ex) {
        return new ErrorDTO("Tag not found!");
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(VoteNotFoundException.class)
    public ErrorDTO handleVoteNotFoundException(VoteNotFoundException ex) {
        return new ErrorDTO("Vote not found!");
    }

    @ResponseStatus(HttpStatus.FORBIDDEN)
    @ExceptionHandler(VoteYourOwnException.class)
    public ErrorDTO handleVoteYourOwnException(VoteYourOwnException ex) {
        return new ErrorDTO("You cannot vote your own question/answer");
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(UpvoteDuplicateException.class)
    public ErrorDTO handleUpvoteDuplicateException(UpvoteDuplicateException ex) {
        return new ErrorDTO("You cannot upvote twice!");
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(DownvoteDuplicateException.class)
    public ErrorDTO handleDownvoteDuplicateException(DownvoteDuplicateException ex) {
        return new ErrorDTO("You cannot downvote twice!");
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(NotEnoughPermissionsException.class)
    public ErrorDTO handleNotEnoughPermissionsException(NotEnoughPermissionsException ex) {
        return new ErrorDTO("You don't have enough permissions!");
    }
}
