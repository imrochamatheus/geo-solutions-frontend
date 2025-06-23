import { Component } from '@angular/core';
import { ServiceCardComponent } from './components/service-card/service-card.component';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [ServiceCardComponent],
  templateUrl: './services.component.html',
})
export class ServicesComponent {
  public readonly services = [
    {
      icon: 'drone',
      title: 'Aerolevantamento',
      description:
        'Utilizamos drones e tecnologias de ponta para realizar levantamentos topográficos precisos e eficientes. Ideal para mapeamento de grandes áreas, projetos de engenharia e monitoramento ambiental.',
    },
    {
      icon: 'file-check',
      title: 'Regularização de Imóveis',
      description:
        'Regularize seu imóvel com segurança e agilidade. Atuamos com CAR, certificação SIGEF, parcelamento do solo, remembramento, desmembramento, desapropriação e usucapião.',
    },
    {
      icon: 'leaf',
      title: 'Licenciamento Ambiental',
      description:
        'Facilitamos o processo de licenciamento ambiental com assessoria completa para obtenção de Licença de Instalação (LI), Licença de Operação (LO) e emissão de alvarás.',
    },
    {
      icon: 'clipboard',
      title: 'Execução e Acompanhamento de Obras',
      description:
        'Garantimos precisão e qualidade em todas as etapas: terraplanagem, locação de obra (marcação no terreno) e As Built (documentação final da obra).',
    },
  ];
}