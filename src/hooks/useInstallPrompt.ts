import { useEffect, useState, useCallback } from "react";

interface PromptEvent extends Event {
  prompt: () => void;
}

export const useInstallPrompt = () => {
  const [isPwaInstallable, setIsPwaInstallable] = useState<boolean>(false);
  const [prompt, setPrompt] = useState<PromptEvent | null>(null);

  //ユーザーがPWAをインストールできる条件を満たした時に発火
  const handlePrompt = useCallback((e: PromptEvent) => {
    e.preventDefault();
    setIsPwaInstallable(true);
    setPrompt(e);
  }, []);

  //ユーザーがボタンを押した時に発火
  const acceptPrompt = () => {
    if (isPwaInstallable && prompt) {
      prompt.prompt();
    }
    setIsPwaInstallable(false);
  };

  useEffect(() => {
    window.addEventListener("beforeinstallprompt", handlePrompt as any);
    return () =>
      window.removeEventListener("beforeinstallprompt", handlePrompt as any);
  }, [handlePrompt]);

  return {
    isPwaInstallable,
    acceptPrompt,
  };
};
