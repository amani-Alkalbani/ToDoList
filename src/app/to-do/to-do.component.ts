import { Component,VERSION  } from '@angular/core';
import { Task} from '../toDoModels/Todo';
import { ServiceService } from '../service.service';
import {FormControl ,FormGroup,  Validators, ValidationErrors, ValidatorFn ,FormBuilder} from '@angular/forms';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faPen } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-to-do',
  templateUrl: './to-do.component.html',
  styleUrls: ['./to-do.component.css']
})
export class ToDoComponent {
  // inputTodo:string='';
  // todo1!: Todo[];

  // constructor() { }
  // ngOnInit(): void {
  //   this.todo1 =  [
  //     {
  //       content: 'Compelete Model5',
  //       completed: false
  //     },
  //     {
  //       content: 'Compelete Model6',
  //       completed: false 
  //     }
  //   ]
  // }
  // toggleDone (id:number) {
  //   this.todo1.map((v,i) => {
  //     if (i==id) v.completed = !v.completed;

  //     return v;
  //   })
  // }
  // deleteTodo (id:number) {
  //   this.todo1 = this.todo1.filter((v ,i) => i !== id);
  // } 

  // addTodo () {
  //   this.todo1.push({
  //     content:this.inputTodo,
  //     completed: false
  //   })
  //   this.inputTodo="";
  // }

  faTrash=faTrash;
  faPen=faPen;
  
  alphaNumberOnly (e:any) {  
    var regex = new RegExp("^[a-zA-Z0-9 ]+$");
    var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
    if (regex.test(str)) {
        return true;
    }

    e.preventDefault();
    return false;
  }

  onPaste(e:any) {
    e.preventDefault();
    return false;
  }


  Todoform=new FormGroup({
    ToDoName: new FormControl('',[Validators.required,Validators.minLength(4), Validators.maxLength(200)])
    
  

  })
  


  get ToDoName(){
    return this.Todoform.get('ToDoName')
  }

  taskObj : Task = new Task();
  taskArr : Task[] = [];

  addTaskValue : string = '';
  editTaskValue : string = '';
  constructor(private crudService : ServiceService) { }


  ngOnInit(): void {
    this.editTaskValue = '';
    this.addTaskValue = '';
    this.taskObj = new Task();
    this.taskArr = [];
    this.getAllTask();
  }
  getAllTask() {
    this.crudService.getAllTask().subscribe(res => {
      this.taskArr = res;
    }, err => {
      alert("Unable to get list of tasks");
    });
  }

  addTask() {
    this.taskObj.task_name = this.addTaskValue;
    this.crudService.addTask(this.taskObj).subscribe(res => {
      this.ngOnInit();
      this.addTaskValue = '';
    }, err => {
      alert(err);
    })
  }

  editTask() {
    this.taskObj.task_name = this.editTaskValue;
    this.crudService.editTask(this.taskObj).subscribe(res => {
      this.ngOnInit();
    }, err=> {
      alert("Failed to update task");
    })
  }

  deleteTask(etask : Task) {
    this.crudService.deleteTask(etask).subscribe(res => {
      this.ngOnInit();
    }, err=> {
      alert("Failed to delete task");
    });
  }

  call(etask : Task) {
    this.taskObj = etask;
    this.editTaskValue = etask.task_name;
  }



}
