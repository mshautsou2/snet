import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsUUID } from "class-validator";

export class CreateMessageDTO implements Readonly<CreateMessageDTO> {

    @ApiProperty({ required: true })
    @IsString()
    content: string;

    @ApiProperty({ required: true })
    @IsUUID()
    subtopicId: string;

    ownerId: string;

}
