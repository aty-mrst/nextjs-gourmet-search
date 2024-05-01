import { signOut } from "@firebase/auth";
import { auth } from "../../../lib/firebase";
import { useRouter } from "next/router";

export const useLogout = () => {
  const router = useRouter();

  const onLogout = async () => {
    const isConfirm = confirm("ログアウトしますか？");
    if (!isConfirm) return;
    await signOut(auth);
    router.push("/login");
  };

  return { onLogout };
};
