import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ParentService } from './parent.service';

@Controller('/')
export class ParentController {
  constructor(private parentService: ParentService) {}

  @Get('parent')
  @ApiTags('Parent profile')
  async findParent() {
    return this.parentService.findParent();
  }
}
