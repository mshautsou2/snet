import { IsOptional, IsString, IsUUID } from 'class-validator';

export class MessageDTO implements Readonly<MessageDTO> {
  @IsString()
  content: string;

  @IsUUID()
  @IsOptional()
  replyTo: string;

  @IsUUID()
  subtopicId: string;
}
