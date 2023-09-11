import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateAccountDto } from './parent.dto';
import { ParentService } from './parent.service';

@Controller('/auth')
export class ParentController {
  constructor(private parentService: ParentService) {}

  @ApiTags('Authentication')
  @Post('/register')
  async register(@Body() reateAccountInput: CreateAccountDto) {
    await this.parentService.newAccountPropsProcessing(reateAccountInput);

    return { message: 'Conta criada com sucesso!' };
  }
}
