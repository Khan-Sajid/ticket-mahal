function isArrayEmpty(arr: any[]): boolean {
  return arr.length === 0;
}
function isObjectEmpty(obj: any): boolean {
  return Object.keys(obj).length === 0;
}

export function toKebabCase(str: string) {
  if (!str) return "";
  return str
    .toLowerCase() // Convert to lowercase
    .replace(/[^a-z0-9\s]/g, "") // Remove special characters
    .trim() // Remove leading/trailing spaces
    .replace(/\s+/g, "-"); // Replace spaces with hyphens
}

export function shortNumber(number: number): string {
  if (number > 999999) {
    const value = number / 1000000;
    const formatted = value % 1 === 0 ? value.toString() : value.toFixed(2);
    return `${formatted}M`;
  }
  if (number > 999) {
    const value = number / 1000;
    const formatted = value % 1 === 0 ? value.toString() : value.toFixed(2);
    return `${formatted}K`;
  }
  return `${number}`;
}

export { isArrayEmpty, isObjectEmpty };
