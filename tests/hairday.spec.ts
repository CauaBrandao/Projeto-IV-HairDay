import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

test.describe('HairDay - Sistema de Agendamentos E2E', () => {
  test.beforeAll(() => {
    const dir = path.resolve(process.cwd(), 'docs/screenshots');
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  });

  test('deve renderizar a interface fiel ao Figma e capturar screenshots', async ({ page }, testInfo) => {
    await page.goto('/');

    // Verifica logotipo e elementos principais
    await expect(page.getByRole('banner').getByText('HairDay')).toBeVisible();
    await expect(page.getByText('Agende um atendimento')).toBeVisible();
    await expect(page.getByText('Sua agenda')).toBeVisible();

    // Verifica períodos obrigatórios (Manhã, Tarde, Noite)
    await expect(page.getByRole('heading', { name: 'Manhã' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Tarde' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Noite' })).toBeVisible();

    // Captura screenshot para documentação
    const screenshotPath = path.resolve(
      process.cwd(),
      `docs/screenshots/${testInfo.project.name}.png`
    );
    await page.screenshot({ path: screenshotPath, fullPage: true });
    console.log(`Screenshot salvo em: ${screenshotPath}`);
  });

  test('deve exibir os agendamentos iniciais nos três períodos', async ({ page }) => {
    await page.goto('/');

    // Verifica clientes iniciais do protótipo
    await expect(page.getByText('Ryan Dorwart')).toBeVisible();
    await expect(page.getByText('Livia Curtis')).toBeVisible();
    await expect(page.getByText('Maria Horwitz')).toBeVisible();

    // Verifica horários correspondentes na agenda
    const mainSchedule = page.getByRole('main');
    await expect(mainSchedule.getByText('11:00')).toBeVisible();
    await expect(mainSchedule.getByText('13:00')).toBeVisible();
    await expect(mainSchedule.getByText('21:00')).toBeVisible();
  });

  test('deve cadastrar um novo agendamento com sucesso', async ({ page }) => {
    await page.goto('/');

    // Seleciona um horário disponível (ex: 09:00 na manhã)
    const slot09 = page.getByRole('button', { name: '09:00' });
    await expect(slot09).toBeEnabled();
    await slot09.click();

    // Preenche nome do cliente
    const nameInput = page.getByPlaceholder('Helena Souza');
    await nameInput.fill('Carlos Alberto');

    // Clica no botão AGENDAR
    await page.getByRole('button', { name: 'AGENDAR' }).click();

    // Deve exibir notificação de sucesso e novo agendamento na lista
    await expect(page.getByText('Agendamento de Carlos Alberto às 09:00 confirmado!')).toBeVisible();
    await expect(page.getByRole('main').getByText('Carlos Alberto', { exact: true })).toBeVisible();
  });

  test('deve excluir um agendamento existente ao clicar na lixeira', async ({ page }) => {
    await page.goto('/');

    // Confirma que Ryan Dorwart está presente
    await expect(page.getByText('Ryan Dorwart')).toBeVisible();

    // Clica no botão de excluir (lixeira) de Ryan Dorwart
    const deleteButton = page.getByRole('button', {
      name: 'Excluir agendamento de Ryan Dorwart às 11:00',
    });
    await deleteButton.click();

    // Deve exibir notificação e Ryan Dorwart não deve mais estar visível
    await expect(page.getByText('Agendamento de Ryan Dorwart às 11:00 cancelado.')).toBeVisible();
    await expect(page.getByText('Ryan Dorwart')).not.toBeVisible();

    // Deve exibir mensagem de período vazio se não houver outros agendamentos na manhã
    await expect(page.getByText('Nenhum agendamento para este período')).toBeVisible();
  });
});
