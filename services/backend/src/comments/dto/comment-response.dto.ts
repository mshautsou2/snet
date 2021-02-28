import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";
import { UserResponseDTO } from "src/users/dto/user-response.dto";
import { Comment } from "../entities/comment.entity";

export class CommentResponseDTO implements Readonly<CommentResponseDTO> {

    @ApiProperty({ required: true })
    @IsString()
    content: string;

    @ApiProperty({ required: true })
    @IsString()
    owner: UserResponseDTO

    static fromEntity(comment: Comment): CommentResponseDTO {
        return {
            ...comment,
            owner: UserResponseDTO.fromEntity(comment.owner),
        }
    }
}
