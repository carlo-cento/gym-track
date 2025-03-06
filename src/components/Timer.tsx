'use client'

import { ActionIcon, RingProgress } from '@mantine/core'
import {
    IconPlayerPause,
    IconPlayerPlay,
    IconRewindBackward10,
    IconRewindForward10,
    IconRotate,
} from '@tabler/icons-react'
import React, { useEffect, useRef, useState } from 'react'

export default function Timer(props: { seconds: number }) {
    const [timer, setTimer] = useState(props.seconds)
    const [totalSeconds, setTotalSeconds] = useState(props.seconds)

    const [isPaused, setIsPaused] = useState(false)
    const isPausedRef = useRef(isPaused)

    useEffect(() => {
        isPausedRef.current = isPaused
    }, [isPaused])

    useEffect(() => {
        setTimer(props.seconds)
        setTotalSeconds(props.seconds)
    }, [props.seconds])

    useEffect(() => {
        const interval = setInterval(() => {
            setTimer((prev) => {
                if (isPausedRef.current) return prev
                if (prev <= 0) return 0
                return prev - 1
            })
        }, 1000)
        return () => clearInterval(interval)
    }, [props.seconds])

    const progress = (timer / totalSeconds) * 100

    function formatTime(time: number) {
        if (time <= 0) {
            return '00:00'
        }

        const minutes = Math.floor(time / 60)
        const seconds = time % 60

        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
    }

    return (
        <div>
            <div className="text-center">
                <div className="font-medium antialiased tracking-wide text-gray-800 ">
                    {formatTime(totalSeconds)}
                </div>
                <div className="font-bold text-3xl tracking-wide text-gray-950">
                    {formatTime(timer)}
                </div>
            </div>
            <div className="flex justify-center items-center">
                <ActionIcon
                    radius="xl"
                    size="lg"
                    variant="filled"
                    aria-label="-10"
                    onClick={() => {
                        setTimer((prev) => prev - 10)
                        setTotalSeconds((prev) => prev - 10)
                    }}
                >
                    <IconRewindBackward10 />
                </ActionIcon>
                <RingProgress
                    sections={[{ value: progress, color: 'green' }]}
                    rootColor={progress === 0 ? 'green' : ''}
                    size={220}
                    thickness={20}
                    transitionDuration={1000}
                    label={
                        progress > 0 ? (
                            <span className="block w-full text-center font-bold">
                                {progress.toFixed(0)}%
                            </span>
                        ) : (
                            <span className="text-green-700 block w-full text-center font-bold">
                                Time up!
                            </span>
                        )
                    }
                />

                <ActionIcon
                    radius="xl"
                    size="lg"
                    variant="filled"
                    aria-label="+10"
                    onClick={() => {
                        setTimer((prev) => prev + 10)
                        setTotalSeconds((prev) => prev + 10)
                    }}
                >
                    <IconRewindForward10 />
                </ActionIcon>
            </div>

            <div className="flex gap-2 w-full justify-center pb-4">
                <ActionIcon
                    size="lg"
                    variant="filled"
                    aria-label="reset"
                    onClick={() => {
                        setTotalSeconds(props.seconds)
                        setTimer(props.seconds)
                    }}
                >
                    <IconRotate />
                </ActionIcon>

                <ActionIcon
                    size="lg"
                    variant={isPaused ? 'outline' : 'filled'}
                    aria-label="Run/Pause"
                    onClick={() => setIsPaused(!isPaused)}
                >
                    {isPaused ? <IconPlayerPlay /> : <IconPlayerPause />}
                </ActionIcon>
            </div>
        </div>
    )
}
