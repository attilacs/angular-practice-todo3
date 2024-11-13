import { computed, Injectable, signal } from "@angular/core";
import type { Todo } from "../interfaces/todo";

@Injectable({
	providedIn: "root",
})
export class TodoService {
	private readonly storageKey = "todos";
	private loadedTodos = signal<Todo[]>([]);
	todos = this.loadedTodos.asReadonly();

	constructor() {
		this.fetchTodos();
	}

	addTodo(title: string) {
		const id = Date.now().toString();
		const todoToAdd: Todo = {
			id,
			title,
			completed: false,
		};
		const todos = [...this.todos(), todoToAdd];
		this.saveTodos(todos);
	}

	fetchTodos(): void {
		const todosJson = sessionStorage.getItem(this.storageKey);
		const todos = todosJson ? JSON.parse(todosJson) : [];
		this.loadedTodos.set(todos);
	}

	getItems(type = "all"): Todo[] {
		switch (type) {
			case "active":
				return this.todos().filter((todo) => !todo.completed);
			case "completed":
				return this.todos().filter((todo) => todo.completed);
		}
		return this.todos();
	}

	updateTodo(todo: Todo) {
		const todos = this.loadedTodos().map((t) => (t.id !== todo.id ? t : todo));
		this.saveTodos(todos);
	}

	toggleAll(completed: boolean) {
		const todos = this.loadedTodos().map((todo) => ({ ...todo, completed }));
		this.saveTodos(todos);
	}

	deleteTodo(id: string) {
		const todos = this.loadedTodos().filter((todo) => todo.id !== id);
		this.saveTodos(todos);
	}

	clearCompleted() {
		const todos = this.loadedTodos().filter((todo) => !todo.completed);
		this.saveTodos(todos);
	}

	private saveTodos(todos: Todo[]) {
		sessionStorage.setItem(this.storageKey, JSON.stringify(todos));
		this.loadedTodos.set(todos);
	}
}
