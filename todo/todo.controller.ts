import express, { Request, Response } from 'express';
import { UpdateRequest } from '../models/update.request';
import { CreateRequest } from '../models/create.request';
import { ResponseModel } from '../models/response.model';
import { TodoModel } from '../models/todo.model';

import { TodoDbSchema } from './todo.schema';

// Create and Save a new Message
export const create = async (
  req: Request<{}, {}, CreateRequest>,
  res: Response<ResponseModel>
) => {
  const todo = {
    completed: false,
    description: req.body.description,
  } as TodoModel;
  const db = new TodoDbSchema(todo);
  try {
    const result = await db.save();
    res.send({
      success: true,
      error: '',
      payload: result.id,
    } as ResponseModel);
  } catch (err) {
    res.status(500).send({
      success: false,
      error: err,
      payload: '',
    } as ResponseModel);
  }
};

export const findAll = async (
  req: express.Request,
  res: express.Response<TodoModel[]>
) => {
  const todos = await TodoDbSchema.find();
  res.send(todos);
};

export const findAllIncomplete = async (
  req: express.Request,
  res: express.Response<TodoModel[]>
) => {
  const todos = await TodoDbSchema.find({ completed: false });
  res.send(todos);
};

export const findOne = async (
  req: express.Request<{ id: string }>,
  res: express.Response<TodoModel>
) => {
  const todo = await TodoDbSchema.findById(req.params.id);
  res.send(todo);
};
export const update = async (
  req: express.Request<{ id: string }, {}, UpdateRequest>,
  res: express.Response<ResponseModel>
) => {
  try {
    await TodoDbSchema.updateOne(
      { _id: req.params.id },
      { completed: req.body.completed },
      { upsert: true }
    );
    res.send({
      success: true,
      error: '',
      payload: 'Update successful',
    } as ResponseModel);
  } catch (err) {
    console.log(err);
    if (err.kind === 'ObjectId') {
      return res.status(404).send();
    }
    res.status(500).send({
      success: false,
      error: err,
      payload: {},
    } as ResponseModel);
  }
};

export const remove = async (
  req: express.Request<{ id: string }>,
  res: express.Response<ResponseModel>
) => {
  try {
    await TodoDbSchema.findByIdAndDelete(req.params.id);
    res.send({
      success: true,
      error: '',
      payload: 'Delete successful',
    } as ResponseModel);
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res.status(404).send();
    }
    res.status(500).send({
      success: false,
      error: err,
      payload: {},
    } as ResponseModel);
  }
};
