import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FoodItem } from '../../services/food';

@Component({
  selector: 'app-edit-food',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './edit-food.html',
  styleUrls: ['./edit-food.css'],
})
export class EditFood {
  @Output() goToAdd = new EventEmitter<void>();
  @Output() goToTable = new EventEmitter<void>();

  food: FoodItem = {
    foodName: '',
    price: 0,
    category: '',
  };

  imagePreview: string | null = null;
  selectedImage: File | null = null;

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

  update() {
    console.log('Updated food item:', this.food);
  }
}
