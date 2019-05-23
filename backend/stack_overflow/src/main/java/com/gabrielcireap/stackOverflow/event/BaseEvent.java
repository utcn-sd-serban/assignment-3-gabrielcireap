package com.gabrielcireap.stackOverflow.event;

import lombok.Data;

@Data
public class BaseEvent {
    private final EventType type;
}
