import { Component, computed, inject, type OnInit } from "@angular/core";
import { TodoItemComponent } from "../todo-item/todo-item.component";
import { TodoService } from "../../services/todo.service";
import { CommonModule } from "@angular/common";
import { Location } from "@angular/common";
import type { Todo } from "../../interfaces/todo";

@Component({
	selector: "app-todo-list",
	standalone: true,
	imports: [CommonModule, TodoItemComponent],
	templateUrl: "./todo-list.component.html",
	styleUrl: "./todo-list.component.scss",
})
export class TodoListComponent {
	private location = inject(Location);
	private todoService = inject(TodoService);


	get todos(): Todo[] {
		const filter = this.location.path().split("/")[1] || "all";
		return this.todoService.getItems(filter);
	}

	get path(): string {
		return this.location.path().split("/")[1] || "all";
	}
}
