import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
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
}

export const UserSchema = SchemaFactory.createForClass(User);
