import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../environements/environment';
import { RecapValidationComponent } from '../recap-validation/recap-validation.component';
import { PokeballService } from '../../../services/pokeball.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pokeball',
  standalone: true,
  imports: [CommonModule, MatDialogModule],
  templateUrl: './pokeball.component.html',
  styleUrl: './pokeball.component.css'
})
export class PokeballComponent implements OnInit{
  pokeBall: any[] = [];
  host = environment.apiUrl;
  
  selectedPokeBall: number[] = []; // Update to an array to store multiple selections

  idOrga: any;
  userId: any;

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private pokeballService: PokeballService, private dialog: MatDialog) {} // Update service injection

  ngOnInit(): void {
      this.getMenus();
    
  }



  getMenus(): void {
    this.pokeballService.getPokeball().subscribe( // Update service method
      response => {
        if (response && response.data && Array.isArray(response.data)) {
          const menuItems = response.data; // Assign response.data to a variable
          menuItems.forEach((item: any) => { // Iterate over menuItems
            console.log(item);
           
              this.pokeBall.push(item.attributes);
            
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

  selectItem(index: number): void {
    
        if (!this.selectedPokeBall.includes(index)) {
          this.selectedPokeBall.push(index); // Add to the array if not already selected
        }
        this.selectedPokeBall = []; // Deselect dessert if a salad is selected
   
    }

  
  toggleSelection(index: number): void {
   
        const pokeBallIndex = this.selectedPokeBall.indexOf(index);

        if (pokeBallIndex === -1) {
          this.selectedPokeBall.push(index);
        } else {
          this.selectedPokeBall.splice(pokeBallIndex, 1);
        }
      
  }
  
  isItemSelected(index: number): boolean {
    
        return this.selectedPokeBall.includes(index);
      
    
  }
  
  submitForm(): void {
    const selectedItems: any = {};
    this.selectedPokeBall.forEach(index => {
      selectedItems['pokeBall'] = selectedItems['pokeBall'] || [];
      selectedItems['pokeBall'].push(this.pokeBall[index].titre);
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
        title:"Poke Ball",

      }
    });

    dialogRef.afterClosed().subscribe((rows: any[]) => {
      console.log('The popup was closed');
      location.reload()

    });
  }
}