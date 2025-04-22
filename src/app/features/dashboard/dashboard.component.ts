import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  constructor(private readonly router: Router) {}

  public navigateToVariables(): void {
    this.router.navigate(['/variables']);
  }

  public ngOnInit(): void {}
}
