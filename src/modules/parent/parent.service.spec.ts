import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { ParentService } from './parent.service';
import { ParentRepository } from './parent.repository';
import * as stubs from './parent.service.stubs';

describe('ParentService unit test', () => {
  let service: ParentService;

  const parentRepositoryMock = {
    saveCredentialParentAndChildrenProps: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ParentService,
        {
          provide: ParentRepository,
          useValue: parentRepositoryMock,
        },
      ],
    }).compile();

    service = module.get<ParentService>(ParentService);
  });

  describe('Create account', () => {
    it('Happy path - should return undefined', async () => {
      const actual = await service.newAccountPropsProcessing({
        ...stubs.createAccountInput,
        policiesAccepted: true,
      });

      expect(actual).toStrictEqual(undefined);
    });

    it('Unhappy path - should return a BadRequestException', async () => {
      try {
        await service.newAccountPropsProcessing({
          ...stubs.createAccountInput,
          policiesAccepted: false,
        });
      } catch (actual) {
        expect(actual?.message).toStrictEqual(
          'Por favor, para ter uma conta você deve aceitar nossos termos de uso e políticas de privacidade.',
        );
        expect(actual).toBeInstanceOf(BadRequestException);
      }
    });
  });
});
