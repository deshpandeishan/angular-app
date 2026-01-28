import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface FoodItem {
  foodId?: number;
  foodName: string;
  price: number;
  category: string;
}

@Injectable({
  providedIn: 'root'
})
export class FoodService {
  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  getFoods(): Observable<FoodItem[]> {
    return this.http.get<FoodItem[]>(`${this.apiUrl}/fooditems`);
  }

  addFood(food: FoodItem, p0: { responseType: "json"; }): Observable<any> {
    return this.http.post(`${this.apiUrl}/fooditem`, food);
  }

  updateFood(food: FoodItem): Observable<any> {
    return this.http.put(`${this.apiUrl}/fooditem`, food);
  }

  deleteFood(food: FoodItem): Observable<any> {
    return this.http.request('delete', `${this.apiUrl}/fooditem`, { body: food });
  }
}
