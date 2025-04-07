'use client'

import { ActionIcon, RingProgress } from '@mantine/core'
import {
    IconPlayerPause,
    IconPlayerPlay,
    IconRewindBackward10,
    IconRewindForward10,
    IconRotate,
} from '@tabler/icons-react'
import React, { useCallback, useEffect, useMemo, useState } from 'react'

export default function Timer(props: { seconds: number }) {
    const [state, setState] = useState({
        timer: props.seconds,
        totalSeconds: props.seconds,
        isPaused: false,
    })

    useEffect(() => {
        setState((prev) => ({
            ...prev,
            timer: props.seconds,
            totalSeconds: props.seconds,
        }))
    }, [props.seconds])

    useEffect(() => {
        const interval = setInterval(() => {
            if (!state.isPaused && state.timer > 0) {
                setState((prev) => ({ ...prev, timer: prev.timer - 1 }))
            }
        }, 1000)
        return () => clearInterval(interval)
    }, [state.isPaused, props.seconds])

    const progress = useMemo(
        () => (state.timer / state.totalSeconds) * 100,
        [state.timer, state.totalSeconds],
    )

    const formatTime = useCallback((time: number) => {
        if (time <= 0) return '00:00'

        const mins = Math.floor(time / 60)
        const secs = time % 60
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
    }, [])

    const handleTimeAdjustment = useCallback((delta: number) => {
        setState((prev) => ({
            ...prev,
            timer: Math.max(0, prev.timer + delta),
            totalSeconds: Math.max(0, prev.totalSeconds + delta),
        }))
    }, [])

    const handleReset = useCallback(() => {
        setState({
            timer: props.seconds,
            totalSeconds: props.seconds,
            isPaused: false,
        })
    }, [])

    const handlePause = useCallback(() => {
        setState((prev) => ({
            ...prev,
            isPaused: !prev.isPaused,
        }))
    }, [])

    return (
        <div>
            <div className="text-center">
                <div className="font-medium antialiased tracking-wide text-gray-800 ">
                    {formatTime(state.totalSeconds)}
                </div>
                <div className="font-bold text-3xl tracking-wide text-gray-950">
                    {formatTime(state.timer)}
                </div>
            </div>
            <div className="flex justify-center items-center">
                <ActionIcon
                    radius="xl"
                    size="lg"
                    variant="filled"
                    aria-label="-10"
                    onClick={() => handleTimeAdjustment(-10)}
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
                    onClick={() => handleTimeAdjustment(10)}
                >
                    <IconRewindForward10 />
                </ActionIcon>
            </div>

            <div className="flex gap-2 w-full justify-center pb-4">
                <ActionIcon
                    size="lg"
                    variant="filled"
                    aria-label="reset"
                    onClick={handleReset}
                >
                    <IconRotate />
                </ActionIcon>

                <ActionIcon
                    size="lg"
                    color={state.isPaused ? 'blue' : 'green'}
                    variant={state.isPaused ? 'outline' : 'filled'}
                    aria-label="Run/Pause"
                    onClick={handlePause}
                >
                    {state.isPaused ? <IconPlayerPlay /> : <IconPlayerPause />}
                </ActionIcon>
            </div>
        </div>
    )
}
