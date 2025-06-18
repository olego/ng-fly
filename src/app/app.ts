import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Flyer } from '../components/flyer/flyer';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
  imports: [ RouterOutlet, Flyer ]
})
export class App {
  protected title = 'Calendar';
}
