import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../environements/environment';
import { GrandMenuService } from '../../../services/grand-menu.service';
import { RecapValidationComponent } from '../recap-validation/recap-validation.component';

@Component({
  selector: 'app-grand-menu',
  standalone: true,
  imports: [CommonModule, MatDialogModule],
  templateUrl: './grand-menu.component.html',
  styleUrl: './grand-menu.component.css'
})
export class GrandMenuComponent implements OnInit {
  salades: any[] = [];
  host = environment.apiUrl;
  plats: any[] = [];
  desserts: any[] = [];
  selectedSalades: number[] = []; // Update to an array to store multiple selections
  selectedPlats: number[] = [];
  selectedDesserts: number[] = [];
  idOrga: any;
  userId: any;

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private grandMenuService: GrandMenuService, private dialog: MatDialog) {} // Update service injection

  ngOnInit(): void {
      this.getMenus();
    
  }



  getMenus(): void {
    this.grandMenuService.getGrandMenu().subscribe( // Update service method
      response => {
        if (response && response.data && Array.isArray(response.data)) {
          const menuItems = response.data; // Assign response.data to a variable
          menuItems.forEach((item: any) => { // Iterate over menuItems
            console.log(item);
            if (item.attributes.type === 'Entrée') {
              console.log(item.attributes);
              this.salades.push(item.attributes);
            } else if (item.attributes.type === 'Plats') {
              this.plats.push(item.attributes);
            } else if (item.attributes.type === 'Dessert') {
              this.desserts.push(item.attributes);
            }
          });
        } else {
          console.error('Unexpected data structure:', response);
        }
      },
      error => {
        console.error('Error fetching client', error);
      }
    );
  }

  selectItem(type: string, index: number): void {
    switch (type) {
      case 'salades':
        if (!this.selectedSalades.includes(index)) {
          this.selectedSalades.push(index); // Add to the array if not already selected
        }
        this.selectedDesserts = []; // Deselect dessert if a salad is selected
        break;
      case 'plats':
        if (!this.selectedPlats.includes(index)) {
          this.selectedPlats.push(index);
        }
        break;
      case 'desserts':
        if (!this.selectedDesserts.includes(index)) {
          this.selectedDesserts.push(index);
        }
        this.selectedSalades = []; // Deselect salad if a dessert is selected
        break;
    }
  }
  
  toggleSelection(type: string, index: number): void {
    switch (type) {
      case 'salades':
        const saladIndex = this.selectedSalades.indexOf(index);
        if (saladIndex === -1) {
          this.selectedSalades.push(index);
        } else {
          this.selectedSalades.splice(saladIndex, 1);
        }
        break;
      case 'plats':
        const platIndex = this.selectedPlats.indexOf(index);
        if (platIndex === -1) {
          this.selectedPlats.push(index);
        } else {
          this.selectedPlats.splice(platIndex, 1);
        }
        break;
      case 'desserts':
        const dessertIndex = this.selectedDesserts.indexOf(index);
        if (dessertIndex === -1) {
          this.selectedDesserts.push(index);
        } else {
          this.selectedDesserts.splice(dessertIndex, 1);
        }
        break;
    }
  }
  
  isItemSelected(type: string, index: number): boolean {
    switch (type) {
      case 'salades':
        return this.selectedSalades.includes(index);
      case 'plats':
        return this.selectedPlats.includes(index);
      case 'desserts':
        return this.selectedDesserts.includes(index);
      default:
        return false;
    }
  }
  
  submitForm(): void {
    const selectedItems: any = {};
    this.selectedPlats.forEach(index => {
      selectedItems['plats'] = selectedItems['plats'] || [];
      selectedItems['plats'].push(this.plats[index].titre);
    });
    this.selectedDesserts.forEach(index => {
      selectedItems['desserts'] = selectedItems['desserts'] || [];
      selectedItems['desserts'].push(this.desserts[index].titre);
    });
    this.selectedSalades.forEach(index => {
      selectedItems['salades'] = selectedItems['salades'] || [];
      selectedItems['salades'].push(this.salades[index].titre);
    });

    console.log('Selected Items:', selectedItems);

    this.openPopup(selectedItems);
  }

  openPopup(selectedItems: any): void {
    const dialogRef = this.dialog.open(RecapValidationComponent, {
      width: '45%',
      disableClose: true,
      autoFocus: false,
      data:{
        selectedItems:selectedItems,
        title:"Grand Menu",

      }
    });

    dialogRef.afterClosed().subscribe((rows: any[]) => {
      console.log('The popup was closed');
      location.reload()

    });
  }
}