import { prismaClient } from "@ops/shared";

export default function requireRole(roles: string[]) {
    return async function(req: any, res: any, next: any): Promise<any> {
        const user = req.user;

        const profile = await prismaClient.user.findUnique({
            where: {
                authId: user.id
            }
        })

        if (!profile || !roles.includes(profile.role)) {
            return res.status(403).json({ error: "Access denied" });
        }

        req.user.role = profile.role;
        next();
    }
}