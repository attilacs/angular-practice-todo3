import { Injectable, signal } from "@angular/core";
import type { Todo } from "../interfaces/todo";

@Injectable({
	providedIn: "root",
})
export class TodoService {
	private readonly storageKey = "todos";
	private loadedTodos = signal<Todo[]>([]);
	todos = this.loadedTodos.asReadonly();

	fetchTodos(): void {
		const todosJson = sessionStorage.getItem(this.storageKey);
		const todos = todosJson ? JSON.parse(todosJson) : [];
		this.loadedTodos.set(todos);
	}
}
