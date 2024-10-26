export interface UserDto {
    username: string;
    password: string;
}

export interface UserResponseDto {
    id: string;
    username: string;
}

export interface LoginResponse {
    token: string;
    user: UserResponseDto;
}
