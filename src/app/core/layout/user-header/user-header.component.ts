import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { LucideAngularModule, Menu, Monitor, X } from 'lucide-angular';

@Component({
  selector: 'app-user-header',
  standalone: true,
  imports: [LucideAngularModule, CommonModule, RouterModule],
  templateUrl: './user-header.component.html',
})
export class UserHeaderComponent {
  public readonly icons = {
    x: X,
    menu: Menu,
    monitor: Monitor,
  };

  public isMenuOpen = false;

  constructor(private readonly router: Router) {}

  public toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  public goToHome(): void {
    this.router.navigate(['/']);
  }
}
