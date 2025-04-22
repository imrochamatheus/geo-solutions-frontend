import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { BudgetRequest } from '../models/budget/request/budget.request.model';
import { BudgetResponse } from '../models/budget/budget.model';
import { RemovedItem } from '../models/removed.item.model';
import { CalcRequest } from '../models/budget/calcParameter/calc.request.model';
import { ServiceTypeBudget } from '../models/budget/serviceTypeBudget/service.Type.Budget.model';


@Injectable({
  providedIn: 'root'
})
export class BudgetService {

  constructor(private http: HttpClient) {}

  public postBudget(budget: BudgetRequest): Observable<BudgetResponse> {
    return this.http.post<BudgetResponse>(`${environment.apiUrl}/Budgets`, budget);
  }

  public getAllBudgets(): Observable<BudgetResponse> {
    return this.http.get<BudgetResponse>(`${environment.apiUrl}/Budgets`);
  }

  public deleteBudget(budgetId: number): Observable<RemovedItem> {
    return this.http.delete<RemovedItem>(`${environment.apiUrl}/Budgets?budgetId=${budgetId}`);
  }

  public updateBudget(budgetId:number, budgetToUpdate: BudgetRequest): Observable<BudgetResponse> {
    return this.http.put<BudgetResponse>(`${environment.apiUrl}/Budgets?budgetId=${budgetId}`, budgetToUpdate);
  }

  public processCalc(calcRequest: CalcRequest): Observable<number>{
    return this.http.post<number>(`${environment.apiUrl}/Budgets/calc`, calcRequest);
  }

  public getAllServiceTypes(): Observable<ServiceTypeBudget[]>{
    return this.http.get<ServiceTypeBudget[]>(`${environment.apiUrl}/ServiceType`);
  }

}
