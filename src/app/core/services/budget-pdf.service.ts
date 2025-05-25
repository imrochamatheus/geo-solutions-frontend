import { Injectable } from '@angular/core';
import { BudgetResponse } from '../models/budget/budget.model';
import jsPDF from 'jspdf';

@Injectable({
  providedIn: 'root'
})
export class BudgetPdfService {
  generatePdf(budget: BudgetResponse): void {
    try {
      // Criar novo documento PDF
      const doc = new jsPDF();

      // Configurar fonte e tamanho para o cabeçalho
      doc.setFontSize(16);
      doc.text('Orçamento', 20, 20);
      doc.setFontSize(12);
      doc.text('GeoSoluções', 20, 30);
      doc.text(`Emissão: ${new Date().toLocaleDateString('pt-BR')}`, 20, 40);

      // Formatar os dados do orçamento
      const formattedPrice = Number(budget.price).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      });
      const startDate = budget.startDate ? new Date(budget.startDate).toLocaleDateString('pt-BR') : 'N/A';
      const endDate = budget.endDate ? new Date(budget.endDate).toLocaleDateString('pt-BR') : 'N/A';

      // Adicionar dados do orçamento
      doc.setFontSize(10);
      let y = 60;
      const lineHeight = 10;

      doc.text(`ID do Orçamento: ${budget.id}`, 20, y);
      y += lineHeight;
      doc.text(`Cliente: ${budget.user?.email || 'N/A'}`, 20, y);
      y += lineHeight;
      doc.text(`Serviço: ${budget.intentionService?.name || 'N/A'}`, 20, y);
      y += lineHeight;
      doc.text(`Endereço: ${budget.address.street}, ${budget.address.city} - ${budget.address.state}`, 20, y);
      y += lineHeight;
      doc.text(`Preço: ${formattedPrice}`, 20, y);
      y += lineHeight;
      doc.text(`Data de Início: ${startDate}`, 20, y);
      y += lineHeight;
      doc.text(`Data de Término: ${endDate}`, 20, y);

      // Adicionar rodapé
      y += 20;
      doc.text('Contato: contato@geosolucoes.com | (31) 98782-4674', 20, y);

      // Gerar blob e exibir
      const pdfOutput = doc.output('blob');
      const url = window.URL.createObjectURL(pdfOutput);
      window.open(url, '_blank');
    } catch (error) {
      console.error('Erro ao gerar PDF:', error);
      throw new Error('Falha ao gerar o PDF. Tente novamente.');
    }
  }
}