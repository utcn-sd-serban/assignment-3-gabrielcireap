package com.gabrielcireap.stackOverflow.event;

import com.gabrielcireap.stackOverflow.dto.QuestionDTO;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
public class QuestionDeletedEvent extends BaseEvent {
    private final QuestionDTO question;

    public QuestionDeletedEvent(QuestionDTO question) {
        super(EventType.QUESTION_DELETED);
        this.question = question;
    }
}
