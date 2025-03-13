import { Button } from '@mantine/core'

export function Navbar() {
    return (
        <>
            <h1>Menu</h1>
            <Button
                fullWidth
                variant="outline"
                mb={5}
                component="a"
                href="/dashboard"
            >
                Dashboard
            </Button>
            <Button
                fullWidth
                variant="outline"
                mb={5}
                component="a"
                href="/calendar"
            >
                Allenamenti
            </Button>
            <Button
                fullWidth
                variant="outline"
                mb={5}
                component="a"
                href="/workout"
            >
                Aggiungi Allenamento
            </Button>
            <Button
                fullWidth
                variant="outline"
                mb={5}
                component="a"
                href="/workoutEDT"
            >
                Aggiungi Allenamento EDT
            </Button>
            <Button
                fullWidth
                variant="outline"
                mb={5}
                component="a"
                href="/profile"
            >
                Profilo
            </Button>
        </>
    )
}
