import { Header } from "@/components/Header";
import { createUserWithEmailAndPassword } from "@firebase/auth";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { auth } from "../../lib/firebase";
import Link from "next/link";
import { useAuthContext } from "@/context/AuthContext";
import { Meta } from "@/components/Meta";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { currentUser } = useAuthContext(); //ログイン状態

  useEffect(() => {
    if (currentUser) router.push("/");
  }, []);

  /**
   * ユーザー会員登録
   */
  const onSingUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          alert("会員登録ができました！");
          router.push("/");
        })
        .catch((error) => {
          alert("メールアドレスとパスワードを再度ご確認下さい。");
          console.log(error);
        });
    } catch (error) {
      alert("会員登録に失敗しました。");
    }
  };

  return (
    <>
      <Meta title="新規登録" />

      <Header />

      <main className="mt-[150px] px-[15px] w-[350px] max-[100%] mx-auto">
        <h1 className="text-center font-bold text-lg lg:text-lg">新規登録</h1>

        <div className="mt-4">
          <form onSubmit={onSingUp}>
            <div>
              <input
                type="email"
                required
                value={email}
                placeholder="メールアドレス"
                onChange={(e) => setEmail(e.target.value)}
                className="border-[3px] border-[#333] w-[100%] rounded-md px-3 h-[50px]"
              />
            </div>
            <div className="mt-4">
              <input
                type="パスワード"
                required
                value={password}
                placeholder="パスワード"
                onChange={(e) => setPassword(e.target.value)}
                className="border-[3px] border-[#333] w-[100%] rounded-md px-3 h-[50px]"
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-[100%] rounded-md mt-8 h-[50px] bg-[#017D01] text-white font-bold"
              >
                サインアップ
              </button>
            </div>
          </form>

          <div className="mt-3 text-center">
            <Link href={"/login"} className="text-sm underline">
              登録済みの方はこちら
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
