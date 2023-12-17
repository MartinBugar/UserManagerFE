import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {User} from "./user";
import {enviroment} from "../enviroments/enviroment";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiServerUrl = enviroment.apiBaseUrl;

  constructor(private http: HttpClient) {
  }

  public getUsers(): Observable<User[]> {
    return this.http.get<any>(`${this.apiServerUrl}/user/all`);
  }

  public addUser(employee: User): Observable<User> {
    return this.http.post<any>(`${this.apiServerUrl}/user/add`, employee);
  }

  public updateUser(employee: User): Observable<User> {
    return this.http.put<any>(`${this.apiServerUrl}/user/update`, employee);
  }

  public deleteUser(employeeId: number): Observable<void> {
    return this.http.delete<any>(`${this.apiServerUrl}/user/delete/${employeeId}`);
  }
}
