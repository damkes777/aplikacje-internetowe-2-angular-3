import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {Task} from "../task";
import {HttpClient} from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class TasksService {
    private readonly ULR: string = 'https://lab13.zecer.wi.zut.edu.pl/api/kd51609'

    constructor(private client: HttpClient) {
    }

    public get(archived: boolean = false): Observable<Task[]> {
        return this.client.get<Task[]>(`${this.ULR}?archived=${archived}`)
    }

    public post(task: Task): Observable<any> {
        const body = {
            title: task.title,
            deadline: task.deadline,
            completed: task.completed,
            archived: task.archived
        };
        return this.client.post(this.ULR, body);
    }

    public put(task: Task): Observable<any> {
        const body = {
            title: task.title,
            deadline: task.deadline,
            completed: task.completed,
            archived: task.archived
        };
        return this.client.put(`${this.ULR}/${task.id}`, body);
    }


    public delete(task: Task): Observable<any> {
        return this.client.delete(`${this.ULR}/${task.id}`)
    }

}
