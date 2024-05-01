import { Header } from "@/components/Header";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuthContext } from "@/context/AuthContext";
import { Meta } from "@/components/Meta";
import { useSignUp } from "@/hooks/useSignUp";

export default function SignUp() {
  const router = useRouter();
  const { currentUser } = useAuthContext();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const { onSignUp } = useSignUp({ email, password });

  useEffect(() => {
    if (currentUser) router.push("/");
  }, [currentUser, router]);

  return (
    <>
      <Meta title="新規登録" />

      <Header />

      <main className="mt-[150px] px-[15px] w-[350px] max-[100%] mx-auto">
        <h1 className="text-center font-bold text-lg lg:text-lg">新規登録</h1>

        <div className="mt-4">
          <form onSubmit={onSignUp}>
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
