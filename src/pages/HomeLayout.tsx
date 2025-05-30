import { Grid, GridItem } from "@chakra-ui/react";
import Main from "../components/Main";

const HomeLayout = () => {
  return (
    <Grid
      templateAreas={{
        base: `"main"`,
        md: `"main main"`,
      }}
    >
      <GridItem area="main">
        <Main />
      </GridItem>
    </Grid>
  );
};

export default HomeLayout;
