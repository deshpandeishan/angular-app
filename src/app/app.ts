import { Component } from '@angular/core';
import { Container } from './layout/container/container';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Container],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {}
