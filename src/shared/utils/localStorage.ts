/**
 * Утилитарный класс для работы с access token в localStorage.
 * Оборачивает доступ к localStorage с проверкой окружения (browser-only).
 */
class LocalStorage {
  // Ключ, под которым токен хранится в localStorage
  private static TOKEN_KEY = "accessToken"
  /**
   * Получает токен из localStorage.
   * Возвращает null, если код выполняется не в браузере.
   */
  static getToken(): string | null {
    if (typeof window !== "undefined") {
      return localStorage.getItem(this.TOKEN_KEY)
    }
    return null
  }
  /**
   * Сохраняет токен в localStorage.
   * Ничего не делает, если код выполняется вне браузера.
   */
  static setToken(token: string): void {
    if (typeof window !== "undefined") {
      localStorage.setItem(this.TOKEN_KEY, token)
    }
  }
  /**
   * Удаляет токен из localStorage.
   * Ничего не делает, если код выполняется вне браузера.
   */
  static removeToken(): void {
    if (typeof window !== "undefined") {
      localStorage.removeItem(this.TOKEN_KEY)
    }
  }
}

export default LocalStorage
