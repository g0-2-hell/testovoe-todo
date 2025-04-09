import { ApiProperty } from '@nestjs/swagger';

export class CreateProjectDto {
  @ApiProperty()
  title: string;
  @ApiProperty()
  description: string;
}
