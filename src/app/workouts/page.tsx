'use client'

import { useState } from 'react'
import { Button, Indicator } from '@mantine/core'
import { DatePicker, DatePickerProps } from '@mantine/dates'
import '@mantine/dates/styles.css'
import 'dayjs/locale/it'

const dayRenderer: DatePickerProps['renderDay'] = (date) => {
    const day = date.getDate()
    return (
        <Indicator size={6} color="red" offset={-3} disabled={day % 5 !== 0}>
            <div>{day}</div>
        </Indicator>
    )
}

export default function WorkoutCalendar() {
    const [dayFocus, setDayFocus] = useState<Date | null>(null)

    return (
        <div className="flex items-center justify-center flex-col gap-5">
            <DatePicker
                size="md"
                locale="it"
                value={dayFocus}
                onChange={setDayFocus}
                renderDay={dayRenderer}
            />

            {dayFocus && (
                <div className="text-lg font-semibold">
                    {dayFocus?.toLocaleDateString('it-IT', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                    })}
                </div>
            )}
            <div>{dayFocus && <Button>Aggiungi allenamento</Button>}</div>
        </div>
    )
}
