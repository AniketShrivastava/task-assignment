import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

/* Angular Material */
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTable, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    MatCardModule
  ],
  templateUrl: './task.component.html'
})
export class TaskComponent implements OnInit {

  @ViewChild(MatTable) table!: MatTable<any>;

  userForm!: FormGroup;
  displayedColumns: string[] = ['index', 'name', 'action'];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.userForm = this.fb.group({
      users: this.fb.array([]),
      currentUser: this.fb.group({
        name: ['', Validators.required]
      })
    });
  }

  get users(): FormArray {
    return this.userForm.get('users') as FormArray;
  }

  get currentUser(): FormGroup {
    return this.userForm.get('currentUser') as FormGroup;
  }

  addUser(): void {
    if (this.currentUser.invalid) return;

    this.users.push(
      this.fb.group({
        name: this.currentUser.value.name
      })
    );

    this.table.renderRows(); 
    this.currentUser.reset();
  }

  deleteUser(index: number): void {
    this.users.removeAt(index);
    this.table.renderRows(); 
  }
}
