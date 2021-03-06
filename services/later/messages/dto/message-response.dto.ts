import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";
import { UserResponseDTO } from "src/modules/auth/users/dto/user-response.dto";
import { Message } from "src/modules/messages/entities/message.entity";

export class MessageResponseDTO implements Readonly<MessageResponseDTO> {

    @ApiProperty({ required: true })
    @IsString()
    content: string;

    @ApiProperty({ required: true })
    @IsString()
    owner: UserResponseDTO

    static fromEntity(topic: Message): MessageResponseDTO {
        return {
            ...topic,
            owner: UserResponseDTO.fromEntity(topic.owner),
        }
    }
}
