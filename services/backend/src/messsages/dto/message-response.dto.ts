import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";
import { UserResponseDTO } from "src/users/dto/user-response.dto";
import { Message } from "../entities/message.entity";

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
