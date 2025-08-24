import NextAuth from "next-auth"
import GitHubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"

// Создаём обработчик авторизации с конфигурацией
const handler = NextAuth({
  // Список провайдеров, через которые можно входить в систему
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID!, // из .env.production.local
      clientSecret: process.env.GITHUB_SECRET!, // из .env.production.local
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!, // из .env.production.local
      clientSecret: process.env.GOOGLE_SECRET!, // из .env.production.local
    }),
  ],

  // Указываем путь к кастомной странице входа (по умолчанию /api/auth/signin)
  pages: {
    signIn: "/auth/login", // маршрут до нашей страницы с кнопками "Войти через Google/GitHub"
  },

  // Секрет для шифрования JWT и защиты cookies (обязательно задать в .env.production)
  secret: process.env.NEXTAUTH_SECRET,
})

// Экспортируем обработчики GET и POST — это нужно для App Router
export { handler as GET, handler as POST }
