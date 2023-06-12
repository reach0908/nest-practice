import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { Repository } from 'typeorm'

import { User } from './entities/user.entity'
import { Room } from 'src/room/entities/room.entity'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) {}

    async create(createUserDto: CreateUserDto) {
        const user = await this.userRepository.create({
            ...createUserDto
        })

        return this.userRepository.save(user)
    }

    async findAll() {
        const users = await this.userRepository.find()
        return users
    }

    async findOne(id: string) {
        const user = await this.userRepository.findOne({
            where: { id },
            relations: ['room']
        })

        if (!user) {
            throw new NotFoundException(`There is no user with id ${id}`)
        }

        return user
    }

    async findByUsername(username: string) {
        const user = await this.userRepository.findOneBy({ username })

        return user
    }

    async update(id: string, updateUserDto: UpdateUserDto) {
        const user = await this.userRepository.preload({
            id,
            ...updateUserDto
        })

        if (!user) {
            throw new NotFoundException(`There is no user with id ${id}`)
        }

        return this.userRepository.save(user)
    }

    async remove(id: string) {
        const user = await this.findOne(id)

        return this.userRepository.remove(user)
    }
}
