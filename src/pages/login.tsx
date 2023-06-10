import { Header } from "@/components/Header";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithRedirect,
} from "@firebase/auth";
import { auth, db, provider } from "../../lib/firebase";
import { useRouter } from "next/router";
import { useAuthContext } from "@/context/AuthContext";
import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import Link from "next/link";
// import GoogleIcon from "@mui/icons-material/Google";

export default function Login() {
  const router = useRouter();
  const { currentUser } = useAuthContext(); //ログイン状態
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      user && router.push("/");
    });
  }, []);

  /**
   * Googleアカウントでログイン
   */
  const onGoogleLogin = async (e: any) => {
    e.preventDefault();
    await signInWithRedirect(auth, provider);
  };

  /**
   * メールアドレスのログイン
   */
  const onEmailLogin = async (e: any) => {
    e.preventDefault();
    try {
      signInWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
          const user = userCredential.user;

          const docRef = doc(db, "user", user.uid);
          const docSnap = await getDoc(docRef);
          if (!docSnap.exists()) {
            await setDoc(doc(db, "user", user.uid), {});
          }
          router.push("/");
        })
        .catch((error) => {
          console.log(error);
          alert("ログインに失敗しました");
        });
    } catch {
      alert("ログインエラーが起きました");
    }
  };

  /**
   * ゲスト用ののログイン
   */
  const onGuestLogin = async (e: any) => {
    // setIsAllLoad(true);
    try {
      signInWithEmailAndPassword(
        auth,
        process.env.NEXT_PUBLIC_GUEST_EMAIL!,
        process.env.NEXT_PUBLIC_GUEST_PASSWORD!
      )
        .then(async (userCredential) => {
          const user = userCredential.user;

          const docRef = doc(db, "user", user.uid);
          const docSnap = await getDoc(docRef);
          if (!docSnap.exists()) {
            await setDoc(doc(db, "user", user.uid), {});
          }
          // setIsAllLoad(false);
          router.push("/");
        })
        .catch((error) => {
          console.log(error);
          alert("ログインに失敗しました");
        });
    } catch {
      alert("ログインエラーが起きました");
    }
  };

  return (
    <>
      <Header isNotSearch currentUser={currentUser} />
      <div className="mt-40">
        {/* Googleでログイン */}
        <button
          onClick={onGoogleLogin}
          className="border-[3px] border-[#333] w-[100%] rounded-md h-[50px]"
        >
          {/* <GoogleIcon /> */}
          <span className="inline-block ml-1">Googleで続行</span>
        </button>

        {/* メールアドレスでログイン */}
        <form onSubmit={onEmailLogin}>
          <div>
            <input
              type="email"
              required
              value={email}
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              className="border-[3px] border-[#333] w-[100%] rounded-md px-3 h-[50px]"
            />
          </div>
          <div className="mt-4">
            <input
              type="password"
              required
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              className="border-[3px] border-[#333] w-[100%] rounded-md px-3 h-[50px]"
            />
          </div>
          <button
            type="submit"
            className="w-[100%] rounded-md mt-8 h-[50px] bg-[#00488e] text-white font-bold"
          >
            ログイン
          </button>
          <div className="mt-3">
            <Link href="/signup" className="text-sm">
              ユーザー登録がお済みでない方はこちらから
            </Link>
          </div>
        </form>

        {/* ゲスト用ログイン */}
        <button onClick={onGuestLogin}>ゲスト用ログインはこちら</button>
      </div>
    </>
  );
}
