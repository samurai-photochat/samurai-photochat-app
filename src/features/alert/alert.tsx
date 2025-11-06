"use client"

import { useAppDispatch } from "@/shared/store/useAppDispatch"
import { useAppSelector } from "@/shared/store/useAppSelector"
import { selectError, selectSuccess, setAppError, setAppSuccess, selectToastAutoClose } from "@/shared/store/appSlice"
import { Dialog, DialogContent, DialogDescription, DialogClose, DialogTitle } from "@radix-ui/react-dialog"
import s from "./alert.module.css"
import Image from "next/image"
import Close from "@/shared/assets/svg/Close.svg"
import { useEffect, useState, useRef } from "react"

export const Alert = () => {
  // alert для вывода ошибок или сообщений(внутрених)
  const error = useAppSelector(selectError)
  // заглушка на сообщения
  const success = useAppSelector(selectSuccess)
  // ⏱️ ВРЕМЯ ЖИЗНИ TOAST: Получаем настройку автозакрытия из Redux store
  const autoCloseTime = useAppSelector(selectToastAutoClose)
  const dispatch = useAppDispatch()

  // 🎯 СОСТОЯНИЕ ПРОГРЕСС-БАРА: Отслеживаем прогресс анимации (от 100% до 0%)
  const [progress, setProgress] = useState(100)
  // ⏸️ ПАУЗА ПРИ НАВЕДЕНИИ: Флаг для остановки таймера
  const [isPaused, setIsPaused] = useState(false)

  // 📦 РЕФЫ ДЛЯ ТАЙМЕРОВ: Сохраняем ссылки на интервалы для управления
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const autoCloseTimerRef = useRef<NodeJS.Timeout | null>(null)
  const startTimeRef = useRef<number>(0)
  const remainingTimeRef = useRef<number>(0)

  const handleClose = () => {
    dispatch(setAppError({ error: null }))
    dispatch(setAppSuccess({ success: "" }))
    // Сброс прогресса при закрытии
    setProgress(100)
    setIsPaused(false)
    // Очистка рефов
    if (progressIntervalRef.current) clearInterval(progressIntervalRef.current)
    if (autoCloseTimerRef.current) clearTimeout(autoCloseTimerRef.current)
  }

  // 🖱️ ОБРАБОТЧИКИ НАВЕДЕНИЯ: Управление паузой таймера
  const handleMouseEnter = () => {
    setIsPaused(true)
  }

  const handleMouseLeave = () => {
    setIsPaused(false)
  }

  // ⏱️ АВТОЗАКРЫТИЕ И АНИМАЦИЯ: Эффект для управления таймером и прогресс-баром
  useEffect(() => {
    if (error || success) {
      // Сброс прогресса при открытии нового toast
      setProgress(100)
      startTimeRef.current = Date.now()
      remainingTimeRef.current = autoCloseTime

      // Очистка предыдущих таймеров
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current)
      if (autoCloseTimerRef.current) clearTimeout(autoCloseTimerRef.current)

      // 🎬 АНИМАЦИЯ ПРОГРЕСС-БАРА: Обновляем каждые 50ms для плавной анимации
      progressIntervalRef.current = setInterval(() => {
        setProgress((prev) => {
          const decrement = (100 / autoCloseTime) * 50 // Уменьшение за 50ms
          const newProgress = prev - decrement
          return newProgress > 0 ? newProgress : 0
        })
      }, 50)

      // ⏰ ТАЙМЕР АВТОЗАКРЫТИЯ: Закрываем toast через заданное время
      autoCloseTimerRef.current = setTimeout(() => {
        handleClose()
      }, autoCloseTime)

      // Очистка таймеров при размонтировании
      return () => {
        if (progressIntervalRef.current) clearInterval(progressIntervalRef.current)
        if (autoCloseTimerRef.current) clearTimeout(autoCloseTimerRef.current)
      }
    }
  }, [error, success, autoCloseTime])

  // ⏸️ УПРАВЛЕНИЕ ПАУЗОЙ: Останавливаем/возобновляем таймеры при наведении
  useEffect(() => {
    if (!error && !success) return

    if (isPaused) {
      // ⏸️ ПАУЗА: Останавливаем таймеры и сохраняем оставшееся время
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current)
        progressIntervalRef.current = null
      }
      if (autoCloseTimerRef.current) {
        clearTimeout(autoCloseTimerRef.current)
        autoCloseTimerRef.current = null
      }
      // Вычисляем оставшееся время
      const elapsed = Date.now() - startTimeRef.current
      remainingTimeRef.current = Math.max(0, remainingTimeRef.current - elapsed)
    } else if (remainingTimeRef.current > 0) {
      // ▶️ ВОЗОБНОВЛЕНИЕ: Перезапускаем таймеры с оставшимся временем
      startTimeRef.current = Date.now()

      // Перезапуск анимации прогресс-бара
      progressIntervalRef.current = setInterval(() => {
        setProgress((prev) => {
          const decrement = (100 / autoCloseTime) * 50
          const newProgress = prev - decrement
          return newProgress > 0 ? newProgress : 0
        })
      }, 50)

      // Перезапуск таймера автозакрытия с оставшимся временем
      autoCloseTimerRef.current = setTimeout(() => {
        handleClose()
      }, remainingTimeRef.current)
    }

    return () => {
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current)
      if (autoCloseTimerRef.current) clearTimeout(autoCloseTimerRef.current)
    }
  }, [isPaused])

  const className = s.container + (error ? " " + s.error : "")
  return (
    <Dialog open={!!(error || success)} onOpenChange={handleClose}>
      <DialogContent
        className={className}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className={s.block}>
          <DialogTitle />
          <DialogDescription className={s.text}>{error || success}</DialogDescription>
          <DialogClose onClick={handleClose} className={s.button}>
            <Image src={Close} alt={"закрыть"} />
          </DialogClose>
        </div>
        {/* 📊 ПРОГРЕСС-БАР: Визуальный индикатор оставшегося времени жизни toast */}
        <div className={s.progressBar}>
          <div
            className={s.progressFill}
            style={{ width: `${progress}%` }}
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}