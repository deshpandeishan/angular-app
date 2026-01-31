import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FoodService, FoodItem } from '../../services/food';

@Component({
    selector: 'app-add-food',
    standalone: true,
    imports: [FormsModule, CommonModule],
    templateUrl: './add-food.html',
    styleUrls: ['./add-food.css'],
})
export class AddFood {
    @Output() viewTable = new EventEmitter<void>();

    food: FoodItem = {
        foodName: '',
        price: 0,
        category: '',
        available: 'Yes'
    };
    imagePreview: string | null = null;
    selectedImage: File | null = null;

    constructor(private foodService: FoodService) {}

    goToTable() {
        this.viewTable.emit();
    }

    onImageSelect(event: any) {
        const file = event.target.files[0];
        if (!file) return;

        this.selectedImage = file;

        const reader = new FileReader();
        reader.onload = () => {
            this.imagePreview = reader.result as string;
        };
        reader.readAsDataURL(file);
    }

    save() {
        if (!this.selectedImage) {
            console.error("No image selected");
            return;
        }

        const formData = new FormData();
        formData.append('data', JSON.stringify(this.food));
        formData.append('image', this.selectedImage);

        this.foodService.addFood(formData, { responseType: 'text' as 'json' }).subscribe({
            next: () => {
                this.food = { foodName: '', price: 0, category: '', available: 'Yes' };
                this.imagePreview = null;
                this.selectedImage = null;
                console.log('Food item added successfully');
            },
            error: (err) => console.error('Error adding food item:', err)
        });
    }
}
