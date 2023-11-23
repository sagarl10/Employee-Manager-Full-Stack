import { Component, OnInit } from '@angular/core';
import { Employee } from './employee';
import { EmployeeService } from './employee.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title(title: any) {
    throw new Error('Method not implemented.');
  }

  public employees: Employee[]=[];
  public editEmployee: Employee;
  public deleteEmployee: Employee;
  constructor(private employeeService:EmployeeService){
    this.editEmployee={} as Employee;
    this.deleteEmployee={} as Employee;
    
  }
  ngOnInit(): void {
    this.getEmployees();
  }

    public getEmployees(): void {
    this.employeeService.getEmployees().subscribe(
      (response: Employee[]) => {
        this.employees = response;
        console.log(this.employees);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
}
    public onUpdateClick(employee:Employee){
      this.editEmployee=employee;
    }

    public onDeleteClick(employee:Employee){
      this.deleteEmployee=employee;
    }

    public onAddEmployee(addForm:NgForm):void{
      document.getElementById("add-employee-form")?.click;
      this.employeeService.addEmployee(addForm.value).subscribe(
        (response:Employee)=>{this.getEmployees();
        addForm.reset()},
        (error:HttpErrorResponse)=>alert(error.message)
      )

    }

    public onUpdateEmployee(employee:Employee):void{
      // document.getElementById("add-employee-form")?.click;
      this.employeeService.updateEmployee(employee).subscribe(
        (response:Employee)=>this.getEmployees(),
        (error:HttpErrorResponse)=>alert(error.message)
      )

    }

    public onDeleteEmployee(id:number):void{
      // document.getElementById("add-employee-form")?.click;
      this.employeeService.deleteEmployee(id).subscribe(
        (response:void)=>this.getEmployees(),
        (error:HttpErrorResponse)=>alert(error.message)
      )

    }
}

