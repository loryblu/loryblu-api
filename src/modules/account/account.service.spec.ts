import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { AccountService } from './account.service';
import { AccountRepository } from './account.repository';
import * as stubs from './account.service.stubs';

describe('AccountService unit test', () => {
  let service: AccountService;

  const accountRepositoryMock = {
    saveCredentialParentAndChildrenProps: jest.fn(),
    getCredentialIdByEmail: jest
      .fn()
      .mockReturnValue(stubs.getCredentialOutput),
    savePasswordResetInformation: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AccountService,
        {
          provide: AccountRepository,
          useValue: accountRepositoryMock,
        },
      ],
    }).compile();

    service = module.get<AccountService>(AccountService);
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

  describe('Reset password', () => {
    it('Happy path - should return { url: string; fullname: string }', async () => {
      const actual = await service.createTokenToResetPassword(
        stubs.resetPasswordInput,
      );

      expect(actual).toBeInstanceOf(Object);

      if (actual) {
        expect(actual.url).toBeDefined();
        expect(actual.url).toMatch(
          /^loryblu:\/\/password_recovery\/\?r_token%3D([a-zA-Z0-9_-]+)%26expires_in%3D(([0-9]{1,6})(T|-|(%3A)|\.)?){6}([0-9]{3})Z$/,
        );
        expect(actual.fullname).toBeDefined();
      }
    });

    it('Unhappy path - should return void', async () => {
      jest
        .spyOn(accountRepositoryMock, 'getCredentialIdByEmail')
        .mockReturnValueOnce(null);

      const actual = await service.createTokenToResetPassword(
        stubs.resetPasswordInput,
      );

      expect(actual).not.toBeInstanceOf(Object);
      expect(actual).toBeUndefined();
    });
  });
});
