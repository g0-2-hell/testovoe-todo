import { ApiProperty } from "@nestjs/swagger";

export class CreateTaskDto {
      @ApiProperty()
      title: string;
}
