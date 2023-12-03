import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function useQuery(): [
  URLSearchParams,
  (object: Record<string, string | null>) => string
] {
  const [query, setQuery] = useState<URLSearchParams>(new URLSearchParams());

  const router = useRouter();

  function updateQuery(object: Record<string, string | null>) {
    const params = new URLSearchParams(
      new URLSearchParams(window.location.search)
    );

    Object.entries(object).forEach(([key, value]) => {
      if (value === null) {
        params.delete(key);
      }

      if (typeof value === "string") {
        params.set(key, value);
      }
    });

    setQuery(params);

    const newParams = params.toString();

    const newPath = window.location.pathname + "?" + newParams;

    router.push(newPath);

    return newParams;
  }

  useEffect(() => {
    const handler = () => {
      const newSearchParams = new URLSearchParams(window.location.search);

      setQuery(newSearchParams);
    };

    handler();

    const originalPushState = history.pushState;

    history.pushState = function (data, title, url) {
      originalPushState.apply(history, [data, title, url]);

      handler();
    };

    // back and forward history
    window.addEventListener("popstate", handler);

    return () => {
      history.pushState = originalPushState;
      window.removeEventListener("popstate", handler);
    };
  }, []);

  return [query, updateQuery];
}
