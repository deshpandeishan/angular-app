import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { AddFood } from '../../food/add-food/add-food';
import { FoodTable } from '../../food/food-table/food-table';

@Component({
    selector: 'app-container',
    standalone: true,
    imports: [NgIf, AddFood, FoodTable],
    templateUrl: './container.html',
    styleUrls: ['./container.css']
})
export class Container {
    active: 'add' | 'edit' | 'table' = 'table';
    toastVisible = false;

    showToast() {
        this.toastVisible = true;
        setTimeout(() => this.toastVisible = false, 1000);
    }
}
