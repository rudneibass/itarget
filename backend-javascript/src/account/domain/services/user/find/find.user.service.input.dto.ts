import { ApiProperty } from "@nestjs/swagger";

export class FindUserServiceInputDto {
  @ApiProperty({ 
    example: '123', 
    description: 'ID do usuário a ser buscado' 
  })
  id: string;

  constructor(data: { id: string }) {
    this.id = data.id;
  }
} 