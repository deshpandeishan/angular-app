import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.css']
})
export class Sidebar {
  @Output() menuSelect = new EventEmitter<'add' | 'edit' | 'table'>();
  active: 'add' | 'edit' | 'table' | '' = '';

  select(value: 'add' | 'edit' | 'table') {
    this.active = value;
    this.menuSelect.emit(value);
  }
}
