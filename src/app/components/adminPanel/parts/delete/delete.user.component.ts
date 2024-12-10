import { Component, EventEmitter, Output } from '@angular/core';
import { UserService } from '../../../../api/service/user.service';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.css'],
  imports: [
    NgIf,
    FormsModule
  ],
  standalone: true
})
export class DeleteUserComponent {
  @Output() setError = new EventEmitter<string>();
  @Output() fetchUsers = new EventEmitter<KeyboardEvent>();

  isOpen: boolean = false;
  enterUsernameDelete: string = '';

  constructor(private userService: UserService) {}

  toggleModal(event: Event): void {
    event.preventDefault();
    this.isOpen = !this.isOpen;
  }

  onDeleteUser(): void {
    this.isOpen = false;

    this.userService.deleteUser(this.enterUsernameDelete).subscribe(
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
        this.setError.emit('An error occurred while deleting the user.');

        // Clear the error message after 3 seconds
        setTimeout(() => {
          this.setError.emit('');
        }, 3000);
      }
    );

    // Clear the input field after performing the action
    this.enterUsernameDelete = '';
  }

  enterUsernameForDelete(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.enterUsernameDelete = target.value;
  }
}
