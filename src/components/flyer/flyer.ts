import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSliderModule } from '@angular/material/slider';
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-flyer',
  imports: [ CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatRadioModule,
    MatSliderModule ],
  providers: [ provideNativeDateAdapter() ],
  templateUrl: './flyer.html',
  styleUrl: './flyer.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Flyer {
selectedDate: Date;
  
  readonly minWeeks: number = 25;
  readonly maxWeeks: number = 40;
  weeks: number = 36;

  readonly weeksOptions = [
    { value: 28, label: '28 weeks (Many international flights without requiring certificate)' },
    { value: 31, label: '31 weeks (Recommended when having twins)' },
    { value: 36, label: '36 weeks (Most US Airlines)' },
    { value: 38, label: '38 weeks (Southwest Airlines)' },
    { value: -1, label: 'Custom'}
  ];

  selectedWeeksIndex: number = 2;
  customWeeks = 25;

  constructor()
  {
    this.selectedDate = new Date();
    this.selectedDate.setMonth(this.selectedDate.getMonth() + 6);
  }

  onDidSelectedWeeksChange(value: any)
  {
    this.weeks = value;
  }

  get travelDate(): string {
    if (!this.selectedDate) {
      return "Please select your due date.";
    }

    let flyDate = new Date(this.selectedDate);
    let weeks = 0;
    if (this.selectedWeeksIndex == this.weeksOptions.length - 1) {
      weeks = this.customWeeks;
    } else {
      weeks = this.weeksOptions[this.selectedWeeksIndex].value;
    }
    
    weeks = Math.max(this.minWeeks, Math.min(this.maxWeeks, weeks));
    
    const deltaWeeks = 40 - weeks;
    flyDate.setDate(flyDate.getDate() - deltaWeeks * 7);

    return flyDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }
}
