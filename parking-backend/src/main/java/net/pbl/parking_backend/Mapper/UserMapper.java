package net.pbl.parking_backend.Mapper;

import net.pbl.parking_backend.Entity.User;
import net.pbl.parking_backend.dto.RegisterRequest;
import net.pbl.parking_backend.dto.UserResponse;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface UserMapper {

    UserResponse userToUserResponse(User user);

    // We only need to tell MapStruct to ignore the password,
    // as it will be handled separately in the service.
    @Mapping(target = "password", ignore = true)
    User registerRequestToUser(RegisterRequest registerRequest);
}