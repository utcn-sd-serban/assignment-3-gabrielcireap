package com.gabrielcireap.stackOverflow.event;

import com.gabrielcireap.stackOverflow.dto.AnswerDTO;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
public class AnswerDeletedEvent extends BaseEvent {
    private final AnswerDTO answer;

    public AnswerDeletedEvent(AnswerDTO answer) {
        super(EventType.ANSWER_DELETED);
        this.answer = answer;
    }
}
