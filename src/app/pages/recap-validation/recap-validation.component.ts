import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-recap-validation',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  templateUrl: './recap-validation.component.html',
  styleUrl: './recap-validation.component.css'
})
export class RecapValidationComponent implements OnInit {
  saladeSelected: string[] = [];
  platsSelected: string[] = [];
  dessertSelected: string[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<RecapValidationComponent>) { }

  ngOnInit(): void {
    if (this.data && this.data.selectedItems) {
      this.saladeSelected = this.data.selectedItems.salades || [];
      this.platsSelected = this.data.selectedItems.plats || [];
      this.dessertSelected = this.data.selectedItems.desserts || [];
    }
  }

  close(): void {
    this.dialogRef.close();
  }

  confirmSelection(): void {
    console.log("confirmed");
    this.close();
  }

  cancelSelection(): void {
    this.close();
  }
}
