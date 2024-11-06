import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import configModule from 'src/globals/constants';
import jwtModule from 'src/lib/jwt';

import { AccountService } from 'src/modules/account/account.service';
import { AccountRepository } from 'src/modules/account/account.repository';
import * as stubs from './account.service.stubs';
import { EmailNotFoundException } from 'src/globals/responses/exceptions';

describe('AccountService unit test', () => {
  let service: AccountService;

  const accountRepositoryMock = {
    saveCredentialParentAndChildrenProps: jest.fn(),
    getCredentialIdByEmail: jest
      .fn()
      .mockReturnValue(stubs.getCredentialOutput),
    savePasswordResetInformation: jest.fn(),
    getCredentialId: jest.fn().mockReturnValue(stubs.getCredentialOutputById),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [configModule, jwtModule],
      providers: [
        ConfigService,
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
        expect(actual.response).toBeDefined();

        const { response } = actual;

        expect(Array.isArray(response.details)).toBeTruthy();
        expect(response.details[0].property).toStrictEqual('policiesAccepted');
        expect(response.details[0].message).toStrictEqual(
          'Por favor, para ter uma conta você deve aceitar nossos termos de uso e políticas de privacidade.',
        );
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

      try {
        await service.createTokenToResetPassword(stubs.resetPasswordInput);
      } catch (actual) {
        expect(actual).toBeInstanceOf(EmailNotFoundException);
      }
    });
  });
  describe('Account', () => {
    it('Happy path - should return account details', async () => {
      const actual = await service.getCredential(
        stubs.getCredentialOutputById.id,
      );

      expect(actual.credential).toHaveProperty(
        'message',
        'Dados recebidos com sucesso',
      );
      expect(actual).toHaveProperty('credential');
      expect(actual.credential).toHaveProperty(
        'id',
        stubs.getCredentialOutputById.id,
      );
      expect(actual.credential).toHaveProperty(
        'email',
        stubs.getCredentialOutputById.email,
      );
      expect(actual.credential).toHaveProperty('parentProfile');
      expect(actual.credential.parentProfile).toHaveProperty(
        'id',
        stubs.getCredentialOutputById.parentProfile.id,
      );
      expect(actual.credential.parentProfile).toHaveProperty(
        'fullname',
        stubs.getCredentialOutputById.parentProfile.fullname,
      );
      expect(actual.credential.parentProfile).toHaveProperty('childrens');
      expect(actual.credential.parentProfile.childrens).toHaveLength(1);
    });
  });

  it('Unhappy path - should return void', async () => {
    jest
      .spyOn(accountRepositoryMock, 'getCredentialId')
      .mockReturnValueOnce(null);

    try {
      await service.getCredential(stubs.getCredentialOutputById.id);
    } catch (actual) {
      expect(actual).toBeInstanceOf(EmailNotFoundException);
    }
  });
});
