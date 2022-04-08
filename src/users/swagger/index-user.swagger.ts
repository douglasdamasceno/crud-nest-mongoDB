import { OmitType } from '@nestjs/swagger';
import { User } from '../entities/user.entity';

export class IndexUserSwagger extends OmitType(User, ['createAt']) {}
