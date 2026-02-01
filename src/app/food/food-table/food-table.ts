import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { FoodService, FoodItem } from '../../services/food';
import * as bootstrap from 'bootstrap';

@Component({
    selector: 'app-food-table',
    standalone: true,
    imports: [CommonModule, HttpClientModule, FormsModule],
    templateUrl: './food-table.html',
    styleUrls: ['./food-table.css']
})
export class FoodTable implements OnInit {
    @Output() addFood = new EventEmitter<void>();
    @Output() editFood = new EventEmitter<FoodItem>();

    foodItems: FoodItem[] = [];
    selectedFood: FoodItem = {
        foodName: '',
        price: 0,
        category: '',
        // available: true,
        imageName: '',
        imageType: 'image/png',
        imageData: ''
    };
    private modalInstance: bootstrap.Modal | null = null;

    constructor(private foodService: FoodService) {}

    ngOnInit(): void {
        this.foodService.foodItems$.subscribe(data => this.foodItems = data);

        const modalEl = document.getElementById('foodModal');
        if (modalEl) {
            document.body.appendChild(modalEl);
            this.modalInstance = new bootstrap.Modal(modalEl, { backdrop: 'static', focus: true });
        }
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

    openViewModal(food: FoodItem) {
        this.selectedFood = {
            foodId: food.foodId,
            foodName: food.foodName || '',
            price: food.price || 0,
            category: food.category || 'Starter',
            // available: food.available ?? true,
            imageName: food.imageName || '',
            imageType: food.imageType || 'image/png',
            imageData: food.imageData || ''
        };
        this.modalInstance?.show();
    }

    saveChanges() {
        this.foodService.updateFood(this.selectedFood).subscribe(() => {
            this.modalInstance?.hide();
        });
    }
}
