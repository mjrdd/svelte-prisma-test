import { PrismaClient } from '@prisma/client';
import type { RequestHandler } from '@sveltejs/kit';

const prisma = new PrismaClient();

export const GET: RequestHandler = async () => {
	const users = await prisma.user.findMany();

	return {
		status: 200,
		body: users
	};
};

export const POST: RequestHandler = async ({ request }) => {
	const data = await request.json();

	const user = await prisma.user.create({
		data: {
			username: data.username,
			email: data.email,
			birthdate: new Date(data.birthdate)
		}
	});

	return {
		status: 200,
		body: user
	};
};
