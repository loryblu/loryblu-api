import { Injectable } from '@nestjs/common';
import { ParentRepository } from './parent.repository';

@Injectable()
export class ParentService {
  constructor(private parentRepository: ParentRepository) {}

  async findParent() {
    return this.parentRepository.findParent();
  }
}
