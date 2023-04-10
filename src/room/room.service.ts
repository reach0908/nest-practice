import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { UserService } from 'src/user/user.service';
import { Room } from './entities/room.entity';
import { Message } from './entities/message.entity';

import { AddMessageDto } from 'src/chat/dto/add-message.dto';
import { CreateRoomDto } from 'src/room/dto/create-room.dto';
import { UpdateRoomDto } from 'src/room/dto/update-room.dto';
import { BanUserDto } from 'src/chat/dto/ban-user.dto';

@Injectable()
export class RoomService {
	constructor(
		@injectRepository(Room)
		private readonly roomRepository: Repository<Room>,
		@InjectRepository(Message)
		private readonly messageRepository: Repository<Message>,
		private readonly userService: UserService,
	) {}

	async findAll() {
		const rooms = await this.roomRepository.find({
			relations: ['messages'],
		});

		return rooms;
	}

	async findOne(id: string) {
		const room = await this.roomRepository.findOne(id);

		if (!room) {
			throw new NotFoundException(`Room with id ${id} not found`);
		}

		return room;
	}

	async findOneWithRelations(id: string) {
		const room = await this.roomRepository.findOne(id, {
			relations: ['messages', 'users', 'bannedUsers'],
		});

		if (!room) {
			throw new NotFoundException(`Room with id ${id} not found`);
		}

		return room;
	}

	async findOneByName(name: string) {
		const room = await this.roomRepository.findOne({ name });

		return room;
	}

	async create(createRoomDto: CreateRoomDto) {
		const room = await this.roomRepository.create({ ...createRoomDto });

		return this.roomRepository.save(room);
	}

	async addMessage(addMessageDto: AddMessageDto) {
		const { roomId, userId, text } = addMessageDto;

		const room = await this.findOne(roomId);
		const user = await this.userService.findOne(userId);

		const message = await this.messageRepository.create({
			text,
			room,
			user,
		});

		return this.messageRepository.save(message);
	}

	async update(id: string, updateRoomDto: UpdateRoomDto) {
		const room = await this.roomRepository.preload({
			id,
			...updateRoomDto,
		});

		if (!room) {
			throw new NotFoundException(`Room with id ${id} not found`);
		}

		return this.roomRepository.save(room);
	}

	async banUserFromRoom(banUserDto: BanUserDto) {
		const { roomId, userId } = banUserDto;

		const room = await this.findOne(roomId);
		const user = await this.userService.findOne(userId);

		await this.userService.updateUserRoom(userId, null);

		const bannedUsers = { ...room.bannedUsers, ...user };
		const updateRoom = await this.roomRepository.preload({
			id: roomId,
			bannedUsers,
		});

		return this.roomRepository.save(updateRoom);
	}

	async remove(id: string) {
		const room = await this.findOne(id);
		return this.roomRepository.remove(room);
	}
}
