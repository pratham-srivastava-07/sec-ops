import { supabase } from "@ops/shared";

export default async function requireAuth(req: any, res: any, next: any): Promise<any> {
    const token = req.headers.authorization?.replace("Bearer", "");

    if(!token) {
        return res.status(401).json({
            message: "No token found"
        })
    }

    const { data, error } = await supabase.auth.getUser(token)

    if(error || !data.user) {
        return res.status(401).json({
            message: "No user data found"
        })
    }
    

    req.user = data.user;

    next()
}

