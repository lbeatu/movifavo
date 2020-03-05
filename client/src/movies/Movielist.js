import React, { useState, useContext } from "react";
import MovieContext from "../context/movie/movieContext";
import AlertContext from "../context/alert/alertContext";
import MovieItem from "./MovieItem";
import { Button } from "rebass";
import Spinner from "./Spinner";
import Alert from "../components/layouts/Alert";
import { Input } from "@rebass/forms";
import { Flex, Box } from "reflexbox";
import { ThemeProvider } from "emotion-theming";
const Movielist = () => {
  const movieContext = useContext(MovieContext);
  const alertContext = useContext(AlertContext);

  const { movies, loading, errormessage } = movieContext;
  const [text, setText] = useState("");

  const onChange = e => setText(e.target.value);

  const onClick = e => {
    e.preventDefault();
    if (text.length <= 2) {
      alertContext.setAlert("Title is too short..Try Again please..", "light");
    } else {
      movieContext.sendRequest(text);
    }
  };

  if (loading) {
    return <Spinner />;
  } else {
    return (
      <ThemeProvider
        theme={{
          colors: {
            background: "red",
            primary: "#eb2f06"
          },
          space: [0, 9, 12, 24, 48],
          fontSizes: [14, 16, 18, 20, 24],
          radii: {
            default: 1
          }
        }}
      >
        <Box as="form" onSubmit={e => e.preventDefault()} py={3}>
          <Flex mx={-1} mb={8}>
            <Box width={1} px={2} py={6}>
              <Input
                id="Search"
                name="Search"
                placeholder="Welcome! Search movie"
                value={text}
                onChange={onChange}
              ></Input>
            </Box>
            <Box width={1 / 3} px={10} mb={4} color="black">
              <Button onClick={onClick}>Get Movies!</Button>
            </Box>
          </Flex>
          <Box
            sx={{
              display: "grid",
              gridGap: 6,
              gridTemplateColumns: "repeat(4, minmax(256px, 4fr))"
            }}
          >
            {errormessage == null ? (
              movies.map(movies => (
                <MovieItem key={movies.id} movies={movies} />
              ))
            ) : (
              <Alert alert={(errormessage, "danger")} />
            )}
          </Box>
        </Box>
      </ThemeProvider>
    );
  }
};
export default Movielist;
