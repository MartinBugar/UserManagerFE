import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterOutlet} from '@angular/router';
import {User} from "./user";
import {UserService} from "./user.service";
import {HttpErrorResponse} from "@angular/common/http";
import {FormsModule, NgForm} from "@angular/forms";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'EmployeeManagerf';

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.getEmployees();
  }

  public users: User[] | undefined;
  public editUser: User | undefined;
  public deleteUser: User | undefined;

  public getEmployees(): void {
    this.userService.getUsers()
      .subscribe((response: User[]) => {
          this.users = response;
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        });
  }

  public onOpenModal(employee: any, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addUserModal');
    }
    if (mode === 'edit') {
      this.editUser = employee;
      button.setAttribute('data-target', '#updateUserModal');
    }
    if (mode === 'delete') {
      this.deleteUser = employee;
      button.setAttribute('data-target', '#deleteUserModal');
    }
    // @ts-ignore
    container.appendChild(button);
    button.click();
  }

  public onAddEmployee(addForm: NgForm): void {
    // @ts-ignore
    document.getElementById('add-employee-form').click();
    this.userService.addUser(addForm.value).subscribe(
      (response: User) => {
        console.log(response);
        this.getEmployees();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public onUpdateEmployee(employee: User): void {
    this.userService.updateUser(employee).subscribe(
      (response: User) => {
        console.log(response);
        this.getEmployees();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteEmployee(employeeId: number | undefined): void {
    if (employeeId != null) {
      this.userService.deleteUser(employeeId).subscribe(
        (response: void) => {
          console.log(response);
          this.getEmployees();
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
    }
  }


}


