import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MenuService } from '../../../services/menu.service';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { environment } from '../../../environements/environment';
import { SharedService } from '../../../services/shared.service';
// declare const $: any;

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent implements OnInit{
  constructor(private formBuilder: FormBuilder,private router: Router, private menuService: MenuService, private sharedService: SharedService) {}
  salades : any[] = [];
  host = environment.apiUrl;
  plats : any[] = [];
  desserts : any[] = [];
  data : any[] = [];
  id:any;
  days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  menu:any;
  dropdownStates: boolean[] = []; // Array to track dropdown states
  selectedItemsMap: Map<number, Set<string>> = new Map(); // Map to store selected items for each card


  ngOnInit(): void {
    
    this.initializeDropdownStates();

    this.getClientData();
    if (this.id) {
      this.getMenus(this.id);
    }  }
  getMenus(id: number): void {
    this.menuService.getMenusByOrganization(id).subscribe(
      response => {
        if (response && response.data && Array.isArray(response.data)) {
          const menuItems = response.data; // Assign response.data to a variable
  
          menuItems.forEach((item: any) => { // Iterate over menuItems

            if (item.attributes.Type === "Entrée") {
              this.salades.push(item.attributes);
            } else if (item.attributes.Type === "Plats") {
              this.plats.push(item.attributes);
            } else if (item.attributes.Type === "Dessert") {
              this.desserts.push(item.attributes);
            }
          });
        } else {
          console.error('Unexpected data structure:', response);
        }
      },
      error => {
        console.error('Error fetching client', error);
        // Handle error fetching client
      }
    );
  }
  items = [
    { value: '1', label: 'Lundi' },
    { value: '2', label: 'Mardi' },
    { value: '3', label: 'Mercredi' },
    { value: '4', label: 'Jeudi' },
    { value: '4', label: 'Vendredi' }

  ];

  selectedItems = new Set<string>();


  isSelected(index: number, value: string): boolean {
    const selectedItems = this.selectedItemsMap.get(index);
    return selectedItems ? selectedItems.has(value) : false;
  }
  initializeDropdownStates(): void {
    for (let i = 0; i < this.salades.length; i++) {
      this.dropdownStates.push(false); // Initialize dropdown state for each card
    }
  }
  toggleDropdown(index: number): void {
    this.dropdownStates[index] = !this.dropdownStates[index];
  }

  closeDropdown(event: Event, index: number): void {
    const target = event.target as Element;
    if (!target.closest('.dropdown')) {
      this.dropdownStates[index] = false;
    }
  }

  toggleSelection(index: number, value: string): void {
    const selectedItems = this.selectedItemsMap.get(index) || new Set<string>();
    if (selectedItems.has(value)) {
      selectedItems.delete(value);
    } else {
      selectedItems.add(value);
    }
    this.selectedItemsMap.set(index, selectedItems);
  }

  getClientData(){
    this.sharedService.currentData.subscribe(
      (value) => {
        if (value) {
          this.id = value.id;
          this.data = value;
        } else {
          const savedData = localStorage.getItem('clientData');
          if (savedData) {
            const parsedData = JSON.parse(savedData);
            this.id = parsedData.id;
            this.data = parsedData;
          } else {
            console.error('No client data found');
          }
        }
      },
      (error) => {
        console.error('Error receiving data', error);
      }
    );
  }
  submitForm(): void {
    const selectedItems: { title: any; selectedDays: string[]; }[] = [];
    
    // Collect selected items from each card
    this.selectedItemsMap.forEach((value, key) => {
      if (value.size > 0) {
        console.log(value)
        const selectedDays = Array.from(value);
        const title = this.salades[key].Titre; // Adjust this according to your data structure
        selectedItems.push({ title, selectedDays });
      }
    });
    
    // Do something with the selected items, like sending them to a backend API
    console.log(selectedItems);
  }
  
  
}
