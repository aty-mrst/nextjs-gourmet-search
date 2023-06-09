import { Header } from "@/components/Header";
import { signInWithRedirect } from "@firebase/auth";
import { auth, db, provider } from "../../lib/firebase";
import { useRouter } from "next/router";
import { useAuthContext } from "@/context/AuthContext";
import { collection, getDocs } from "firebase/firestore";

export default function Login() {
  const router = useRouter();
  const { currentUser } = useAuthContext(); //ログイン状態
  /**
   * Googleアカウントでログイン
   */
  const onGoogleLogin = async (e: any) => {
    e.preventDefault();
    await signInWithRedirect(auth, provider);
    router.push("/mypage");
  };

  return (
    <>
      <Header isNotSearch currentUser={currentUser} />
      <div className="mt-40">
        <button onClick={onGoogleLogin}>Googleでログイン</button>
      </div>
    </>
  );
}
