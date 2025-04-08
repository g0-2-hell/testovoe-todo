import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project, ProjectDocument } from './project.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ProjectService {
  constructor(
    @InjectModel(Project.name) private projectModel: Model<ProjectDocument>,
  ) {}

  create(createProjectDto: CreateProjectDto) {
    return this.projectModel.create({...createProjectDto, createAt: new Date()});
  }

  findAll() {
    return this.projectModel.find({});
  }

  findOne(_id: string) {
    return this.projectModel.findOne({ _id });
  }

  addEmployee(_id: string, userId: string) {
    return this.projectModel.updateOne(
      { _id },
      { $addToSet: { employees: userId } },
    );
  }

  removeEmployee(_id: string, userId: string) {
    return this.projectModel.updateOne(
      { _id },
      { $pull: { employees: userId } },
    );
  }

  update(_id: string, updateProjectDto: UpdateProjectDto) {
    return this.projectModel.updateOne({ _id }, { ...updateProjectDto });
  }

  remove(_id: string) {
    return this.projectModel.updateOne({ _id }, { isDeleted: true });
  }
}
