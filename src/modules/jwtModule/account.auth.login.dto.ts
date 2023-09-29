import { PickType } from '@nestjs/swagger';
import { CreateAccountDto } from '../account/account.dto';

export class LoginDto extends PickType(CreateAccountDto, [
  'email',
  'password',
]) {}
