import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';
import { User } from '../user.entity';

export class UserResponseDTO implements Readonly<UserResponseDTO> {

    @ApiProperty({ required: true })
    @IsString()
    username: string;

    @ApiProperty({ required: true })
    @IsEmail()
    email: string;


    static fromEntity(owner: User): UserResponseDTO {
        return {
            ...owner.toSanitizedEntity(),
        }
    }

}
