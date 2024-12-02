import {Component, EventEmitter, Output} from '@angular/core';
import {UserService} from '../../../../api/service/user.service';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.css'],
  imports: [
    NgIf
  ],
  standalone: true
})
export class DeleteUserComponent {
  @Output() setError = new EventEmitter<string>();
  @Output() fetchUsers = new EventEmitter<KeyboardEvent>();

  isOpen: boolean = false;
  enterUsernameDelete: string = '';

  constructor(private userService: UserService) {
  }

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
        }
      },
      (error) => {
        console.error(error);
        this.setError.emit('An error occurred while deleting the user.');
      }
    );

    this.enterUsernameDelete = '';
  }

  enterUsernameForDelete(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.enterUsernameDelete = target.value;
  }
}
