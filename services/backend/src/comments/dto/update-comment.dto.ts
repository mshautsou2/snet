import { OmitType } from '@nestjs/swagger';
import { CreateCommentDTO } from './create-comment.dto';

export class UpdateCommentDTO extends OmitType(CreateCommentDTO, ['messageId']) { }
