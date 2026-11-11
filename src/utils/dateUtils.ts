/**
 * Formata data ISO (YYYY-MM-DD) para formato brasileiro (DD/MM/YYYY)
 */
export function formatDateToBR(isoDateString: string): string {
  if (!isoDateString) return '';
  const [year, month, day] = isoDateString.split('-');
  if (!year || !month || !day) return isoDateString;
  return `${day.padStart(2, '0')}/${month.padStart(2, '0')}/${year}`;
}

/**
 * Retorna a data atual no formato YYYY-MM-DD
 */
export function getTodayISODate(): string {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Data padrão de referência do protótipo do Figma ("2024-01-10")
 */
export const FIGMA_DEFAULT_DATE = '2024-01-10';

