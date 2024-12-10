import { Component, EventEmitter, Output } from '@angular/core';
import { UserService } from '../../../../api/service/user.service';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-remove-admin-role',
  templateUrl: './remove-admin-role.component.html',
  styleUrls: ['./remove-admin-role.component.css'],
  imports: [
    NgIf,
    FormsModule
  ],
  standalone: true
})
export class RemoveAdminRoleComponent {
  @Output() fetchUsers = new EventEmitter<KeyboardEvent>();
  @Output() setError = new EventEmitter<string>();

  enterUsernameRemoveAdminRole: string = '';
  isOpen: boolean = false;

  constructor(private userService: UserService) {}

  toggleModal(event: Event): void {
    event.preventDefault();
    this.isOpen = !this.isOpen;
  }

  onRemoveRole(): void {
    this.isOpen = false;

    this.userService.removeRoleOnUser(this.enterUsernameRemoveAdminRole).subscribe(
      (response: any) => {
        if (response && response.message) {
          this.setError.emit(response.message);

          // Clear the error message after 3 seconds
          setTimeout(() => {
            this.setError.emit('');
          }, 3000);
        }
      },
      (error) => {
        console.error(error);
        this.setError.emit('An error occurred while removing the role.');

        // Clear the error message after 3 seconds
        setTimeout(() => {
          this.setError.emit('');
        }, 3000);
      }
    );

    // Clear the input field after performing the action
    this.enterUsernameRemoveAdminRole = '';
  }

  setUsernameFromInputForRemoveAdmin(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.enterUsernameRemoveAdminRole = target.value;
  }
}
