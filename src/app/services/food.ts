import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';

export interface FoodItem {
    foodId?: number;
    foodName: string;
    price: number;
    category: string;
    available: 'Yes' | 'No';
    imageName?: string;
    imageType?: string;
    imageData?: string;
}

@Injectable({
    providedIn: 'root'
})
export class FoodService {
    private apiUrl = 'http://localhost:8080/api';
    private foodSubject = new BehaviorSubject<FoodItem[]>([]);
    public foodItems$ = this.foodSubject.asObservable();

    constructor(private http: HttpClient, private zone: NgZone) {
        const saved = localStorage.getItem('foodItems');
        if (saved) this.foodSubject.next(JSON.parse(saved));
        this.loadFoods().subscribe();
    }

    loadFoods(): Observable<FoodItem[]> {
        return this.http.get<FoodItem[]>(`${this.apiUrl}/fooditem`).pipe(
            tap(data => {
                this.zone.run(() => {
                    this.foodSubject.next(data);
                    localStorage.setItem('foodItems', JSON.stringify(data));
                });
            })
        );
    }

    addFood(formData: FormData, options: any = {}): Observable<any> {
        return this.http.post(`${this.apiUrl}/fooditem`, formData, options).pipe(
            tap(() => this.loadFoods().subscribe())
        );
    }

    updateFood(food: FoodItem): Observable<any> {
        return this.http.put(`${this.apiUrl}/fooditem`, food).pipe(
            tap(() => this.loadFoods().subscribe())
        );
    }

    deleteItem(food: FoodItem): void {
        if (!food.foodId) return;

        this.zone.run(() => {
            this.foodSubject.next(
                this.foodSubject.value.filter(f => f.foodId !== food.foodId)
            );
            localStorage.setItem('foodItems', JSON.stringify(this.foodSubject.value));
        });

        this.http.delete(`${this.apiUrl}/fooditem`, { body: food }).subscribe();
    }
}
