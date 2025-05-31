import useGenres from "./useGenres";

const useGenre = (id?: string) => {
  const { data: genres } = useGenres();
  return genres?.find((g) => g._id === id);
};

export default useGenre;
