import { authClient } from "@/lib/auth-client"
import { removeCartCount, removeLocalUserData } from "@/libs/localStorage";

const logout = async () => {
    const res = await authClient.signOut();
 
    if (res.data?.success) {
        removeLocalUserData();
        removeCartCount()
    }
    return res
}
export default logout;