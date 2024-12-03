import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
  imports: [
    NgIf
  ],
  standalone: true
})
export class ModalComponent implements OnChanges {
  @Input() likes!: { ownerOfLike: string }[];
  @Output() closeModal = new EventEmitter<void>();

  likedByUsers: string = '';

  ngOnChanges(): void {
    this.likedByUsers = this.likes.length > 0
      ? this.likes.map((like) => like.ownerOfLike).join(', ')
      : '';
  }

  onClose(): void {
    this.closeModal.emit();
  }
}
