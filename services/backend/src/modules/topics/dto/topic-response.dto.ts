import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";
import { UserResponseDTO } from "src/modules/users/dto/user-response.dto";
import { Topic } from "../entities/topic.entity";

export class TopicResponseDTO implements Readonly<TopicResponseDTO> {

    @ApiProperty({ required: true })
    @IsString()
    name: string;

    @ApiProperty({ required: true })
    @IsString()
    description: string;

    @ApiProperty({ required: true })
    @IsString()
    owner: UserResponseDTO

    static fromEntity(topic: Topic): TopicResponseDTO {
        return {
            ...topic,
            owner: UserResponseDTO.fromEntity(topic.owner),
        }
    }
}
