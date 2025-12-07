import { Test } from '@nestjs/testing';
import { ItemService } from '../../src/item/item.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Item } from '../../src/item/item.entity';

describe('ItemService', () => {
  let service: ItemService;

  const mockRepo = {
    find: jest.fn(),
    findOne: jest.fn(),
    save: jest.fn(),
    remove: jest.fn(),
    create: jest.fn(),
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        ItemService,
        {
          provide: getRepositoryToken(Item),
          useValue: mockRepo,
        },
      ],
    }).compile();

    service = module.get<ItemService>(ItemService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
