import { revalidatePath, revalidateTag } from "next/cache"
import { NextRequest, NextResponse } from "next/server"

/**
 * API endpoint для on-demand ревалидации главной страницы
 *
 * Использование:
 * GET /api/revalidate?secret=YOUR_SECRET_TOKEN
 *
 * Опциональные параметры:
 * - path: путь для ревалидации (по умолчанию '/')
 * - tag: тег для ревалидации конкретных данных (users-count, latest-posts)
 */
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const secret = searchParams.get("secret")
  const path = searchParams.get("path") || "/"
  const tag = searchParams.get("tag")

  // Проверяем секретный токен
  if (secret !== process.env.REVALIDATION_SECRET_TOKEN) {
    return NextResponse.json({ message: "Invalid token" }, { status: 401 })
  }

  try {
    // Если указан тег, ревалидируем по тегу
    if (tag) {
      revalidateTag(tag)
      return NextResponse.json({
        revalidated: true,
        type: "tag",
        tag,
        now: Date.now(),
      })
    }

    // Иначе ревалидируем по пути
    revalidatePath(path)
    return NextResponse.json({
      revalidated: true,
      type: "path",
      path,
      now: Date.now(),
    })
  } catch (error) {
    return NextResponse.json(
      {
        message: "Error revalidating",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    )
  }
}
