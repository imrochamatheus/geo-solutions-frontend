import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceTypeService } from '../../../admin/service-manager/services/service-type.service'; 
import { ServiceType } from '../../../admin/service-manager/models/service-type.model'; 
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  providers: [MessageService, ToastModule],
  imports: [ToastModule, CommonModule],
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  services: ServiceType[] = [];
  expandedCards: boolean[] = [];
  currentIndex = 0;
  cardWidth = 100;
  visibleCards = 1;

  constructor(
    private readonly serviceTypeService: ServiceTypeService,
    private readonly messageService: MessageService,
    private readonly router: Router
  ) {}

 public ngOnInit(): void {
    this.loadServices();
    this.setCardWidth();
    window.addEventListener('resize', () => this.setCardWidth());
  }

  private loadServices(): void {
    this.serviceTypeService.findAll().subscribe({
      next: (data) => {
        this.services = data;
        this.expandedCards = Array(data.length).fill(false);
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Falha ao carregar os serviços',
        });
      },
    });
  }

  nextSlide(): void {
    const maxIndex = Math.max(0, this.services.length - this.visibleCards);
    if (this.currentIndex < maxIndex) {
      this.currentIndex++;
    } else {
      this.currentIndex = 0;
    }
  }

  prevSlide(): void {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    } else {
      this.currentIndex = Math.max(0, this.services.length - this.visibleCards);
    }
  }

  toggleExpand(index: number): void {
    this.expandedCards[index] = !this.expandedCards[index];
  }

  shouldShowToggleButton(service: ServiceType, index: number): boolean {
    return !!service.description && service.description.length > 120 && this.expandedCards[index] !== undefined;
  }

  private setCardWidth(): void {
    const width = window.innerWidth;
    if (width < 640) {
      this.cardWidth = 100; 
      this.visibleCards = 1;
    } else if (width < 768) {
      this.cardWidth = 50; 
      this.visibleCards = 2;
    } else {
      this.cardWidth = 33.3333; 
      this.visibleCards = 3;
    }
  }

   navigateToBudget(): void {
    this.router.navigate(['/budget']);
  }
}