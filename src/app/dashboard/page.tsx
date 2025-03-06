'use client'

import Timer from '@/components/Timer'
import { Button, Modal } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'

export default function Dashboard() {
    const [opened, { open, close }] = useDisclosure(false)

    return (
        <div>
            <Modal opened={opened} onClose={close} title="Timer">
                <Timer seconds={30}></Timer>
            </Modal>

            <div>
                <Button onClick={open}>Button</Button>
            </div>
        </div>
    )
}
