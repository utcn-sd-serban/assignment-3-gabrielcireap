package com.gabrielcireap.stackOverflow.event;

import com.gabrielcireap.stackOverflow.dto.UserShowDTO;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.List;

@Data
@EqualsAndHashCode(callSuper = true)
public class UsersLoadedEvent extends BaseEvent {
    private final List<UserShowDTO> users;

    public UsersLoadedEvent(List<UserShowDTO> users) {
        super(EventType.USERS_LOADED);
        this.users = users;
    }
}
