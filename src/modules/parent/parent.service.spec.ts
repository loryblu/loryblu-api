import { Test, TestingModule } from '@nestjs/testing';
import { ParentService } from './parent.service';
import { ParentRepository } from './parent.repository';
import { PrismaService } from 'src/prisma/prisma.service';

describe('ParentService unit test', () => {
  let service: ParentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PrismaService,
        ParentService,
        {
          provide: ParentRepository,
          useValue: {
            findParent: jest.fn().mockResolvedValue([]),
          },
        },
      ],
    }).compile();

    service = module.get<ParentService>(ParentService);
  });

  describe('Happy Path', () => {
    it('Should return a list of ParentProfile', async () => {
      const actual = await service.findParent();
      const expected = [];

      expect(actual).toEqual(expected);
    });
  });
});
