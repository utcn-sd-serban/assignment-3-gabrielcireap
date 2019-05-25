package com.gabrielcireap.stackOverflow.service;

import com.gabrielcireap.stackOverflow.dto.QuestionDTO;
import com.gabrielcireap.stackOverflow.entity.Question;
import com.gabrielcireap.stackOverflow.entity.Tag;
import com.gabrielcireap.stackOverflow.event.*;
import com.gabrielcireap.stackOverflow.exception.NotEnoughPermissionsException;
import com.gabrielcireap.stackOverflow.exception.QuestionNotFoundException;
import com.gabrielcireap.stackOverflow.exception.TagNotFoundException;
import com.gabrielcireap.stackOverflow.repository.RepositoryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class QuestionManagementService {

    private final RepositoryFactory repositoryFactory;
    private final UserManagementService userManagementService;
    private final ApplicationEventPublisher eventPublisher;

    @Transactional
    public List<QuestionDTO> listQuestions() {
        List<Question> questions = repositoryFactory.createQuestionRepository().findAll();
        questions.sort((q1, q2) -> q1.getCreationDate().after(q2.getCreationDate()) ? -1 : 1);
        return questions.stream().map(QuestionDTO::ofEntity).collect(Collectors.toList());
    }

    @Transactional
    public QuestionDTO findById(int id) {
        return QuestionDTO.ofEntity(repositoryFactory.createQuestionRepository().findById(id).orElseThrow(QuestionNotFoundException::new));
    }

    @Transactional
    public QuestionDTO save(String title, String text, List<String> tagList) {
        List<Tag> tags = stringToTags(tagList);
        List<String> allTagNames = repositoryFactory.createTagRepository().findAll().stream().map(Tag::getName).collect(Collectors.toList());
        tags.stream().filter(tag -> !allTagNames.contains(tag.getName())).forEach(tag -> repositoryFactory.createTagRepository().save(tag));

        QuestionDTO questionDTO = QuestionDTO.ofEntity(repositoryFactory.createQuestionRepository()
                .save(new Question(null, userManagementService.getLoggedUser(),
                        title, text, new Timestamp(System.currentTimeMillis()), 0, tags)));

        eventPublisher.publishEvent(new QuestionCreatedEvent(questionDTO));
        return questionDTO;
    }

    @Transactional
    public QuestionDTO save(QuestionDTO questionDTO) {
        Question question = repositoryFactory.createQuestionRepository().findById(questionDTO.getId()).orElseThrow(QuestionNotFoundException::new);
        question.setText(questionDTO.getText());
        question.setTitle(questionDTO.getTitle());
        question.setVoteCount(questionDTO.getVoteCount());
        QuestionDTO savedQuestion = QuestionDTO.ofEntity(repositoryFactory.createQuestionRepository().save(question));
        eventPublisher.publishEvent(new QuestionUpdatedEvent(savedQuestion));
        return savedQuestion;
    }

    @Transactional
    public void remove(int questionId) {
        if (!userManagementService.getLoggedUser().getIsAdmin()) {
            throw new NotEnoughPermissionsException();
        }
        Question question = repositoryFactory.createQuestionRepository().findById(questionId).orElseThrow(QuestionNotFoundException::new);
        repositoryFactory.createQuestionRepository().remove(question);
        eventPublisher.publishEvent(new QuestionDeletedEvent(QuestionDTO.ofEntity(question)));
    }

    @Transactional
    public QuestionDTO edit(int questionId, String title, String text) {
        if (!userManagementService.getLoggedUser().getIsAdmin()) {
            throw new NotEnoughPermissionsException();
        }
        Question question = repositoryFactory.createQuestionRepository().findById(questionId).orElseThrow(QuestionNotFoundException::new);
        question.setTitle(title);
        question.setText(text);
        QuestionDTO questionDTO = save(QuestionDTO.ofEntity(question));
        eventPublisher.publishEvent(new QuestionUpdatedEvent(questionDTO));
        return questionDTO;
    }

    @Transactional
    public List<QuestionDTO> findQuestionByTitle(String text) {
        List<Question> questions = repositoryFactory.createQuestionRepository().findByTitle(text);
        questions.sort((q1, q2) -> q1.getCreationDate().after(q2.getCreationDate()) ? -1 : 1);
        List<QuestionDTO> questionDTOList = questions.stream().map(QuestionDTO::ofEntity).collect(Collectors.toList());
        eventPublisher.publishEvent(new QuestionSearchEvent(questionDTOList));
        return questionDTOList;
    }

    @Transactional
    public List<QuestionDTO> findQuestionByTag(String tag) {
        tag = tag.toLowerCase().trim();
        Tag t = repositoryFactory.createTagRepository().findByName(tag).orElseThrow(TagNotFoundException::new);
        List<Question> questions = repositoryFactory.createQuestionRepository().findByTag(t);
        questions.sort((q1, q2) -> q1.getCreationDate().after(q2.getCreationDate()) ? -1 : 1);
        List<QuestionDTO> questionList = questions.stream().map(QuestionDTO::ofEntity).collect(Collectors.toList());
        eventPublisher.publishEvent(new QuestionSearchEvent(questionList));
        return questionList;
    }

    private List<Tag> stringToTags(List<String> tag) {
        List<Tag> tags = new ArrayList<>();
        tag.forEach(t -> tags.add(new Tag(null, t.toLowerCase().trim())));
        return tags;
    }
}
