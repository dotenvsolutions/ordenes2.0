import { useQuery } from "react-query";

export const useTodosLosUsuarios = async () => {
  const { isLoading, error, data } = useQuery("repoData", () =>
    fetch("https://api.github.com/repos/tannerlinsley/react-query").then(
      (res) => res.json()
    )
  );

  return {
    isLoading,
    error,
    data,
  };
};
