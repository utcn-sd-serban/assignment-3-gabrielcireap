package com.gabrielcireap.stackOverflow.service;

import com.gabrielcireap.stackOverflow.dto.QuestionDTO;
import com.gabrielcireap.stackOverflow.entity.Question;
import com.gabrielcireap.stackOverflow.entity.Tag;
import com.gabrielcireap.stackOverflow.exception.NotEnoughPermissionsException;
import com.gabrielcireap.stackOverflow.exception.QuestionNotFoundException;
import com.gabrielcireap.stackOverflow.exception.TagNotFoundException;
import com.gabrielcireap.stackOverflow.repository.RepositoryFactory;
import lombok.RequiredArgsConstructor;
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

    @Transactional
    public List<QuestionDTO> listQuestions() {
        //userManagementService.checkIfUserIsLogged();
        List<QuestionDTO> questions = repositoryFactory.createQuestionRepository().findAll().stream().map(QuestionDTO::ofEntity).collect(Collectors.toList());
        questions.sort((q1, q2) -> q1.getCreationDate().after(q2.getCreationDate()) ? -1 : 1);
        return questions;
    }

    public QuestionDTO findById(int id) {
        //userManagementService.checkIfUserIsLogged();
        return QuestionDTO.ofEntity(repositoryFactory.createQuestionRepository().findById(id).orElseThrow(QuestionNotFoundException::new));
    }

    @Transactional
    public QuestionDTO save(String title, String text, List<String> tagList) {
        //userManagementService.checkIfUserIsLogged();
        List<Tag> tags = stringToTags(tagList);
        List<Tag> allTags = repositoryFactory.createTagRepository().findAll();
        tags.stream().filter(tag -> !allTags.contains(tag)).forEach(tag -> repositoryFactory.createTagRepository().save(tag));

        return QuestionDTO.ofEntity(repositoryFactory.createQuestionRepository()
                .save(new Question(null, userManagementService.getLoggedUser(),
                        title, text, new Timestamp(System.currentTimeMillis()), 0, tags)));
    }

    @Transactional
    public QuestionDTO save(QuestionDTO questionDTO) {
        return QuestionDTO.ofEntity(repositoryFactory.createQuestionRepository().save(QuestionDTO.newEntity(questionDTO)));
    }

    @Transactional
    public void remove(int questionId) {

        userManagementService.checkIfUserIsLogged();
        if (!userManagementService.getLoggedUser().getIsAdmin()) {
            throw new NotEnoughPermissionsException();
        }

        Question question = repositoryFactory.createQuestionRepository().findById(questionId).orElseThrow(QuestionNotFoundException::new);
        repositoryFactory.createQuestionRepository().remove(question);
    }

    /*@Transactional
    public void edit(int questionId, String title, String text){
        userManagementService.checkIfUserIsLogged();
        if(!userManagementService.getLoggedUser().getIsAdmin()){
            throw new NotEnoughPermissionsException();
        }

        Question question = (Question) findById(questionId).keySet().toArray()[0];
        question.setTitle(title);
        question.setText(text);
        save(question);
    }*/

    @Transactional
    public List<QuestionDTO> findQuestionByTitle(String text) {

        //userManagementService.checkIfUserIsLogged();
        List<Question> questions = repositoryFactory.createQuestionRepository().findByTitle(text);
        questions.sort((q1, q2) -> {
            return q1.getCreationDate().after(q2.getCreationDate()) ? -1 : 1;
        });
        System.out.println(questions);
        return questions.stream().map(QuestionDTO::ofEntity).collect(Collectors.toList());
    }

    @Transactional
    public List<QuestionDTO> findQuestionByTag(String tag) {

        //userManagementService.checkIfUserIsLogged();
        Tag t = repositoryFactory.createTagRepository().findByName(tag).orElseThrow(TagNotFoundException::new);
        List<Question> questions = repositoryFactory.createQuestionRepository().findByTag(t);
        questions.sort((q1, q2) -> {
            return q1.getCreationDate().after(q2.getCreationDate()) ? -1 : 1;
        });
        List<QuestionDTO> dto = questions.stream().map(QuestionDTO::ofEntity).collect(Collectors.toList());
        System.out.println(dto);
        return dto;
    }

    private List<Tag> stringToTags(List<String> tag) {
        List<Tag> tags = new ArrayList<Tag>();

        tag.forEach(t -> tags.add(new Tag(null, t.toLowerCase().trim())));
        return tags;
    }
}
