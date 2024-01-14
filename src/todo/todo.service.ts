import { Injectable, NotFoundException, Query } from '@nestjs/common';
import { Todo } from './entity/todo.entity';
import { CreateTodoInput, UpdateTodoInput, StatusArgs } from './dto';

@Injectable()
export class TodoService {

    private todos: Todo[] = [
        { id: 1, description: 'Piedra del alma', done: false },
        { id: 2, description: 'Piedra del espacio', done: true },
        { id: 3, description: 'Piedra del poder', done: false },
        { id: 4, description: 'Piedra del tiempo', done: false },
    ];

    get totalTodos() {
        return this.todos.length;
    }
    get completedTodos() {
        return this.todos.filter(todo => todo.done === true).length;
    }
    get pendingTodos() {
        return this.todos.filter(todo => todo.done === false).length;
    }

    findAll(statusArgs: StatusArgs): Todo[] {
        const {status} = statusArgs

        if (status !== undefined) return this.todos.filter(todo => todo.done === status); 

        return this.todos;
    }

    findOne(id: number): Todo {

        // find es propio de los arreglos en typescript
        const todo = this.todos.find(todo => todo.id === id)

        if (!todo) throw new NotFoundException(`Todo with id ${id} not found`);

        return todo;
    }

    create(createTodoInput: CreateTodoInput): Todo {
        const todo = new Todo();
        todo.description = createTodoInput.description;
        todo.id = Math.max(...this.todos.map(todo => todo.id), 0) + 1;

        this.todos.push(todo);
        return todo;
    }

    // Es muy común pedir que el primer elemento sea a fuerza en id, y después todo lo demás
    update(id: number, updateTodoInput: UpdateTodoInput) {
        const {description, done} = updateTodoInput
        const todoToUpdate = this.findOne(id);

        if (description) todoToUpdate.description = description;
        // Lo comparo contra undefined porque puede venir falso, y si es falso no quiero que entre
        if (done !== undefined) todoToUpdate.done = done;

        this.todos = this.todos.map(todo => {
            return (todo.id === id) ? todoToUpdate : todo;
        });

        return todoToUpdate;

    }

    detele( id: number): Boolean {
        const todo = this.findOne(id);

        this.todos = this.todos.filter(todo => todo.id !== id);

        return true;
    }
}
