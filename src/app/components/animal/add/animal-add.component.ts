import {Component, ElementRef, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {AnimalService} from '../../../api/service/animal.service';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-animal-add',
  templateUrl: './animal-add.component.html',
  styleUrls: ['./animal-add.component.css'],
  imports: [
    NgForOf,
    NgIf
  ],
  standalone: true
})
export class AnimalAddComponent {
  @ViewChild('formRef') formRef!: ElementRef<HTMLFormElement>;

  file: File | null = null;
  fieldsCheck = {allFields: false};
  dbError: string[] = [];

  constructor(private animalService: AnimalService, private router: Router) {
  }

  handleFileChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      this.file = target.files[0];
    }
  }

  onSubmitCreate(event: Event): void {
    event.preventDefault();

    const form = this.formRef.nativeElement;
    const name = (form.elements.namedItem('name') as HTMLInputElement)?.value.trim() || '';
    const info = (form.elements.namedItem('info') as HTMLTextAreaElement)?.value.trim() || '';
    const species = (form.elements.namedItem('species') as HTMLTextAreaElement)?.value.trim() || '';

    if (!name || !info || !species || !this.file) {
      this.fieldsCheck.allFields = true;
      return;
    }

    this.fieldsCheck.allFields = false;

    const formData = new FormData();
    formData.append('file', this.file);
    formData.append('name', name);
    formData.append('species', species);
    formData.append('info', info);
    formData.append('username', sessionStorage.getItem('authenticatedUser') || '');

    this.animalService.onCreate(formData).subscribe(
      (response: any) => {
        if (response.cause) {
          this.dbError = response.cause.split(', ');
        } else {
          this.router.navigate(['/animal-manage']);
        }
      },
      (error) => {
        if (error.error.cause) {
          this.dbError = error.error.cause.split(', ');
        } else {
          this.dbError = ['An error occurred while creating the animal.'];
        }
      }
    );
  }
}
