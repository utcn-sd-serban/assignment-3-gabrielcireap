package com.gabrielcireap.stackOverflow.event;

import com.gabrielcireap.stackOverflow.dto.QuestionDTO;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.List;

@Data
@EqualsAndHashCode(callSuper = true)
public class QuestionSearchEvent extends BaseEvent {
    private final List<QuestionDTO> questions;

    public QuestionSearchEvent(List<QuestionDTO> questions) {
        super(EventType.QUESTION_SEARCH);
        this.questions = questions;
    }
}
