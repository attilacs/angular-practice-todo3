import { Component, computed, inject } from "@angular/core";
import { TodoService } from "../../services/todo.service";
import { RouterLink } from "@angular/router";
import { Location } from "@angular/common";

@Component({
	selector: "app-todo-footer",
	standalone: true,
	imports: [RouterLink],
	templateUrl: "./todo-footer.component.html",
	styleUrl: "./todo-footer.component.scss",
})
export class TodoFooterComponent {
	private location = inject(Location);
	private todoService = inject(TodoService);
	todos = this.todoService.todos;

	activeTodos = computed(
		() => this.todos().filter((todo) => !todo.completed).length,
	);

	activeTodosText = computed(
		() =>
			`${this.activeTodos()} ${this.activeTodos() === 1 ? "item" : "items"} left`,
	);

	someCompleted = computed(() => this.todos().some((todo) => todo.completed));

	clearCompleted() {
		this.todoService.clearCompleted();
	}

	get path(): string {
		return this.location.path().split("/")[1] || "all";
	}
}
