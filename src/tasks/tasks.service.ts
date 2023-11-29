/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ITask } from './task.schema';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(@InjectModel('Task') private readonly taskModel: Model<ITask>) {}

  async create(task: CreateTaskDto): Promise<ITask> {
    const createdTask = new this.taskModel(task);
    return createdTask.save();
  }

  async findAll(): Promise<ITask[]> {
    return this.taskModel.find().exec();
  }

  async findOne(id: string): Promise<ITask> {
    return this.taskModel.findById(id).exec();
  }

  async update(id: string, task: UpdateTaskDto): Promise<ITask> {
    return this.taskModel.findByIdAndUpdate(id, task, { new: true }).exec();
  }

  async remove(id: string): Promise<void> {
    await this.taskModel.findByIdAndDelete(id).exec();
  }
}
