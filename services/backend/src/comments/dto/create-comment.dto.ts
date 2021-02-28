import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsUUID } from "class-validator";

export class CreateCommentDTO implements Readonly<CreateCommentDTO> {


    @ApiProperty({ required: true })
    @IsString()
    content: string;

    @ApiProperty({ required: true })
    @IsUUID()
    messageId: string;

    ownerId: string;

}
