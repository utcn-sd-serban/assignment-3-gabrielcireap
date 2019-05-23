package com.gabrielcireap.stackOverflow.event;

import com.gabrielcireap.stackOverflow.dto.AnswerDTO;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
public class AnswerCreatedEvent extends BaseEvent {
    private final AnswerDTO answer;

    public AnswerCreatedEvent(AnswerDTO answer) {
        super(EventType.ANSWER_CREATED);
        this.answer = answer;
    }
}
