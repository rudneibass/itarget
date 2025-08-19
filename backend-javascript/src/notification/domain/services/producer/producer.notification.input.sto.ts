import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class ProducerNotificationInputDto {
  @IsUUID('4', { message: 'O campo mensagemId deve ser um UUID v4 válido' })
  @IsNotEmpty({ message: 'O campo mensagemId não pode ser vazio' })
  @ApiProperty({ description: 'UUID da mensagem' })
  mensagemId: string;

  @IsNotEmpty({ message: 'O campo conteudoMensagem não pode ser vazio' })
  @ApiProperty({ description: 'Conteúdo da mensagem' })
  conteudoMensagem: string;
}