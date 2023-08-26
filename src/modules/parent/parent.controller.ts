import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ParentAccountService } from './parent.service';

@ApiTags('Authentication')
@Controller('/')
export class ParentAccountController {
  constructor(private parentAccountService: ParentAccountService) {}

  @Get()
  async home() {
    return this.parentAccountService.findParentAccount();
  }
}
