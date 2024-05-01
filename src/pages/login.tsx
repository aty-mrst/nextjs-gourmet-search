import { Header } from "@/components/Header";
import Link from "next/link";
import GoogleIcon from "@mui/icons-material/Google";
import { Meta } from "@/components/Meta";
import { useLogin } from "@/hooks/useLogin";

export default function Login() {
  const {
    email,
    setEmail,
    password,
    setPassword,
    onGoogleLogin,
    onEmailLogin,
    onGuestLogin,
  } = useLogin();

  return (
    <>
      <Meta title="ログイン" />

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
                  placeholder="メールアドレス"
                  onChange={(e) => setEmail(e.target.value)}
                  className="border-[3px] border-[#333] w-[100%] rounded-md px-3 h-[50px]"
                />
              </div>
              <div className="mt-4">
                <input
                  type="password"
                  required
                  value={password}
                  placeholder="パスワード"
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
