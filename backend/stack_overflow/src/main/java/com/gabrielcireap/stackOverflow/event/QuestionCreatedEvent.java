package com.gabrielcireap.stackOverflow.event;

import com.gabrielcireap.stackOverflow.dto.QuestionDTO;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
public class QuestionCreatedEvent extends BaseEvent {
    private final QuestionDTO question;

    public QuestionCreatedEvent(QuestionDTO question) {
        super(EventType.QUESTION_CREATED);
        this.question = question;
    }
}
