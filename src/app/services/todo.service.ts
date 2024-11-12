import { Injectable, signal } from "@angular/core";
import type { Todo } from "../interfaces/todo";

@Injectable({
	providedIn: "root",
})
export class TodoService {
	private readonly storageKey = "todos";
	private loadedTodos = signal<Todo[]>([]);
	todos = this.loadedTodos.asReadonly();

	addTodo(title: string) {
		const id = Date.now().toString();
		const todoToAdd: Todo = {
			id,
			title,
			completed: false,
		};
		sessionStorage.setItem(
			this.storageKey,
			JSON.stringify([...this.todos(), todoToAdd]),
		);
		this.loadedTodos.update((todos) => [...todos, todoToAdd]);
	}

	fetchTodos(): void {
		const todosJson = sessionStorage.getItem(this.storageKey);
		const todos = todosJson ? JSON.parse(todosJson) : [];
		this.loadedTodos.set(todos);
	}
}
