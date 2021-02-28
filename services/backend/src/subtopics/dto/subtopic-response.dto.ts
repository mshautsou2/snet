import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsUUID } from "class-validator";
import { UserResponseDTO } from "src/users/dto/user-response.dto";
import { SubTopic } from "../entities/subtopic.entity";
import { CreateSubTopicDTO } from "./create-sub-topic.dto";

export class SubTopicResponseDTO implements Readonly<SubTopicResponseDTO> {

    @ApiProperty({ required: true })
    @IsString()
    name: string;

    @ApiProperty({ required: true })
    @IsString()
    description: string;

    @ApiProperty({ required: true })
    @IsString()
    owner: UserResponseDTO

    static fromEntity(topic: SubTopic): SubTopicResponseDTO {
        return {
            ...topic,
            owner: UserResponseDTO.fromEntity(topic.owner),
        }
    }
}
