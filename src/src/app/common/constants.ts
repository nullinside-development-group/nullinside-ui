export const VM_ADMIN = "VM_ADMIN";
export const ADMIN = "ADMIN";

export function convertForDisplay(date: Date) {
  if (!date) {
    return date;
  }

  return `${date.toLocaleDateString([], {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric'
  })} ${date.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}`;
}
