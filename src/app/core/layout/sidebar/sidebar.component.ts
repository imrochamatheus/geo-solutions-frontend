import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLinkActive, RouterModule } from '@angular/router';
import { LucideAngularModule, MapPinned } from 'lucide-angular';
import {
  Home,
  Users,
  Building2,
  FileText,
  Settings,
  LogOut,
} from 'lucide-angular';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, RouterModule],
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {
  public readonly icons = {
    home: Home,
    users: Users,
    logOut: LogOut,
    fileText: FileText,
    settings: Settings,
    building2: Building2,
    mappinned: MapPinned,
  };

  public readonly menuItems = [
    { icon: this.icons.home, text: 'Dashboard', path: 'dashboard' },
    { icon: this.icons.users, text: 'Usuários', path: 'users' },
    {
      icon: this.icons.building2,
      text: 'Variáveis',
      path: 'variables',
    },
    {
      icon: this.icons.mappinned,
      text: 'Regiões',
      path: 'regions',
    },
    { icon: this.icons.fileText, text: 'Relatórios', path: 'reports' },
    {
      icon: this.icons.settings,
      text: 'Gerenciador de Serviços',
      path: 'service-manager',
    },
    {
      icon: this.icons.settings,
      text: 'Configurações',
      path: 'configurations',
    },
  ];

  constructor(
    private readonly router: Router,
    private readonly authService: AuthService
  ) {}

  public logout(): void {
    this.authService.logout();
  }

  public isActive(path: string): boolean {
    return this.router.isActive(path, {
      paths: 'subset',
      fragment: 'ignored',
      queryParams: 'exact',
      matrixParams: 'ignored',
    });
  }
}
