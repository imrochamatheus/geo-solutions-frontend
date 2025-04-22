import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ServiceTypeBudget } from '../../core/models/budget/serviceTypeBudget/service.Type.Budget.model';
import { BudgetService } from '../../core/services/budget.service';
import { CommonModule } from '@angular/common';
import { IntentionServiceBudget } from '../../core/models/budget/serviceTypeBudget/intention.service.budget.model';

@Component({
  selector: 'app-budget',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './budget.component.html',
  styleUrl: './budget.component.scss'
})
export class BudgetComponent implements OnInit {
  form: FormGroup;
  serviceTypes: ServiceTypeBudget[] = [];
  intentions: IntentionServiceBudget[] = [];
  selectedServiceTypeId: number | null = null;
  selectedIntentionServiceId: number | null = null;
  ngOnInit(): void {
    this.getServiceTypes();

    this.form.get('servico')?.valueChanges.subscribe((selectedServiceId: number) => {
      const selectedService = this.serviceTypes.find(s => s.id === selectedServiceId);

      this.intentions = selectedService?.intentionServices || [];

      const detalheServicoControl = this.form.get('detalheServico');

      if (this.intentions.length > 0) {
        detalheServicoControl?.enable();
        detalheServicoControl?.setValue(this.intentions[0].name);
      } else {
        detalheServicoControl?.setValue('');
        detalheServicoControl?.disable();
      }
    });
  }


  constructor(
    private fb: FormBuilder,
    private budgetService: BudgetService
  ) {
    this.form = this.fb.group({
      cep: [''],
      logradouro: [''],
      cidade: [''],
      area: [''],
      tipoImovel: [''],
      servico: [''],
      detalheServico: [{ value: '', disabled: true }]
    });
  }

  gerarOrcamento() {
    console.log('Form Data:', this.form.value);
  }

  getServiceTypes() : void
  {
    this.budgetService.getAllServiceTypes()
    .subscribe((serviceTypes:ServiceTypeBudget[]) =>
      {
        this.serviceTypes = serviceTypes;
      })

  }
}
