import { Controller, Get } from '@nestjs/common';
import { ParentAccountService } from './parent.service';

@Controller('/')
export class ParentAccountController {
  constructor(private parentAccountService: ParentAccountService) {}

  @Get()
  async home() {
    return this.parentAccountService.findParentAccount();
  }
}
