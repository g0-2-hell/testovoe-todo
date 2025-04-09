import { ApiProperty } from "@nestjs/swagger";

export class GenerateTokenDto {
  @ApiProperty()
  _id: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  role: string;
}
