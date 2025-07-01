import { prismaClient } from "@ops/shared";

export default async function createUserController(req: any, res: any): Promise<any> {
    const { authId, email } = req.body;

  const profile = await prismaClient.user.upsert({
    where: { authId },
    update: {},
    create: {
      authId,
      email,
      role: "USER"
    }
  });

  res.json(profile);
}