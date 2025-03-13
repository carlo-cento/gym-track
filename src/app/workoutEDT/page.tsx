'use client'

import { Group, TextInput, Button, ActionIcon } from '@mantine/core'
import { useForm } from '@mantine/form'
import {
    IconChevronDown,
    IconChevronUp,
    IconHeart,
    IconTrendingUp,
} from '@tabler/icons-react'

export default function WorkoutEDT() {
    const form = useForm({
        mode: 'controlled',
        initialValues: {
            recupero: 0,
            durata: 10,
            sets: [
                {
                    peso: 0,
                    rip: 0,
                    key: 0,
                    workout: '',
                    isUp: false,
                    isHearth: false,
                },
            ],
        },
    })

    const fields = form.getValues().sets.map((item, index) => (
        <div className="flex flex-col gap-2 pb-4" key={index}>
            <TextInput
                label="Workout"
                variant="filled"
                type="text"
                key={form.key(`sets.${index}.workout`)}
                {...form.getInputProps(`sets.${index}.workout`)}
            />

            <div className="grid grid-cols-[35px,50px,auto,55px] items-end gap-2 pb-3">
                <TextInput
                    styles={() => ({
                        input: {
                            textAlign: 'center',
                            paddingInline: 2,
                        },
                    })}
                    readOnly
                    label="Set"
                    variant="filled"
                    value={item.key + 1}
                    key={form.key(`sets.${index}.key`)}
                />

                <TextInput
                    styles={() => ({
                        input: {
                            textAlign: 'center',
                            paddingInline: 2,
                        },
                    })}
                    label="Peso"
                    variant="filled"
                    type="number"
                    placeholder="1kg"
                    key={form.key(`sets.${index}.peso`)}
                    {...form.getInputProps(`sets.${index}.peso`)}
                />
                <ActionIcon.Group className="flex items-end">
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
                        styles={() => ({
                            input: {
                                textAlign: 'center',
                                paddingInline: 2,
                            },
                        })}
                        label="Ripetizioni"
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

                <ActionIcon.Group className="flex items-center pb-1">
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
                                form.values.sets[index].isUp
                                    ? 'white'
                                    : 'indigo'
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
        </div>
    ))

    return (
        <div className="max-w-2xl mx-auto">
            {fields}

            <Group justify="center" mt="md">
                <Button
                    color="indigo"
                    size="compact-md"
                    fullWidth
                    onClick={() =>
                        form.insertListItem('sets', {
                            peso: 0,
                            rip: 0,
                            key: form.values.sets.length,
                            workout: '',
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
