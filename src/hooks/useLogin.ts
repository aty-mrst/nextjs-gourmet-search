import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithRedirect,
} from "@firebase/auth";
import { auth, db, provider } from "../../lib/firebase";
import { useEffect } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useRouter } from "next/router";

type UseLoginProps = {
  email: string;
  password: string;
};

export const useLogin = ({ email, password }: UseLoginProps) => {
  const router = useRouter();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      user && router.push("/");
    });
  }, [router]);

  const onGoogleLogin = async (e: any) => {
    e.preventDefault();
    signInWithRedirect(auth, provider);
  };

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

  const onGuestLogin = async (e: any) => {
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

  return {
    onGoogleLogin,
    onEmailLogin,
    onGuestLogin,
  };
};
