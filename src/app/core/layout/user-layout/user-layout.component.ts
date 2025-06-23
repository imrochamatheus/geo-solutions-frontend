import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';

import { UserHeaderComponent } from '../user-header/user-header.component';
import { FooterComponent } from '../footer/footer.component';
import { BannerComponent } from "../banner/banner.component";
import { filter } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-layout',
  standalone: true,
  imports: [UserHeaderComponent, RouterModule, FooterComponent, BannerComponent, CommonModule],
  templateUrl: './user-layout.component.html',
})
export class UserLayoutComponent implements OnInit {
 isHomeRoute: boolean = false;

  constructor(private router: Router) {}

  ngOnInit() {
    this.isHomeRoute = this.router.url === '/home' || this.router.url === '/home/';

    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.isHomeRoute = event.urlAfterRedirects === '/home' || event.url === '/home';
    });
  }
}
