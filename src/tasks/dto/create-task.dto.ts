/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString, IsBoolean } from 'class-validator';

export class CreateTaskDto {
    @IsNotEmpty()
    @IsString()
    title: string;
    @IsNotEmpty()
    @IsString()
    description: string;
    @IsNotEmpty()
    @IsBoolean()
    done: boolean;
  }