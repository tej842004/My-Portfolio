import { create } from "zustand";

interface PortfolioQuery {
  genreId?: string;
}

interface PortfolioQueryStore {
  portfolioQuery: PortfolioQuery;
  setGenreId: (genreId: string | undefined) => void;
}

const usePortfolioQueryStore = create<PortfolioQueryStore>((set) => ({
  portfolioQuery: {},
  setGenreId: (genreId) =>
    set((store) => ({ portfolioQuery: { ...store.portfolioQuery, genreId } })),
}));

export default usePortfolioQueryStore;
