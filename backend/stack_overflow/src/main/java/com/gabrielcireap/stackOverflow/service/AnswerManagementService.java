package com.gabrielcireap.stackOverflow.service;

import com.gabrielcireap.stackOverflow.dto.AnswerDTO;
import com.gabrielcireap.stackOverflow.entity.Answer;
import com.gabrielcireap.stackOverflow.entity.Question;
import com.gabrielcireap.stackOverflow.event.AnswerCreatedEvent;
import com.gabrielcireap.stackOverflow.event.AnswerDeletedEvent;
import com.gabrielcireap.stackOverflow.event.AnswerUpdatedEvent;
import com.gabrielcireap.stackOverflow.event.AnswersLoadedEvent;
import com.gabrielcireap.stackOverflow.exception.AnswerNotFoundException;
import com.gabrielcireap.stackOverflow.exception.NotEnoughPermissionsException;
import com.gabrielcireap.stackOverflow.exception.QuestionNotFoundException;
import com.gabrielcireap.stackOverflow.repository.RepositoryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.sql.Timestamp;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AnswerManagementService {

    private final RepositoryFactory repositoryFactory;
    private final UserManagementService userManagementService;
    private final ApplicationEventPublisher eventPublisher;

    @Transactional
    public AnswerDTO save(AnswerDTO answerDTO) {
        Answer answer = repositoryFactory.createAnswerRepository().findById(answerDTO.getId()).orElseThrow(AnswerNotFoundException::new);
        answer.setText(answerDTO.getText());
        answer.setVoteCount(answerDTO.getVoteCount());
        AnswerDTO savedAnswer =  AnswerDTO.ofEntity(repositoryFactory.createAnswerRepository().save(answer));
        eventPublisher.publishEvent(new AnswerUpdatedEvent(savedAnswer));
        return savedAnswer;
    }

    @Transactional
    public AnswerDTO save(int questionId, String text) {
        Question question = repositoryFactory.createQuestionRepository().findById(questionId).orElseThrow(QuestionNotFoundException::new);
        AnswerDTO answerDTO = AnswerDTO.ofEntity(repositoryFactory.createAnswerRepository()
                .save(new Answer(
                        null, question, userManagementService.getLoggedUser(), text, new Timestamp(System.currentTimeMillis()), 0)));

        eventPublisher.publishEvent(new AnswerCreatedEvent(answerDTO));
        return answerDTO;
    }

    @Transactional
    public void remove(int id) {
        Answer answer = repositoryFactory.createAnswerRepository().findById(id).orElseThrow(AnswerNotFoundException::new);
        if (answer.getUser().equals(userManagementService.getLoggedUser()) || userManagementService.getLoggedUser().getIsAdmin()) {
            repositoryFactory.createAnswerRepository().remove(answer);
            eventPublisher.publishEvent(new AnswerDeletedEvent(AnswerDTO.ofEntity(answer)));
        } else {
            throw new NotEnoughPermissionsException();
        }
    }

    @Transactional
    public AnswerDTO findById(int id) {
        return AnswerDTO.ofEntity(repositoryFactory.createAnswerRepository().findById(id).orElseThrow(AnswerNotFoundException::new));
    }

    @Transactional
    public List<AnswerDTO> findAll(){
        List<Answer> answers = repositoryFactory.createAnswerRepository().findAll();
        answers.sort((a1, a2) -> a1.getVoteCount() > a2.getVoteCount() ? -1 : 1);
        List<AnswerDTO> answersList = answers.stream().map(AnswerDTO::ofEntity).collect(Collectors.toList());
        eventPublisher.publishEvent(new AnswersLoadedEvent(answersList));
        return answersList;
    }
}
