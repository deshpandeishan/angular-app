import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FoodService, FoodItem } from '../../services/food';

@Component({
    selector: 'app-food-table',
    standalone: true,
    imports: [CommonModule, HttpClientModule],
    templateUrl: './food-table.html',
    styleUrls: ['./food-table.css']
})
export class FoodTable implements OnInit {
    @Output() addFood = new EventEmitter<void>();
    @Output() editFood = new EventEmitter<FoodItem>();

    foodItems: FoodItem[] = [];

    constructor(private foodService: FoodService) {}

    ngOnInit(): void {
        this.foodService.foodItems$.subscribe(data => this.foodItems = data);
    }

    goToAdd() {
        this.addFood.emit();
    }

    goToEdit(food: FoodItem) {
        this.editFood.emit(food);
    }

    deleteItem(food: FoodItem) {
        if (confirm(`Are you sure you want to delete ${food.foodName}?`)) {
            this.foodService.deleteItem(food);
        }
    }
}
