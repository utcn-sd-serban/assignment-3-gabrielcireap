package com.gabrielcireap.stackOverflow.seed;

import com.gabrielcireap.stackOverflow.entity.Question;
import com.gabrielcireap.stackOverflow.entity.Tag;
import com.gabrielcireap.stackOverflow.entity.User;
import com.gabrielcireap.stackOverflow.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.Profile;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import javax.transaction.Transactional;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Arrays;

@Component
@RequiredArgsConstructor
@Order(Ordered.HIGHEST_PRECEDENCE)
@ConditionalOnProperty(name = "stack_overflow.repository-type", havingValue = "MEMORY")
public class ApplicationSeed implements CommandLineRunner {
    private final PasswordEncoder passwordEncoder;
    private final RepositoryFactory repositoryFactory;
    private UserRepository userRepository;
    private QuestionRepository questionRepository;
    private AnswerRepository answerRepository;
    private TagRepository tagRepository;
    private int times=1;

    @Override
    @Transactional
    public void run(String... args) {

        userRepository = repositoryFactory.createUserRepository();
        questionRepository = repositoryFactory.createQuestionRepository();
        tagRepository = repositoryFactory.createTagRepository();

        if (userRepository.findAll().isEmpty()) {
            userRepository.save(new User(null, "user1", passwordEncoder.encode("pass1"), "email1", 0, true, false));
            userRepository.save(new User(null, "ws", passwordEncoder.encode("ws"), "email1", 0, true, false));
            userRepository.save(new User("user2", passwordEncoder.encode("pass2"), "email2"));
            userRepository.save(new User("user3", passwordEncoder.encode("pass3"), "email3"));
        }

        if (questionRepository.findAll().isEmpty()) {
            Tag tag1 = new Tag(null, "q1");
            Tag tag2 = new Tag(null, "q2");
            Tag tag3 = new Tag(null, "q3");
            tagRepository.save(tag1);
            tagRepository.save(tag2);
            tagRepository.save(tag3);

            questionRepository.save(new Question(null, userRepository.findById(4 * times - 3).get(),
                    "Prima intrebare", "Acesta este primul text la prima intrebare",
                    new Timestamp(System.currentTimeMillis()), 0,
                    new ArrayList<Tag>(Arrays.asList(tag1))));

            questionRepository.save(new Question(null, userRepository.findById(4 * times - 1).get(),
                    "Second question", "How to get a 10 at SD lab?",
                    new Timestamp(System.currentTimeMillis()), 0,
                    new ArrayList<>(Arrays.asList(tag1, tag2))));

            questionRepository.save(new Question(null, userRepository.findById(4 * times).get(),
                    "Third question", "This is the third question",
                    new Timestamp(System.currentTimeMillis()), 0,
                    new ArrayList<>(Arrays.asList(tag2, tag3))));
        }

        times++;
    }

    @Transactional
    public void clear() {
        userRepository.removeAll();
        questionRepository.removeAll();
    }
}
