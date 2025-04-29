import { Component, OnInit } from '@angular/core';
import { CityService, City } from './services/city.service';
import { CitySearchComponent } from './components/city-search/city-search.component';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Search, XCircle } from 'lucide-angular';

@Component({
  selector: 'app-regions',
  templateUrl: './regions.component.html',
  styleUrls: [],
  standalone: true,
  imports: [CitySearchComponent, CommonModule, LucideAngularModule],
})
export class RegionsComponent implements OnInit {
  servingCities: City[] = [];
  isLoading: boolean = false;
  errorMessage: string | null = null;
  showRemoveConfirmation: boolean = false;
  cityToRemove: City | null = null;
  serchIcon = Search;
  removeIcon = XCircle;

  constructor(private cityService: CityService) {}

  ngOnInit() {
    this.loadServingCities();
  }

  loadServingCities() {
    this.isLoading = true;
    this.errorMessage = null;
    this.servingCities = [];
    this.cityService.getAllCities().subscribe({
      next: (cities) => {
        this.servingCities = cities;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erro ao carregar cidades:', err);
        this.isLoading = false;
        this.errorMessage =
          err.status === 0
            ? 'Não foi possível conectar ao servidor. Verifique se o servidor está ativo e se a URL está correta (HTTP/HTTPS).'
            : 'Não foi possível carregar as cidades. Tente novamente mais tarde.';
      },
    });
  }

  handleAddCity(city: City) {
    this.loadServingCities();
  }

  initiateRemoveCity(city: City) {
    this.cityToRemove = city;
    this.showRemoveConfirmation = true;
  }

  confirmRemoveCity() {
    if (this.cityToRemove) {
      this.cityService.removeCity(this.cityToRemove.id).subscribe({
        next: () => {
          this.loadServingCities();
          this.showRemoveConfirmation = false;
          this.cityToRemove = null;
          alert('Cidade removida com sucesso!');
        },
        error: (err) => {
          console.error('Erro ao remover cidade:', err);
          alert(err.message || 'Erro ao remover cidade. Tente novamente.');
          this.showRemoveConfirmation = false;
          this.cityToRemove = null;
        },
      });
    }
  }

  cancelRemoveCity() {
    this.showRemoveConfirmation = false;
    this.cityToRemove = null;
  }
}