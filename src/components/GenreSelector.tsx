import { ChevronDownIcon } from "@chakra-ui/icons";
import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import useGenre from "../hooks/useGenre";
import useGenres from "../hooks/useGenres";
import usePortfolioQueryStore from "../store";

const DropDownMenu = () => {
  const { data: genres } = useGenres();
  const selectedGenreId = usePortfolioQueryStore(
    (s) => s.portfolioQuery.genreId
  );
  const setSelectedGenreId = usePortfolioQueryStore((s) => s.setGenreId);
  const selectedGenre = useGenre(selectedGenreId);

  return (
    <Menu>
      <MenuButton
        as={Button}
        rightIcon={<ChevronDownIcon />}
        variant="outline"
        borderWidth="1px"
        borderColor="gray.400"
        fontWeight="normal"
      >
        {selectedGenre?.title || "Genres"}
      </MenuButton>
      <MenuList>
        {genres?.map((genre) => (
          <MenuItem
            key={genre._id}
            onClick={() => setSelectedGenreId(genre._id)}
          >
            {genre.title}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default DropDownMenu;
