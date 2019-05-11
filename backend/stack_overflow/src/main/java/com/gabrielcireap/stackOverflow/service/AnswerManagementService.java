package com.gabrielcireap.stackOverflow.service;

import com.gabrielcireap.stackOverflow.dto.AnswerDTO;
import com.gabrielcireap.stackOverflow.entity.Answer;
import com.gabrielcireap.stackOverflow.entity.Question;
import com.gabrielcireap.stackOverflow.entity.User;
import com.gabrielcireap.stackOverflow.exception.AnswerNotFoundException;
import com.gabrielcireap.stackOverflow.exception.NotEnoughPermissionsException;
import com.gabrielcireap.stackOverflow.exception.QuestionNotFoundException;
import com.gabrielcireap.stackOverflow.repository.RepositoryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.sql.Timestamp;

@Service
@RequiredArgsConstructor
public class AnswerManagementService {

    private final RepositoryFactory repositoryFactory;
    private final UserManagementService userManagementService;

    @Transactional
    public AnswerDTO save(AnswerDTO answerDTO) {
        Answer answer = new Answer();
        answer.setText(answerDTO.getText());
        answer.setVoteCount(answerDTO.getVoteCount());
        answer.setCreationDate(answerDTO.getCreationDate());

        User answerUser = new User();
        answerUser.setId(answerDTO.getUser().getId());
        Question question = new Question();
        question.setId(answerDTO.getQuestion().getId());
        answer.setUser(answerUser);
        answer.setQuestion(question);

        answer.setId(repositoryFactory.createAnswerRepository().save(answer).getId());
        return AnswerDTO.ofEntity(answer);
    }

    @Transactional
    public AnswerDTO save(int questionId, String text) {
        userManagementService.checkIfUserIsLogged();
        Question question = repositoryFactory.createQuestionRepository().findById(questionId).orElseThrow(QuestionNotFoundException::new);
        return AnswerDTO.ofEntity(repositoryFactory.createAnswerRepository()
                .save(new Answer(
                        null, question, userManagementService.getLoggedUser(), text, new Timestamp(System.currentTimeMillis()), 0)));
    }

    @Transactional
    public void remove(int id) {
        userManagementService.checkIfUserIsLogged();
        AnswerDTO answerDTO = findById(id);
        Answer answer = new Answer();
        answer.setId(answerDTO.getId());
        if (answerDTO.getUser().equals(userManagementService.getLoggedUser()) || userManagementService.getLoggedUser().getIsAdmin()) {
            repositoryFactory.createAnswerRepository().remove(answer);
        } else {
            throw new NotEnoughPermissionsException();
        }
    }

    @Transactional
    public void edit(int id, String text) {
        userManagementService.checkIfUserIsLogged();
        AnswerDTO answerDTO = findById(id);
        if (answerDTO.getUser().equals(userManagementService.getLoggedUser()) || userManagementService.getLoggedUser().getIsAdmin()) {
            answerDTO.setText(text);
            save(answerDTO);
        } else {
            throw new NotEnoughPermissionsException();
        }
    }

    @Transactional
    public AnswerDTO findById(int id) {
        return AnswerDTO.ofEntity(repositoryFactory.createAnswerRepository().findById(id).orElseThrow(AnswerNotFoundException::new));
    }
}
