package com.gabrielcireap.stackOverflow.seed;

import com.gabrielcireap.stackOverflow.entity.Question;
import com.gabrielcireap.stackOverflow.entity.Tag;
import com.gabrielcireap.stackOverflow.repository.QuestionRepository;
import com.gabrielcireap.stackOverflow.repository.RepositoryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.stereotype.Component;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Arrays;

@Component
@RequiredArgsConstructor
@ConditionalOnProperty(name = "stack_overflow.repository-type", havingValue = "MEMORY")
public class QuestionSeed implements CommandLineRunner {

    private final RepositoryFactory repositoryFactory;

    @Override
    public void run(String... args) throws Exception {
        QuestionRepository questionRepository = repositoryFactory.createQuestionRepository();
        if(questionRepository.findAll().isEmpty()){
            Tag tag1 = new Tag(1, "q1");
            Tag tag2 = new Tag(2, "q2");
            Tag tag3 = new Tag(3, "q3");
            repositoryFactory.createTagRepository().save(tag1);
            repositoryFactory.createTagRepository().save(tag2);
            repositoryFactory.createTagRepository().save(tag3);
            questionRepository.save(new Question(null, repositoryFactory.createUserRepository().findById(1).get(),
                                                "Prima intrebare", "Acesta este primul text la prima intrebare",
                                                    new Timestamp(System.currentTimeMillis()), 0,
                                                    new ArrayList<Tag>(Arrays.asList(tag1))));

            questionRepository.save(new Question(null, repositoryFactory.createUserRepository().findById(2).get(),
                                                "Second question", "How to get a 10 at SD lab?",
                                                    new Timestamp(System.currentTimeMillis()), 0,
                                                    new ArrayList<>(Arrays.asList(tag1, tag2))));

            questionRepository.save(new Question(null, repositoryFactory.createUserRepository().findById(1).get(),
                                                "Third question", "This is the third question",
                                                    new Timestamp(System.currentTimeMillis()), 0,
                                                    new ArrayList<>(Arrays.asList(tag2, tag3))));
        }
    }
}
