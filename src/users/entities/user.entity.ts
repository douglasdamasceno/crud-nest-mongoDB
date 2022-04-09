import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

export type UserDocument = UserEntity & Document;

@Schema()
export class UserEntity {
	@ApiProperty()
	@Prop()
	username: string;

	@ApiProperty()
	@Prop()
	email: string;

	@ApiProperty()
	@Prop()
	password: string;

	@ApiProperty()
	@Prop()
	createAt: Date;

	constructor(user?: Partial<UserEntity>) {
		this.username = user?.username;
		this.email = user?.email;
		this.password = user?.password;
		this.createAt = user?.createAt;
	}
}

export const UserSchema = SchemaFactory.createForClass(UserEntity);
