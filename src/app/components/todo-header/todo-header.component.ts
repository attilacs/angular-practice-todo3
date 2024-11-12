import { Component, computed, inject } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { TodoService } from "../../services/todo.service";

@Component({
	selector: "app-todo-header",
	standalone: true,
	imports: [ReactiveFormsModule],
	templateUrl: "./todo-header.component.html",
	styleUrl: "./todo-header.component.scss",
})
export class TodoHeaderComponent {
	private todoService = inject(TodoService);
	todos = this.todoService.todos;
	form = new FormGroup({
		title: new FormControl(""),
	});

	isAllCompleted = computed(() => this.todos().every((todo) => todo.completed));

	onEnter() {
		this.onSubmit();
	}

	onSubmit() {
		const title = this.form.value.title?.trim();
		if (!title) {
			return;
		}
		this.todoService.addTodo(title);
		this.form.reset();
	}

	toggleAll(e: Event) {
		const input = e.target as HTMLInputElement;
		this.todoService.toggleAll(input.checked);
	}
}
