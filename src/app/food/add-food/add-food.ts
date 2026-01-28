import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FoodService, FoodItem } from '../../services/food';

@Component({
  selector: 'app-add-food',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-food.html',
  styleUrls: ['./add-food.css'],
})
export class AddFood {
  food: FoodItem = { foodName: '', price: 0, category: '' };

  constructor(private foodService: FoodService) {}

  save() {
    this.foodService.addFood(this.food, { responseType: 'text' as 'json' }).subscribe({
      next: (res) => {
        console.log('Food added', res);
        this.food = { foodName: '', price: 0, category: '' };
      },
      error: (err) => console.error(err)
    });
  }
  
}
