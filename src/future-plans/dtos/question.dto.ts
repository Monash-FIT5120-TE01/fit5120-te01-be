import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, Min } from 'class-validator';

export class FindQuestionDto {
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsNotEmpty()
  projectId: number;
}
