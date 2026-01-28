import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { Sidebar } from '../sidebar/sidebar';
import { AddFood } from '../../food/add-food/add-food';
import { EditFood } from '../../food/edit-food/edit-food';
import { FoodTable } from '../../food/food-table/food-table';

@Component({
  selector: 'app-container',
  standalone: true,
  imports: [NgIf, Sidebar, AddFood, EditFood, FoodTable],
  templateUrl: './container.html',
  styleUrls: ['./container.css']
})
export class Container {
  active: 'add' | 'edit' | 'table' = 'add';
}
