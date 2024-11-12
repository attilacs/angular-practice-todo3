import { computed, Injectable, signal } from "@angular/core";
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

	updateTodo(todo: Todo) {
		const todos = this.loadedTodos().map((t) => (t.id !== todo.id ? t : todo));
		sessionStorage.setItem(this.storageKey, JSON.stringify(todos));
		this.loadedTodos.set(todos);
	}

	toggleAll(completed: boolean) {
		const todos = this.loadedTodos().map((todo) => ({ ...todo, completed }));
		sessionStorage.setItem(this.storageKey, JSON.stringify(todos));
		this.loadedTodos.set(todos);
	}

	deleteTodo(id: string) {
		const todos = this.loadedTodos().filter((todo) => todo.id !== id);
		sessionStorage.setItem(this.storageKey, JSON.stringify(todos));
		this.loadedTodos.set(todos);
	}
}
