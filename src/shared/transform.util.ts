/**
 * Converts a camelCase string to snake_case
 */
function camelToSnake(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, "$1_$2") // Insert underscore between lowercase and uppercase
    .replace(/([A-Z]+)([A-Z][a-z])/g, "$1_$2") // Handle consecutive uppercase letters
    .toLowerCase();
}

/**
 * Recursively converts all keys in an object from camelCase to snake_case
 */
export function toSnakeCase<T = any>(obj: any): T {
  if (obj === null || obj === undefined) {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => toSnakeCase(item)) as T;
  }

  if (typeof obj === "object" && obj.constructor === Object) {
    const snakeCaseObj: any = {};
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        const snakeKey = camelToSnake(key);
        snakeCaseObj[snakeKey] = toSnakeCase(obj[key]);
      }
    }
    return snakeCaseObj as T;
  }

  // For primitive values, dates, etc., return as is
  return obj;
}

