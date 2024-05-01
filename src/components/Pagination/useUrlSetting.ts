import { useEffect, useState } from "react";
import { UseUrlSettingProps } from "./index.type";

export const useUrlSetting = ({
  currentPage,
  path,
  totalPages,
}: UseUrlSettingProps) => {
  const [rootUrl, setRootUrl] = useState<string>("");
  const [resultPath, setResultPath] = useState<string>("");
  const [pageParam, setPageParam] = useState<string>("&page=");
  const [resultTotalPage, setResultTotalPage] = useState<number>(totalPages);

  useEffect(() => {
    if (process.env.NODE_ENV === "production") {
      setRootUrl(process.env.NEXT_PUBLIC_SITE_URL!);
    } else if (process.env.NODE_ENV === "development") {
      setRootUrl("http://localhost:3000");
    }
  }, []);

  useEffect(() => {
    if (rootUrl === "") return;

    let url = new URL(path, rootUrl);
    url.searchParams.delete("page");
    setResultPath(url.href);
  }, [path, rootUrl]);

  useEffect(() => {
    if (path === "/") {
      setPageParam("?page=");
      return;
    }

    setPageParam("&page=");
  }, [path]);

  useEffect(() => {
    if (!totalPages) setResultTotalPage(1);
  }, [totalPages]);

  const prevPage = Number(currentPage) - 1;
  const nextPage = Number(currentPage) + 1;

  return {
    resultPath,
    pageParam,
    prevPage,
    nextPage,
    totalPages,
    resultTotalPage,
  };
};
