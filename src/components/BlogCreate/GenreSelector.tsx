import { ChevronDownIcon } from "@chakra-ui/icons";
import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import type { Genre } from "../../entities/Genre";
import useGenres from "../../hooks/Genre/useGenres";

const GenreSelector = ({
  selectedGenre,
  setSelectedGenreId,
}: {
  selectedGenre: Genre | undefined;
  setSelectedGenreId: (genreId: string | undefined) => void;
}) => {
  const { data: genres } = useGenres();
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
        {genres?.data.map((genre) => (
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

export default GenreSelector;
