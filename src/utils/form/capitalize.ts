export function CapitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.toLowerCase().slice(1);
}
