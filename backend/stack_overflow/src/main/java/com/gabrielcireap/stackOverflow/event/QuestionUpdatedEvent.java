package com.gabrielcireap.stackOverflow.event;

import com.gabrielcireap.stackOverflow.dto.QuestionDTO;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
public class QuestionUpdatedEvent extends BaseEvent {
    private final QuestionDTO question;

    public QuestionUpdatedEvent(QuestionDTO question) {
        super(EventType.QUESTION_UPDATED);
        this.question = question;
    }
}
