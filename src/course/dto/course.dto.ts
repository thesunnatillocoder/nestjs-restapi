import { IsNotEmpty } from "class-validator";

export class CourseDto {

    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    description: string;
}