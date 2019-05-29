package com.gabrielcireap.stackOverflow.event;

import com.gabrielcireap.stackOverflow.dto.QuestionDTO;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.List;

@Data
@EqualsAndHashCode(callSuper = true)
public class QuestionsLoadedEvent extends BaseEvent {
    private final List<QuestionDTO> questions;

    public QuestionsLoadedEvent(List<QuestionDTO> questions) {
        super(EventType.QUESTIONS_LOADED);
        this.questions = questions;
    }
}
