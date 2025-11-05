import { Component, OnInit } from "@angular/core";
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input'
import { MatFormField } from '@angular/material/form-field'
import { Router, RouterOutlet } from "@angular/router";

@Component({
  selector: 'app-root',
  imports: [MatButtonModule, MatInputModule, MatFormField, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'indigo-frontend';

	public constructor(private readonly router: Router) { }

	ngOnInit(): void {
		// AUTOMATICALLY ROUTE TO LOGIN FOR TESTING
		// THIS WILL BE CHANGED LATER
		this.router.navigate(['/login']);
	}
}
