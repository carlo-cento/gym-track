'use client'

import { Group, TextInput, Button, ActionIcon, Card } from '@mantine/core'
import { useForm, zodResolver } from '@mantine/form'
import {
    IconChevronDown,
    IconChevronUp,
    IconHeart,
    IconTrendingUp,
    IconX,
} from '@tabler/icons-react'

import { z } from 'zod'

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
        validate: zodResolver(
            z.object({
                sets: z.array(
                    z.object({
                        peso: z.number().finite().positive(),
                        rip: z.number().finite().positive().int(),
                        key: z.number().finite().positive().int(),
                        isUp: z.boolean(),
                        isHearth: z.boolean(),
                    }),
                ),
            }),
        ),
    })

    function handleDecrement(index: number) {
        form.setFieldValue(
            `sets.${index}.rip`,
            form.values.sets[index].rip * 1 - 1,
        )
    }

    function handleIncrement(index: number) {
        form.setFieldValue(
            `sets.${index}.rip`,
            form.values.sets[index].rip * 1 + 1,
        )
    }

    function handleRemove(index: number) {
        form.removeListItem('sets', index)
    }

    const fields = form.getValues().sets.map((item, index) => (
        <Card key={index} shadow="xs" className="mb-3" p={'xs'}>
            <div className="absolute top-2 right-2">
                {index > 0 && (
                    <ActionIcon
                        size={'xs'}
                        color="red"
                        onClick={() => handleRemove(index)}
                    >
                        <IconX />
                    </ActionIcon>
                )}
            </div>
            <div className="grid grid-cols-[35px,50px,auto,55px] gap-2 items-end ">
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
                            fontSize: 16,
                        },
                    })}
                    label="Peso"
                    variant="filled"
                    type="number"
                    inputMode="decimal"
                    // pattern="[0-9]*"
                    placeholder="1kg"
                    key={form.key(`sets.${index}.peso`)}
                    {...form.getInputProps(`sets.${index}.peso`)}
                />
                <ActionIcon.Group className="flex items-end">
                    <ActionIcon
                        variant="filled"
                        color="#4c6ef526"
                        size="input-sm"
                        onClick={() => handleDecrement(index)}
                    >
                        <IconChevronDown color="var(--mantine-color-red-text)" />
                    </ActionIcon>
                    <TextInput
                        className="w-full"
                        styles={() => ({
                            input: {
                                textAlign: 'center',
                                paddingInline: 2,
                                fontSize: 16,
                            },
                        })}
                        label="Ripetizioni"
                        variant="filled"
                        type="number"
                        inputMode="decimal"
                        // pattern="[0-9]*"
                        placeholder="8"
                        radius={0}
                        key={form.key(`sets.${index}.rip`)}
                        {...form.getInputProps(`sets.${index}.rip`)}
                    />
                    <ActionIcon
                        variant="filled"
                        color="#4c6ef526"
                        size="input-sm"
                        onClick={() => handleIncrement(index)}
                    >
                        <IconChevronUp color="var(--mantine-color-teal-text)" />
                    </ActionIcon>
                </ActionIcon.Group>

                <ActionIcon.Group className="flex items-end pb-1">
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
        </Card>
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
