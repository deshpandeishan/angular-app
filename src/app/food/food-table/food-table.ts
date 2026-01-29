import { Component, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'app-food-table',
    templateUrl: './food-table.html',
    styleUrls: ['./food-table.css'],
})
export class FoodTable {
    @Output() addFood = new EventEmitter<void>();
    @Output() editFood = new EventEmitter<void>();

    goToAdd() {
        this.addFood.emit();
    }

    goToEdit() {
        this.editFood.emit();
    }
}
