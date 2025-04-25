"use client"

import { useState, useEffect } from "react"

export function useAudio(url: string) {
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    const audioElement = new Audio(url)
    setAudio(audioElement)

    return () => {
      audioElement.pause()
      audioElement.src = ""
    }
  }, [url])

  const toggle = () => {
    if (!audio) return

    if (playing) {
      audio.pause()
    } else {
      audio.play()
    }
    setPlaying(!playing)
  }

  useEffect(() => {
    if (!audio) return

    const handleEnded = () => setPlaying(false)
    audio.addEventListener("ended", handleEnded)

    return () => {
      audio.removeEventListener("ended", handleEnded)
    }
  }, [audio])

  return { playing, toggle }
}
