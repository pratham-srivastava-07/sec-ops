import { prismaClient } from "@ops/shared";

export default async function webhookSupabaseSignup(req: any, res: any): Promise<any> {
    const { authId, email, name } = req.body;

    const existing = await prismaClient.user.findUnique({ where: { authId: authId } });

    if (existing) {
        return res.status(400).json({ error: "User already exists" });
    }

    const profile = await prismaClient.user.create({
        data: {
            name,
            authId,
            email,
            role: "USER"
        }
    })

    return res.status(200).json({
        message: "User created successfully",
        result: profile
    })
}