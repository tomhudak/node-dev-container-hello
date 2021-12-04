import { model, Schema } from 'mongoose';
import { TodoModel } from '../models/todo.model';

const todoSchema = new Schema<TodoModel>({
  description: { type: String, required: true },
  completed: { type: Boolean, required: true },
}).set('toJSON', { virtuals: true });

export const TodoDbSchema = model<TodoModel>('Todo', todoSchema);
