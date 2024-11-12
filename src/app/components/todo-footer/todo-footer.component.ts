import { Component, computed, inject } from "@angular/core";
import { TodoService } from "../../services/todo.service";

@Component({
	selector: "app-todo-footer",
	standalone: true,
	imports: [],
	templateUrl: "./todo-footer.component.html",
	styleUrl: "./todo-footer.component.scss",
})
export class TodoFooterComponent {
	private todoService = inject(TodoService);
	todos = this.todoService.todos;

	activeTodos = computed(
		() => this.todos().filter((todo) => !todo.completed).length,
	);

	activeTodosText = computed(
		() =>
			`${this.activeTodos()} ${this.activeTodos() === 1 ? "item" : "items"} left`,
	);

}
