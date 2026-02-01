import { Component, EventEmitter, Output, NgZone } from '@angular/core';
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

    food: FoodItem = { foodName: '', price: 0, category: '', available: 'Yes' };
    imagePreview: string | null = null;
    selectedImage: File | null = null;

    constructor(private foodService: FoodService, private zone: NgZone) {}

    goToTable() {
        this.viewTable.emit();
    }

    onImageSelect(event: any) {
        const file = event.target.files[0];
        if (!file) return;

        this.selectedImage = file;

        const reader = new FileReader();
        reader.onload = () => {
            this.zone.run(() => {
                this.imagePreview = reader.result as string;
            });
        };
        reader.readAsDataURL(file);
    }

    save() {
        if (!this.selectedImage) return;

        const formData = new FormData();
        formData.append('data', JSON.stringify(this.food));
        formData.append('image', this.selectedImage);

        this.foodService.addFood(formData, { responseType: 'text' as 'json' }).subscribe(() => {
            this.zone.run(() => {
                this.food = { foodName: '', price: 0, category: '', available: 'Yes' };
                this.imagePreview = null;
                this.selectedImage = null;
            });
        });
    }
}
