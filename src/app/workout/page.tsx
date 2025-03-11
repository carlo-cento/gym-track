'use client'

import { Group, TextInput, Button, ActionIcon } from '@mantine/core'
import { useForm } from '@mantine/form'
import {
    IconChevronDown,
    IconChevronUp,
    IconHeart,
    IconTrendingUp,
} from '@tabler/icons-react'

export default function Workout() {
    const form = useForm({
        mode: 'controlled',
        initialValues: {
            sets: [
                {
                    peso: 50,
                    rip: 6,
                    key: 0,
                    isUp: false,
                    isHearth: false,
                },
            ],
        },
    })

    const fields = form.getValues().sets.map((item, index) => (
        <div
            className="grid grid-cols-[35px,50px,auto,55px] gap-2 items-center pb-3"
            key={index}
        >
            <div className="w-3 flex items-center justify-center h-8 bg-slate-100 px-4  rounded-md">
                {item.key + 1}
            </div>
            <TextInput
                styles={(theme) => ({
                    input: {
                        textAlign: 'center',
                        paddingInline: 2,
                    },
                })}
                variant="filled"
                type="number"
                placeholder="1kg"
                key={form.key(`sets.${index}.peso`)}
                {...form.getInputProps(`sets.${index}.peso`)}
            />
            <ActionIcon.Group>
                <ActionIcon
                    variant="filled"
                    color="#4c6ef526"
                    size="input-sm"
                    onClick={() =>
                        form.setFieldValue(
                            `sets.${index}.rip`,
                            form.values.sets[index].rip - 1,
                        )
                    }
                >
                    <IconChevronDown color="var(--mantine-color-red-text)" />
                </ActionIcon>
                <TextInput
                    className="w-full"
                    styles={(theme) => ({
                        input: {
                            textAlign: 'center',
                            paddingInline: 2,
                        },
                    })}
                    variant="filled"
                    type="number"
                    placeholder="8"
                    radius={0}
                    key={form.key(`sets.${index}.rip`)}
                    {...form.getInputProps(`sets.${index}.rip`)}
                />
                <ActionIcon
                    variant="filled"
                    color="#4c6ef526"
                    size="input-sm"
                    onClick={() =>
                        form.setFieldValue(
                            `sets.${index}.rip`,
                            form.values.sets[index].rip + 1,
                        )
                    }
                >
                    <IconChevronUp color="var(--mantine-color-teal-text)" />
                </ActionIcon>
            </ActionIcon.Group>

            <ActionIcon.Group className="flex items-center">
                <ActionIcon
                    onClick={() => {
                        form.setFieldValue(
                            `sets.${index}.isUp`,
                            !form.values.sets[index].isUp,
                        )
                    }}
                    variant={
                        form.values.sets[index].isUp ? 'filled' : 'default'
                    }
                    color="indigo"
                    size="md"
                    aria-label="Settings"
                >
                    <IconTrendingUp
                        size={20}
                        color={
                            form.values.sets[index].isUp ? 'white' : 'indigo'
                        }
                        stroke={1.5}
                    />
                </ActionIcon>

                <ActionIcon
                    onClick={() => {}}
                    variant="default"
                    size="md"
                    aria-label="Likes"
                >
                    <IconHeart size={20} color={'indigo'} stroke={1.5} />
                </ActionIcon>
            </ActionIcon.Group>
        </div>
    ))

    return (
        <div className="max-w-2xl mx-auto">
            <div className="grid grid-cols-[35px,50px,auto,55px] gap-2 items-center pb-3 font-semibold text-sm text-slate-900">
                <span className="px-1">Set</span>
                <span className="px-1">Peso</span>
                <span className="px-1">Rip</span>
                <span className="px-1">Note</span>
            </div>

            {fields}

            <Group justify="center" mt="md">
                <Button
                    color="indigo"
                    size="compact-md"
                    fullWidth
                    onClick={() =>
                        form.insertListItem('sets', {
                            peso: form.values.sets[form.values.sets.length - 1]
                                .peso,
                            rip: form.values.sets[form.values.sets.length - 1]
                                .rip,
                            key: form.values.sets.length,
                            isUp: false,
                            isHearth: false,
                        })
                    }
                >
                    Aggiungi Set
                </Button>
            </Group>
        </div>
    )
}
