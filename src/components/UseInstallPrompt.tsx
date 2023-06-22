import { useEffect, useState, useCallback } from "react";

interface PromptEvent extends Event {
  prompt: () => void;
}

const useInstallPrompt = (): [boolean, () => void] => {
  const [isShown, setIsShown] = useState(false);
  const [prompt, setPrompt] = useState<PromptEvent | null>(null);

  //ユーザーがPWAをインストールできる条件を満たした時に発火
  const handlePrompt = useCallback((e: PromptEvent) => {
    console.log("handlePromptの発火");
    e.preventDefault();
    setIsShown(true);
    setPrompt(e);
  }, []);

  //ユーザーがボタンを押した時に発火
  const acceptPrompt = () => {
    console.log("acceptPromptの発火", acceptPrompt);
    if (isShown && prompt) {
      prompt.prompt();
    }
    setIsShown(false);
  };

  useEffect(() => {
    window.addEventListener("beforeinstallprompt", handlePrompt as any);
    return () =>
      window.removeEventListener("beforeinstallprompt", handlePrompt as any);
  }, [handlePrompt]);

  return [isShown, acceptPrompt];
};

export default useInstallPrompt;
