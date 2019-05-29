package com.gabrielcireap.stackOverflow.event;

import com.gabrielcireap.stackOverflow.dto.UserShowDTO;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
public class UserCreatedEvent extends BaseEvent{
    private final UserShowDTO user;

    public UserCreatedEvent(UserShowDTO user) {
        super(EventType.USER_CREATED);
        this.user = user;
    }
}
