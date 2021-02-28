import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsUUID } from "class-validator";
import { UserResponseDTO } from "src/users/dto/user-response.dto";
import { Topic } from "../entities/topic.entity";
import { CreateTopicDto } from "./create-topic.dto";

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