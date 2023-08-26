import { Injectable } from '@nestjs/common';
import { ParentAccountRepository } from './parent.repository';

@Injectable()
export class ParentAccountService {
  constructor(private parentAccountRepository: ParentAccountRepository) {}

  async findParentAccount() {
    return this.parentAccountRepository.findParentAccount();
  }
}
