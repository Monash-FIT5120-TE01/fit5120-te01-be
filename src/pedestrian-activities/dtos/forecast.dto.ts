import { Transform, Type } from 'class-transformer';
import { IsInt, IsOptional, Min } from 'class-validator';

export class PedestrianCountQueryDto {
  @Type(() => Number)
  @Transform(({ value }) => (value === '' ? undefined : value))
  @IsInt()
  @Min(1)
  @IsOptional()
  hours?: number;

  @Type(() => Number)
  @Transform(({ value }) => (value === '' ? undefined : value))
  @IsInt()
  @Min(1)
  @IsOptional()
  sensorId?: number;
}
