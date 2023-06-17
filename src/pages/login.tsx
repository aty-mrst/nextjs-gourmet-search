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
import GoogleIcon from "@mui/icons-material/Google";

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
      <Header />

      <main className="mt-[150px] px-[15px] w-[350px] max-[100%] mx-auto">
        <h1 className="text-center font-bold text-lg lg:text-lg">ログイン</h1>

        <div className="mt-4">
          {/* Googleでログイン */}
          <div>
            <button
              onClick={onGoogleLogin}
              className="border-[3px] border-[#333] w-[100%] rounded-md h-[50px]"
            >
              <GoogleIcon />
              <span className="inline-block ml-1">Googleで続行</span>
            </button>
          </div>

          <p className="py-3 text-center">or</p>

          {/* メールアドレスでログイン */}
          <div className="">
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
                className="w-[100%] rounded-md mt-4 h-[50px] bg-[#017D01] text-white font-bold"
              >
                ログイン
              </button>
            </form>

            <div className="mt-3 text-center">
              <Link href="/signup" className="text-sm underline">
                ユーザー登録がお済みでない方はこちらから
              </Link>
            </div>
          </div>

          {/* ゲスト用ログイン */}
          <div className="text-center mt-8">
            <button onClick={onGuestLogin} className="underline">
              ゲスト用ログイン
            </button>
            <p className="text-sm text-left mt-1">
              ※採用担当者様やちょっと覗いてみたい方など、どなたでもご利用ください。
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
