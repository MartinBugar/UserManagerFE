import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterOutlet} from '@angular/router';
import {Employee} from "./employee";
import {EmployeeService} from "./employee.service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'EmployeeManagerf';

  constructor(private employeeService: EmployeeService) {
  }

  ngOnInit(): void {
    this.getEmployees();
  }

  public employees: Employee[] | undefined;

  public getEmployees(): void {
    this.employeeService.getEmployees()
      .subscribe((response: Employee[]) => {
        console.log(response)
          this.employees = response;
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        });
  }


  protected readonly console = console;
}
