import { Button, Group } from "@mantine/core"

export function Bottombar() {
	return (
		<div className="block sm:hidden fixed bottom-0 right-0 left-0 z-50 ">
			<Group justify="center" p="sm" gap="xs" grow>
				<Button variant="default" component="a" href="/profile">
					profile
				</Button>
				<Button variant="default" component="a" href="/dashboard">
					dashboard
				</Button>
				<Button variant="default" component="a" href="/workouts">
					workouts
				</Button>
			</Group>
		</div>
	)
}
