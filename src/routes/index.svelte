<script lang="ts" context="module">
	import type { Load } from '@sveltejs/kit';

	export const load: Load = async ({ fetch }) => {
		const users = await fetch('/api/auth', {
			method: 'GET'
		});

		return {
			status: users.status,
			props: {
				users: await users.json()
			}
		};
	};
</script>

<script lang="ts">
	import { writable } from 'svelte/store';

	export var users: any[];

	const store = writable(users);

	var email = '';
	var username = '';
	var birthdate = '';

	async function createUser() {
		const res = await fetch('/api/auth', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				email,
				username,
				birthdate
			})
		});

		const user = await res.json();

		if (user) {
			store.update((state) => {
				return [...state, user];
			});
		}
	}
</script>

<div>
	<div>
		<form on:submit|preventDefault={createUser}>
			<input type="email" bind:value={email} placeholder="Email address" required />
			<input type="text" bind:value={username} placeholder="Username" required />
			<input type="date" bind:value={birthdate} placeholder="Birthdate" required />
			<button type="submit">Add</button>
		</form>
	</div>
	<div>
		<div class="user-table">
			{#each $store as user}
				<div>{user.email}</div>
				<div>{user.username}</div>
				<div>{new Date(user.birthdate).toDateString()}</div>
			{/each}
		</div>
	</div>
</div>

<style>
	.user-table {
		display: grid;
		grid-template-columns: repeat(3, 300px);
	}
</style>
