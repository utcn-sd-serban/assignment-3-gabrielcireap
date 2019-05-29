package com.gabrielcireap.stackOverflow.event;

import com.gabrielcireap.stackOverflow.dto.AnswerDTO;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.List;

@Data
@EqualsAndHashCode(callSuper = true)
public class AnswersLoadedEvent extends BaseEvent {
    private final List<AnswerDTO> answers;

    public AnswersLoadedEvent(List<AnswerDTO> answers) {
        super(EventType.ANSWERS_LOADED);
        this.answers = answers;
    }
}
