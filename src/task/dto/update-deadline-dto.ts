import { ApiProperty } from "@nestjs/swagger";

export class UpdateDeadLineDto {
  @ApiProperty()
  deadline: Date;
}
