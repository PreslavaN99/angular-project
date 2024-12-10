import { Component, EventEmitter, Output } from '@angular/core';
import { UserService } from '../../../../api/service/user.service';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-admin-role',
  templateUrl: './add-admin-role.component.html',
  styleUrls: ['./add-admin-role.component.css'],
  imports: [
    NgIf,
    FormsModule
  ],
  standalone: true
})
export class AddAdminRoleComponent {
  @Output() fetchUsers = new EventEmitter<KeyboardEvent>();
  @Output() setError = new EventEmitter<string>();

  enterUsernameAdminRole: string = '';
  isOpen: boolean = false;

  constructor(private userService: UserService) {}

  toggleModal(event: Event): void {
    event.preventDefault();
    this.isOpen = !this.isOpen;
  }

  onUpgradeRole(): void {
    this.isOpen = false;

    this.userService.upgradeRoleOnUser(this.enterUsernameAdminRole).subscribe(
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
        this.setError.emit('An error occurred while upgrading the role.');

        // Clear the error message after 3 seconds
        setTimeout(() => {
          this.setError.emit('');
        }, 3000);
      }
    );

    // Clear the input field after performing the action
    this.enterUsernameAdminRole = '';
  }

  setUsernameFromInputForAdminRole(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.enterUsernameAdminRole = target.value;
  }
}
