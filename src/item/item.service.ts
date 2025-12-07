import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from './item.entity';
import { Repository } from 'typeorm';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';

@Injectable()
export class ItemService {
  constructor(
    @InjectRepository(Item) private repo: Repository<Item>,
  ) {}

  create(dto: CreateItemDto, userId: number) {
    const item = this.repo.create({
      ...dto,
      owner: { id: userId } as any,
    });

    return this.repo.save(item);
  }

  findAll() {
    return this.repo.find();
  }

  async findOne(id: number) {
    const item = await this.repo.findOne({ where: { id } });
    if (!item) throw new NotFoundException('Item not found');
    return item;
  }

  async update(id: number, dto: UpdateItemDto, userId: number) {
    const item = await this.findOne(id);
    if (item.owner.id !== userId) {
      throw new ForbiddenException('You cannot modify this item');
    }

    Object.assign(item, dto);
    return this.repo.save(item);
  }

  async remove(id: number, userId: number) {
    const item = await this.findOne(id);
    if (item.owner.id !== userId) {
      throw new ForbiddenException('You cannot delete this item');
    }

    await this.repo.remove(item);
    return { message: 'Item deleted' };
  }
}
