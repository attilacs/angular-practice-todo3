import { Component, inject } from "@angular/core";
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
	form = new FormGroup({
		title: new FormControl(""),
	});

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
}
