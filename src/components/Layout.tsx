'use client'

import { AppShell, Burger } from '@mantine/core'
import { Navbar } from './Navbar'
import { useDisclosure } from '@mantine/hooks'
import { Bottombar } from './Bottombar'

export function Layout({ children }: { children: React.ReactNode }) {
    const [opened, { toggle }] = useDisclosure()

    return (
        <AppShell
            header={{ height: 60 }}
            navbar={{
                width: 300,
                breakpoint: 'sm',
                collapsed: { mobile: !opened },
            }}
            padding="md"
        >
            <AppShell.Header>
                <Burger
                    opened={opened}
                    onClick={toggle}
                    hiddenFrom="sm"
                    size="sm"
                />
            </AppShell.Header>

            <AppShell.Navbar p="md">
                <Navbar />
            </AppShell.Navbar>

            <AppShell.Main>{children}</AppShell.Main>
            <Bottombar />
        </AppShell>
    )
}
