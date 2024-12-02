import {Component, OnInit} from '@angular/core';
import {UserService} from '../../api/service/user.service';
import {AddAdminRoleComponent} from './parts/add/add.admin.role.component';
import {NgForOf, NgIf} from '@angular/common';
import {RemoveAdminRoleComponent} from './parts/remove/remove-admin-role.component';
import {DeleteUserComponent} from './parts/delete/delete.user.component';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css'],
  imports: [
    AddAdminRoleComponent,
    NgIf,
    NgForOf,
    RemoveAdminRoleComponent,
    DeleteUserComponent
  ],
  standalone: true
})
export class AdminPanelComponent implements OnInit {
  users: string[] = [];
  error: string | null = null;

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
  }

  fetchUsers(event: Event): void {
    const input = event.target as HTMLInputElement;
    const username = input.value;

    if (username.length > 2) {
      this.userService.getAllUsersBySimilarUsername(username).subscribe(
        (data: string[]) => {
          this.users = data;
          this.error = null;
        },
        (err) => {
          console.error(err);
          this.error = 'Error fetching users. Please try again.';
        }
      );
    } else {
      this.users = [];
    }
  }
}
