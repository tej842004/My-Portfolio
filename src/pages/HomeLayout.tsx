import { Grid, GridItem } from "@chakra-ui/react";
import Home from "../components/Home/Home";

const HomeLayout = () => {
  return (
    <Grid
      templateAreas={{
        base: `"main"`,
        md: `"main main"`,
      }}
    >
      <GridItem area="main">
        <Home />
      </GridItem>
    </Grid>
  );
};

export default HomeLayout;
