import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MenuService } from '../../../services/menu.service';
import { RecapValidationComponent } from '../recap-validation/recap-validation.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../environements/environment';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  standalone: true,
  imports: [CommonModule, MatDialogModule],
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  salades: any[] = [];
  host = environment.apiUrl;
  plats: any[] = [];
  desserts: any[] = [];
  selectedSalades: number | null = null;
  selectedPlats: number | null = null;
  selectedDesserts: number | null = null;
  idOrga: any;
  userId: any;

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private menuService: MenuService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.getClientData();
    if (this.idOrga) {
      this.getMenus(this.idOrga);
    }
  }

  getClientData() {
    this.route.queryParamMap.subscribe(
      (params) => {
        // this.idOrga = params.get('orgaId');
        // this.userId = params.get('userId');
        this.idOrga =localStorage.getItem('orgaId');
        this.userId = localStorage.getItem('userId');
        // this.username = localStorage.getItem('username');
      }
    );
    console.log(this.idOrga);
  }

  getMenus(id: number): void {
    console.log(id);
    this.menuService.getMenusByOrganization(id).subscribe(
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
            } else if (item.attributes.type === 'Desserts') {
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
        this.selectedSalades = index;
        this.selectedDesserts = null; // Deselect dessert if a salad is selected
        break;
      case 'plats':
        this.selectedPlats = index;
        break;
      case 'desserts':
        this.selectedDesserts = index;
        this.selectedSalades = null; // Deselect salad if a dessert is selected
        break;
    }
  }
  toggleSelection(type: string, index: number): void {
    switch (type) {
      case 'salades':
        this.selectedSalades = this.selectedSalades === index ? null : index; // Toggle selection
        this.selectedDesserts = null; // Deselect dessert if a salad is selected
        break;
      case 'plats':
        this.selectedPlats = this.selectedPlats === index ? null : index; // Toggle selection
        break;
      case 'desserts':
        this.selectedDesserts = this.selectedDesserts === index ? null : index; // Toggle selection
        this.selectedSalades = null; // Deselect salad if a dessert is selected
        break;
    }
  }
  
  isItemSelected(type: string, index: number): boolean {
    switch (type) {
      case 'salades':
        return this.selectedSalades === index;
      case 'plats':
        return this.selectedPlats === index;
      case 'desserts':
        return this.selectedDesserts === index;
      default:
        return false;
    }
  }
  
  isButtonDisabled(type: string, index: number): boolean {
    switch (type) {
      case 'salades':
        return (this.selectedSalades !== null  || this.selectedDesserts !== null )&& this.selectedSalades !== index;
      case 'plats':
        return this.selectedPlats !== null && this.selectedPlats !== index;
      case 'desserts':
        return (this.selectedDesserts !== null || this.selectedSalades !== null) && this.selectedDesserts !== index;
      default:
        return false;
    }
  }
  

  submitForm(): void {

    interface SelectedItems {
      plats?: string;
      desserts?: string;
      salades?: string;

    }
    
    const selectedItems: SelectedItems = {};
if (this.selectedPlats !== null) {
  selectedItems['plats'] = this.plats[this.selectedPlats].titre;
}

if (this.selectedDesserts !== null) {
  selectedItems['desserts'] = this.desserts[this.selectedDesserts].titre;
}

if (this.selectedSalades !== null) {
  selectedItems['salades'] = this.salades[this.selectedSalades].titre;
}
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
        title:"Menu Collectif",

      }
    });

    dialogRef.afterClosed().subscribe((rows: any[]) => {
      console.log('The popup was closed');
      location.reload()

    });
  }
}
