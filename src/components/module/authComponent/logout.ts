import { authClient } from "@/lib/auth-client"
import { removeLocalUserData } from "@/libs/localStorage";

const logout = async () => {
    const res = await authClient.signOut();
 
    if (res.data?.success) {
        removeLocalUserData();
    }
    return res
}
export default logout;