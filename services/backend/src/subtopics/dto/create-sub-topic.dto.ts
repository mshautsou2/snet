import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsUUID } from "class-validator";

export class CreateSubTopicDTO implements Readonly<CreateSubTopicDTO> {


    @ApiProperty({ required: true })
    @IsString()
    name: string;

    @ApiProperty({ required: true })
    @IsString()
    description: string;

    @ApiProperty({ required: true })
    @IsUUID()
    topicId: string;

    ownerId: string;

}
