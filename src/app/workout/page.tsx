'use client'

import { Group, TextInput, Button, ActionIcon, Card } from '@mantine/core'
import { useForm, UseFormReturnType, zodResolver } from '@mantine/form'
import {
    IconChevronDown,
    IconChevronUp,
    IconHeart,
    IconTrendingUp,
    IconX,
} from '@tabler/icons-react'

import { z } from 'zod'

type SetType = {
    peso: number
    rip: number
    key: number
    isUp: boolean
}

type WorkoutSetProps = {
    index: number
    form: UseFormReturnType<{ sets: SetType[] }>
    onRemove: (index: number) => void
}

const SetSchema = z.object({
    peso: z.number().finite().positive({
        message: 'Il peso deve essere un numero positivo',
    }),
    rip: z.number().finite().positive().int({
        message: 'Le ripetizioni devono essere un numero intero positivo',
    }),
    key: z.number().finite().nonnegative().int(),
    isUp: z.boolean(),
})

const WorkoutSchema = z.object({
    sets: z.array(SetSchema),
})

function WorkoutSet({ index, form, onRemove }: WorkoutSetProps) {
    function handleDecrement() {
        form.setFieldValue(
            `sets.${index}.rip`,
            Math.max(1, form.values.sets[index].rip * 1 - 1),
        )
    }

    function handleIncrement() {
        form.setFieldValue(
            `sets.${index}.rip`,
            form.values.sets[index].rip * 1 + 1,
        )
    }

    const toggleIsUp = () => {
        form.setFieldValue(`sets.${index}.isUp`, !form.values.sets[index].isUp)
    }

    return (
        <Card key={index} shadow="xs" className="mb-3" p={'xs'}>
            <div className="absolute top-2 right-2">
                {form.values.sets.length > 1 && (
                    <ActionIcon
                        size={'xs'}
                        color="red"
                        onClick={() => onRemove(index)}
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
                    value={index + 1}
                    // value={set.key + 1}
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
                        disabled={form.values.sets[index].rip <= 1}
                        onClick={handleDecrement}
                        aria-label="diminuisci ripetizioni"
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
                        inputMode="numeric"
                        // pattern="[0-9]*"
                        placeholder="8"
                        min={1}
                        step={1}
                        radius={0}
                        key={form.key(`sets.${index}.rip`)}
                        {...form.getInputProps(`sets.${index}.rip`)}
                    />
                    <ActionIcon
                        variant="filled"
                        color="#4c6ef526"
                        size="input-sm"
                        onClick={handleIncrement}
                        aria-label="aumenta ripetizioni"
                    >
                        <IconChevronUp color="var(--mantine-color-teal-text)" />
                    </ActionIcon>
                </ActionIcon.Group>

                <ActionIcon.Group className="flex items-end pb-1">
                    <ActionIcon
                        onClick={toggleIsUp}
                        variant={
                            form.values.sets[index].isUp ? 'filled' : 'default'
                        }
                        color="indigo"
                        size="md"
                        aria-label="Ok!"
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
    )
}

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
                },
            ],
        },
        validate: zodResolver(WorkoutSchema),
    })

    function handleRemove(index: number) {
        form.removeListItem('sets', index)
    }

    function handleAddSet() {
        form.insertListItem('sets', {
            peso: form.values.sets[form.values.sets.length - 1].peso,
            rip: form.values.sets[form.values.sets.length - 1].rip,
            key: form.values.sets.length,
            isUp: false,
        })
    }

    return (
        <div className="max-w-2xl mx-auto">
            {form.getValues().sets.map((item, index) => (
                <WorkoutSet
                    key={item.key}
                    index={index}
                    form={form}
                    onRemove={handleRemove}
                />
            ))}

            <Group justify="center" mt="md">
                <Button
                    color="indigo"
                    size="compact-md"
                    fullWidth
                    onClick={handleAddSet}
                >
                    Aggiungi Set
                </Button>
                <Button
                    size="compact-md"
                    fullWidth
                    onClick={() => {
                        console.log(form.values)
                    }}
                >
                    Salva Allenamento
                </Button>
            </Group>
        </div>
    )
}
