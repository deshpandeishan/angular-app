import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { Sidebar } from '../sidebar/sidebar';
import { AddFood } from '../../food/add-food/add-food';
import { EditFood } from '../../food/edit-food/edit-food';
import { FoodTable } from '../../food/food-table/food-table';
import { DeleteFood } from '../../food/delete-food/delete-food';

@Component({
  selector: 'app-container',
  standalone: true,
  imports: [NgIf, Sidebar, AddFood, EditFood, FoodTable, DeleteFood],
  templateUrl: './container.html',
  styleUrls: ['./container.css']
})
export class Container {
  active: 'add' | 'edit' | 'delete' | 'table' = 'add';
}
