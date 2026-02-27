/**
 * Trata o valor de input numérico removendo zeros à esquerda
 * e permitindo campo vazio para melhor UX.
 * 
 * Aceita vírgula como decimal (pt-BR) e converte para ponto internamente.
 */
export function handleNumericInput(rawValue: string): string {
  // Permitir campo vazio (usuário apagou tudo)
  if (rawValue === "" || rawValue === "-") return rawValue;

  // Aceitar vírgula como separador decimal (pt-BR)
  let value = rawValue.replace(",", ".");

  // Permitir digitação parcial de decimais: "3." ou "3.0"
  if (value.endsWith(".") || (value.includes(".") && value.split(".")[1] !== undefined)) {
    // Só remove zeros à esquerda da parte inteira
    const parts = value.split(".");
    const intPart = parts[0] === "" || parts[0] === "0" ? "0" : String(parseInt(parts[0], 10) || 0);
    
    // Se está digitando decimal, preservar o ponto e a parte decimal
    if (parts.length === 2) {
      return `${intPart}.${parts[1]}`;
    }
    return `${intPart}.`;
  }

  // Remover zeros à esquerda: "0250" → "250", "026" → "26"
  const num = parseFloat(value);
  if (isNaN(num)) return "";

  return String(num);
}

/**
 * Converte valor do campo para número (para usar nos cálculos)
 * Retorna 0 se campo vazio ou inválido
 */
export function parseNumericValue(value: string | number): number {
  if (typeof value === "number") return value;
  if (value === "" || value === "-" || value === ".") return 0;
  const num = parseFloat(value.replace(",", "."));
  return isNaN(num) ? 0 : num;
}

/**
 * Formata número para exibição com casas decimais fixas
 */
export function formatNumber(value: number, decimals: number = 2): string {
  return value.toFixed(decimals);
}
