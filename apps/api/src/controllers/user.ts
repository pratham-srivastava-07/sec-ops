import { prismaClient } from "@ops/shared";

export default async function createUserController(req: any, res: any): Promise<any> {
    const { authId, email, name } = req.body;

  const profile = await prismaClient.user.create({
    data: {
      name,
      authId,
      email,
      role: "USER"
    }
  });

  res.json(profile);
}
