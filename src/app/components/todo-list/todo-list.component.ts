import { Component, inject, type OnInit } from "@angular/core";
import { TodoItemComponent } from "../todo-item/todo-item.component";
import { TodoService } from "../../services/todo.service";
import { CommonModule } from "@angular/common";

@Component({
	selector: "app-todo-list",
	standalone: true,
	imports: [CommonModule, TodoItemComponent],
	templateUrl: "./todo-list.component.html",
	styleUrl: "./todo-list.component.scss",
})
export class TodoListComponent implements OnInit {
	private todoService = inject(TodoService);
	todos = this.todoService.todos;

	ngOnInit(): void {
		this.todoService.fetchTodos();
	}
}
