import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entities/user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

const usersEntityList: UserEntity[] = [
	new UserEntity({
		username: 'username 1',
		password: '123456',
		email: 'user1@email.com',
	}),
];

const newUserEntity = new UserEntity({
	username: 'username',
	email: 'user@email.com',
	password: '123456',
	createAt: new Date(),
});
const updatedUserEntity = new UserEntity({
	username: 'username2',
	email: 'user2@email.com',
	password: '123456',
});

describe('Test suite UserController', () => {
	let usersController: UsersController;
	let usersService: UsersService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [UsersController],
			providers: [
				{
					provide: UsersService,
					useValue: {
						findAll: jest.fn().mockResolvedValue(usersEntityList),
						create: jest.fn().mockResolvedValue(newUserEntity),
						findOne: jest.fn().mockResolvedValue(usersEntityList[0]),
						update: jest.fn().mockResolvedValue(updatedUserEntity),
						remove: jest.fn().mockResolvedValue(undefined),
					},
				},
			],
		}).compile();
		usersController = module.get<UsersController>(UsersController);
		usersService = module.get<UsersService>(UsersService);
	});
	it('should be defined', () => {
		expect(usersController).toBeDefined();
		expect(usersService).toBeDefined();
	});
	describe('Method FindAll', () => {
		it('should return a users list entity successfuly', async () => {
			const result = await usersController.findAll();
			expect(result).toEqual(usersEntityList);
			expect(typeof result).toEqual('object');
			expect(usersService.findAll).toHaveBeenCalledTimes(1);
		});
		it('should throw an exception', () => {
			jest.spyOn(usersService, 'findAll').mockRejectedValueOnce(new Error());
			expect(usersController.findAll()).rejects.toThrowError();
		});
	});
	describe('Method Create', () => {
		it('should create a new user item successfully', async () => {
			const body: CreateUserDto = {
				username: 'username',
				email: 'user@email.com',
				password: '123456',
			};
			const result = await usersController.create(body);
			expect(result).toEqual(newUserEntity);
			//expect(usersController.create).toHaveBeenCalledTimes(1);
			expect(usersService.create).toHaveBeenCalledTimes(1);
		});
		it('should throw an exception', () => {
			const body: CreateUserDto = {
				username: 'username',
				email: 'user@email.com',
				password: '123456',
			};
			jest.spyOn(usersService, 'create').mockRejectedValueOnce(new Error());
			expect(usersController.create(body)).rejects.toThrowError();
		});
	});
	describe('Method FindOne', () => {
		it('should get a user item successfully', async () => {
			const result = await usersController.findOne('1');
			expect(result).toEqual(usersEntityList[0]);
			expect(usersService.findOne).toHaveBeenCalledTimes(1);
			expect(usersService.findOne).toHaveBeenCalledWith('1');
		});
		it('should throw an exception', () => {
			jest.spyOn(usersService, 'findOne').mockRejectedValueOnce(new Error());
			expect(usersController.findOne('1')).rejects.toThrowError();
		});
	});
	describe('Method Update', () => {
		it('should update a user item successfully', async () => {
			const body: CreateUserDto = {
				username: 'username2',
				email: 'user2@email.com',
				password: '123456',
			};
			const result = await usersController.update('1', body);
			expect(result).toEqual(updatedUserEntity);
			expect(usersService.update).toHaveBeenCalledTimes(1);
			expect(usersService.update).toHaveBeenCalledWith('1', body);
		});
		it('should throw an exception', () => {
			const body: CreateUserDto = {
				username: 'username',
				email: 'user@email.com',
				password: '123456',
			};
			jest.spyOn(usersService, 'update').mockRejectedValueOnce(new Error());
			expect(usersController.update('1', body)).rejects.toThrowError();
		});
	});
	describe('Method Remove', () => {
		it('should remove a user item successfully', async () => {
			const result = await usersController.remove('1');
			expect(result).toBeUndefined();
		});
		it('should throw an exception', () => {
			jest.spyOn(usersService, 'remove').mockRejectedValueOnce(new Error());
		});
	});
});
