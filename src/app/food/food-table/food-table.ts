import { Component } from '@angular/core';

@Component({
  selector: 'app-food-table',
  imports: [],
  templateUrl: './food-table.html',
  styleUrl: './food-table.css',
})
export class FoodTable {

  deleteItem(foodName: string) {
    // For now, just log
    console.log('Delete item:', foodName);
    // Later you can call backend API to remove it
  }
  

}
