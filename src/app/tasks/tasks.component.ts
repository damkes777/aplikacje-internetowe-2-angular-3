import {Component, OnInit} from '@angular/core';
import {TasksService} from "../tasks.service";
import {Task} from "../../task";
import {FormsModule} from "@angular/forms";
import {NgForOf} from "@angular/common";
import {NavigationComponent} from "../navigation/navigation.component";

@Component({
    selector: 'app-tasks',
    imports: [
        FormsModule,
        NgForOf,
        NavigationComponent
    ],
    templateUrl: './tasks.component.html',
    styleUrl: './tasks.component.css'
})
export class TasksComponent implements OnInit {
    taskValue: string = ''
    taskDate: string = ''
    tasks: Task[] = [];

    constructor(private tasksService: TasksService) {
    }

    ngOnInit(): void {
        this.tasksService.get().subscribe(tasks => this.tasks = tasks);
    }

    create(): void {
        const newTask: Task = {
            title: this.taskValue,
            deadline: new Date(this.taskDate),
            completed: false,
            archived: false
        };

        this.tasksService.post(newTask).subscribe(task => {
            console.log(task)
            this.tasks.push(task);
            this.taskValue = '';
            this.taskDate = '';
        });
    }

    changeCompleted(id: number | undefined): void {
        const task = this.tasks.find(task => task.id === id);
        console.log(task)
        if (task) {
            this.tasksService.put(task).subscribe();
        }
    }

    archiveCompleted() {
        const completedTasks = this.tasks.filter(task => task.completed === true);
        completedTasks.forEach(task => {
            task.archived = true;
            console.log(task)
            this.tasksService.put(task).subscribe(() => {
                this.tasks = this.tasks.filter(t => !t.archived);
            });
        });
    }
}
