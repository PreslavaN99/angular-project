import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AnimalService} from '../../../api/service/animal.service';
import {NgForOf, NgIf} from '@angular/common';
import {AnimalDeleteModalComponent} from './modal/animal-delete-modal.component';

@Component({
  selector: 'app-animal-by-id',
  templateUrl: './animal-by-id.component.html',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    ReactiveFormsModule,
    AnimalDeleteModalComponent
  ],
  styleUrls: ['./animal-by-id.component.css']
})
export class AnimalByIdComponent implements OnInit {
  animalForm: FormGroup;
  file: File | null = null;
  animal: any = {};
  fieldsCheck = {allFields: false};
  dbErrors: string[] = [];
  names = {username: '', user: ''};

  constructor(
    private fb: FormBuilder,
    private animalService: AnimalService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.animalForm = this.fb.group({
      name: ['', Validators.required],
      species: ['', Validators.required],
      info: ['', Validators.required],
      image: ['']
    });
  }

  ngOnInit(): void {
    this.fetchAnimalById();
    this.names.username = sessionStorage.getItem('authenticatedUser') || '';
  }

  fetchAnimalById(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.animalService.getAnimalById(id).subscribe({
        next: (data) => {
          this.animal = data;
          this.names.user = data.createdBy;
          this.animalForm.patchValue({
            name: data.name,
            species: data.species,
            info: data.info
          });

          if (this.names.user !== this.names.username) {
            this.router.navigate(['/']);
          }
        },
        error: (err) => console.error(err)
      });
    }
  }

  onFileChange(event: any): void {
    this.file = event.target.files[0];
  }

  onSubmit(): void {
    if (this.animalForm.invalid) {
      this.fieldsCheck.allFields = true;
      return;
    }
    this.fieldsCheck.allFields = false;

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const formData = new FormData();
      formData.append('file', this.file || '');
      formData.append('name', this.animalForm.get('name')?.value.trim());
      formData.append('species', this.animalForm.get('species')?.value.trim());
      formData.append('info', this.animalForm.get('info')?.value.trim());
      formData.append('username', sessionStorage.getItem('authenticatedUser') || '');

      this.animalService.editAnimalById(formData, id).subscribe({
        next: (data: any) => {
          if (data.cause) {
            this.dbErrors = data.cause.split(', ');
            return;
          }
          this.router.navigate(['/animal-manage']);
        },
        error: (err) => {
          if (err.error.cause) {
            this.dbErrors = err.error.cause.split(', ');
            return;
          }
          console.error(err)
        }
      });
    }
  }
}
