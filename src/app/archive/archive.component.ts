import {Component, OnInit} from '@angular/core';
import {TasksService} from "../tasks.service";
import {NavigationComponent} from "../navigation/navigation.component";
import {Task} from "../../task";
import {NgForOf} from "@angular/common";

@Component({
    selector: 'app-archive',
    imports: [
        NavigationComponent,
        NgForOf
    ],
    templateUrl: './archive.component.html',
    styleUrl: './archive.component.css'
})
export class ArchiveComponent implements OnInit {
    tasks: Task[] = []

    constructor(private tasksService: TasksService) {
    }

    ngOnInit(): void {
        this.tasksService.get(true).subscribe(tasks => this.tasks = tasks);
    }

    delete(task: Task) {
        this.tasksService.delete(task).subscribe(() => {
            this.tasks = this.tasks.filter(task => task.id !== task.id);
        });
    }
}
