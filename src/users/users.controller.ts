import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { IndexUserSwagger } from './swagger/index-user.swagger';
import { CreateUserSwagger } from './swagger/create-user.swagger';
import { BadRequestSwagger } from './helpers/swagger/bad-request.swagger';
import { NotFoundSwagger } from './helpers/swagger/not-found.swagger';

@Controller('users')
@ApiTags('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Post()
	@ApiOperation({ summary: 'Criar um novo usuário no sistema' })
	@ApiResponse({
		status: 200,
		description: 'Criar usuário',
		type: CreateUserSwagger,
	})
	@ApiResponse({
		status: 400,
		description: 'Parâmetros inválidos',
		type: BadRequestSwagger,
	})
	create(@Body() createUserDto: CreateUserDto) {
		return this.usersService.create(createUserDto);
	}

	@Get()
	@ApiOperation({ summary: 'Listar todos usuários no sistema' })
	@ApiResponse({
		status: 200,
		description: 'Listar usuários',
		type: IndexUserSwagger,
		isArray: true,
	})
	findAll() {
		return this.usersService.findAll();
	}

	@Get(':id')
	@ApiOperation({ summary: 'Listar um usuário no sistema' })
	@ApiResponse({
		status: 200,
		description: 'Listar usuário',
		type: IndexUserSwagger,
	})
	@ApiResponse({
		status: 400,
		description: 'Parâmetros inválidos',
		type: BadRequestSwagger,
	})
	@ApiResponse({
		status: 404,
		description: 'Usuario não encontrado',
		type: NotFoundSwagger,
	})
	findOne(@Param('id') id: string) {
		return this.usersService.findOne(id);
	}

	@ApiOperation({ summary: 'Atualizar usuário no sistema' })
	@ApiResponse({ status: 200, description: 'Atualizar usuário' })
	@ApiResponse({
		status: 400,
		description: 'Parâmetros inválidos',
		type: BadRequestSwagger,
	})
	@ApiResponse({
		status: 404,
		description: 'Usuario não encontrado',
		type: NotFoundSwagger,
	})
	@Patch(':id')
	update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
		return this.usersService.update(id, updateUserDto);
	}

	@ApiOperation({ summary: 'Deletar usuário no sistema' })
	@ApiResponse({ status: 200, description: 'Deletar usuário' })
	@ApiResponse({
		status: 400,
		description: 'Parâmetros inválidos',
		type: BadRequestSwagger,
	})
	@ApiResponse({
		status: 404,
		description: 'Usuario não encontrado',
		type: NotFoundSwagger,
	})
	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.usersService.remove(id);
	}
}
