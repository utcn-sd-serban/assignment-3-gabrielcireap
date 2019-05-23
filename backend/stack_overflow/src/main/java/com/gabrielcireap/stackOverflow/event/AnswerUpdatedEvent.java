package com.gabrielcireap.stackOverflow.event;

import com.gabrielcireap.stackOverflow.dto.AnswerDTO;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
public class AnswerUpdatedEvent extends BaseEvent {
    private final AnswerDTO answer;

    public AnswerUpdatedEvent(AnswerDTO answer) {
        super(EventType.ANSWER_UPDATED);
        this.answer = answer;
    }
}
