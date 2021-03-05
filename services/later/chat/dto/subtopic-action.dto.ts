import { IsUUID } from "class-validator";

export class SubtopicAction implements Readonly<SubtopicAction> {

    @IsUUID()
    subtopicId: string;

}
