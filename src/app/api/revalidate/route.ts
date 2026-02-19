import { revalidatePath, revalidateTag } from "next/cache"
import { NextRequest, NextResponse } from "next/server"

/**
 * API-Роут для ручной ревалидации ISR/кэша в Next.js.
 *
 * Зачем:
 * - Позволяет админским/служебным инструментам сбрасывать кэш страниц или данных,
 *   чтобы пользователи увидели свежие изменения без ожидания автоматической ревалидации.
 *
 * Как использовать (GET-запросы):
 * - По тегу данных: /api/revalidate?secret=SECRET&tag=posts
 * - По пути страницы: /api/revalidate?secret=SECRET&path=/profile
 *
 * Безопасность:
 * - Требуется секретный токен в query-параметре `secret`.
 * - Токен сравнивается с env-переменной REVALIDATION_SECRET_TOKEN (см. .env.production).
 * - Не раскрывайте этот токен публично. Храните и передавайте его только из доверенных систем.
 */
export async function GET(request: NextRequest) {
  // Достаём query-параметры из URL запроса
  const searchParams = request.nextUrl.searchParams
  const secret = searchParams.get("secret")
  const path = searchParams.get("path") || "/"
  const tag = searchParams.get("tag")

  // Проверяем секретный токен: защищаем эндпоинт от несанкционированных вызовов
  if (secret !== process.env.REVALIDATION_SECRET_TOKEN) {
    return NextResponse.json({ message: "Invalid token" }, { status: 401 })
  }

  try {
    // Основная логика ревалидации
    // 1) Если передан тег — сбрасываем кэш всех данных, помеченных этим тегом.
    //    Полезно, когда список страниц подписан на общий тег (например, "posts").
    if (tag) {
      revalidateTag(tag, "fetch")
      return NextResponse.json({
        revalidated: true,
        type: "tag",
        tag,
        now: Date.now(),
      })
    }

    revalidatePath(path, "page")
    return NextResponse.json({
      revalidated: true,
      type: "path",
      path,
      now: Date.now(),
    })
  } catch (error) {
    // Унифицированная обработка ошибок, чтобы клиент получил полезное описание проблемы
    return NextResponse.json(
      {
        message: "Error revalidating",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    )
  }
}
