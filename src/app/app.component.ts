import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Tasks } from './Models/tasks';
import { MatDatepickerInputEvent } from '@angular/material/datepicker'
import * as moment from 'moment';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit, OnChanges {
  title = 'To-Do-List';
  value = "";
  Tasks: Array<Tasks> = [];
  newTasks: Array<Tasks> = [];
  isEditVisible: boolean = false;
  toUpdateId: Tasks = {
    id: 0,
    task: '',
    isCompleted: false,
    createDate: '',
    updateDate: '',
    isUpdated: false

  };
  searchText = '';
  picker = '';
  isFiltered: boolean = false;
  constructor() {
  }
  ngOnChanges(changes: SimpleChanges): void {

  }


  ngOnInit(): void {
    this.Tasks = JSON.parse(localStorage.getItem("Tasks") || "[]");
    console.log(this.Tasks);
    console.log(this.picker);
  }



  addTask() {
    if (this.value) {
      var Tasks = JSON.parse(localStorage.getItem("Tasks") || "[]");
      var task = {
        id: Math.floor(Math.random() * 100),
        task: this.value,
        isCompleted: false,
        createDate: new Date(Date.now()).toLocaleDateString(),
        isUpdated: false
      };
      Tasks.unshift(task);
      console.log("Added user #" + task.id);
      localStorage.setItem("Tasks", JSON.stringify(Tasks));
      window.location.reload();
    }
    else {
      alert("No value for task");
    }
  }



  editTask(data: Tasks) {
    this.isEditVisible = true;
    this.value = data.task;
    this.toUpdateId = data;
    console.log(this.isEditVisible);
  }

  updateTask() {
    let index = this.Tasks.indexOf(this?.toUpdateId)
    this.Tasks[index].task = this.value;
    this.Tasks[index].isUpdated = true;
    this.Tasks[index].updateDate = JSON.stringify(Date.now());
    this.Tasks.unshift(this.Tasks.splice(this.Tasks.indexOf(this.toUpdateId), 1)[0]);
    localStorage.setItem("Tasks", JSON.stringify(this.Tasks));
    this.isEditVisible = false;
    this.value = "";
    alert("Updated Task");

  }

  completedTask(data: Tasks) {
    alert("Completed Task");
    data.isCompleted = true;
    this.Tasks.push(this.Tasks.splice(this.Tasks.indexOf(data), 1)[0]);
    localStorage.setItem("Tasks", JSON.stringify(this.Tasks));
    console.log(this.Tasks);
  }

  deletedTask(data: Tasks) {
    this.Tasks.splice(this.Tasks.indexOf(data), 1);
    localStorage.setItem("Tasks", JSON.stringify(this.Tasks));
    //alert("Are you sure you want to delete?");


  }
  events: string = '';

  addEvent(event: MatDatepickerInputEvent<Date>) {
    this.isFiltered = true;
    this.events = JSON.stringify(`${event.value?.toLocaleDateString()}`);
    console.log(this.events);
    this.newTasks = this.Tasks.filter((obj) => {
      return obj.createDate == event.value?.toLocaleDateString();
    })
    console.log(this.newTasks);
  }
}



