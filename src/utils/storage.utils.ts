/**
 * Set a value in localStorage
 * @param key - The key under which the value will be stored
 * @param value - The value to store (will be serialized to JSON)
 */
export function setLocalStorage<T>(key: string, value: T): void {
  try {
    const jsonValue = JSON.stringify(value);
    localStorage.setItem(key, jsonValue);
  } catch (error) {
    console.error("Error saving to localStorage:", error);
  }
}

/**
 * Get a value from localStorage
 * @param key - The key of the value to retrieve
 * @returns The parsed value, or null if not found or parse error
 */
export function getLocalStorage<T>(key: string): T | null {
  try {
    const jsonValue = localStorage.getItem(key);
    return jsonValue ? (JSON.parse(jsonValue) as T) : null;
  } catch (error) {
    console.error("Error reading from localStorage:", error);
    return null;
  }
}

/**
 * Remove a value from localStorage
 * @param key - The key to remove
 */
export function removeLocalStorage(key: string): void {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error("Error removing from localStorage:", error);
  }
}

/**
 * Clear all values from localStorage
 */
export function clearLocalStorage(): void {
  try {
    localStorage.clear();
  } catch (error) {
    console.error("Error clearing localStorage:", error);
  }
}
