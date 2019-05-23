package com.gabrielcireap.stackOverflow.event;

import com.gabrielcireap.stackOverflow.dto.UserShowDTO;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
public class UserUpdatedEvent extends BaseEvent {
    private final UserShowDTO user;

    public UserUpdatedEvent(UserShowDTO user) {
        super(EventType.USER_UPDATED);
        this.user = user;
    }
}
