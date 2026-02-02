import { Component, EventEmitter, Output, NgZone, ViewChild, ElementRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FoodService, FoodItem } from '../../services/food';
import * as bootstrap from 'bootstrap';

@Component({
    selector: 'app-add-food',
    standalone: true,
    imports: [FormsModule, CommonModule],
    templateUrl: './add-food.html',
    styleUrls: ['./add-food.css'],
})
export class AddFood {
    @Output() viewTable = new EventEmitter<void>();
    @Output() itemAdded = new EventEmitter<void>();

    @ViewChild('viewTableBtn', { static: false }) viewTableBtn!: ElementRef;

    food: FoodItem = { foodName: '', price: 0, category: '' };
    imagePreview: string | null = null;
    selectedImage: File | null = null;

    showToast = false;
    private tooltip: bootstrap.Tooltip | null = null;

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
                this.food = { foodName: '', price: 0, category: '' };
                this.imagePreview = null;
                this.selectedImage = null;
                this.itemAdded.emit();

                this.showToast = true;

                setTimeout(() => {
                    this.showToast = false;
                    this.showTooltip();
                }, 1200);
            });
        });
    }

    showTooltip() {
        if (!this.viewTableBtn) return;

        this.tooltip?.dispose();

        this.tooltip = new bootstrap.Tooltip(this.viewTableBtn.nativeElement, {
            title: 'View the newly added item here',
            placement: 'bottom',
            trigger: 'manual'
        });

        this.tooltip.show();

        setTimeout(() => {
            this.tooltip?.hide();
            this.tooltip?.dispose();
            this.tooltip = null;
        }, 2500);
    }
}
