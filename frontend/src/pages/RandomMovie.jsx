import { useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";

function RandomMovie() {
  const API_URL = "http://localhost:3001";

  const navigate = useNavigate();

  const [randomMovies, setRandomMovies] = useState([]);
  const [currentPageMap, setCurrentPageMap] = useState({});
  const actorsPerPage = 5;

  const handleGetRandomMovies = async () => {
    try {
      const response = await fetch(`${API_URL}/api/random-movies`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.log(data);

      // Initialize currentPage for each movie to 1
      const initialCurrentPageMap = {};
      data.forEach((movie) => {
        initialCurrentPageMap[movie.id] = 1;
      });

      setCurrentPageMap(initialCurrentPageMap);
      setRandomMovies(data);
    } catch (error) {
      console.error("Failed to fetch random movies", error);
    }
  };

  const handlePageChange = (movieId, newPage) => {
    setCurrentPageMap((prev) => ({
      ...prev,
      [movieId]: newPage,
    }));
  };

  const handleActorClick = (actor) => {
    navigate(`/search-actor/${encodeURIComponent(actor)}`);
  };

  return (
    <div className="container-fluid text-primary h-auto d-flex flex-column justify-content-center align-items-center px-5 pt-5">
      <div className="mb-2 text-center">
        <h2 className="mb-4">Random movie generator</h2>
        <Button
          variant="primary"
          type="submit"
          className="ms-1 mt-1"
          onClick={handleGetRandomMovies}
        >
          Get random movies
        </Button>
      </div>

      {randomMovies.length > 0 && (
        <div style={{ overflowY: "auto", height: "50vh" }}>
          <div className="d-flex flex-wrap justify-content-center overflow-auto">
            {randomMovies.map((movie) => (
              <Card
                key={movie.id}
                className="m-2"
                style={{ height: "425px", width: "325px" }}
              >
                <Card.Body>
                  <Card.Title style={{ height: "50px" }}>
                    <strong>{movie.title}</strong>
                    <span className="ps-1 text-muted small">{movie.year}</span>
                  </Card.Title>
                  <hr />

                  <div style={{ height: "150px" }}>
                    <ul
                      style={{
                        listStyleType: "none",
                        margin: 0,
                        padding: 0,
                      }}
                    >
                      {movie.cast
                        ?.slice(
                          (currentPageMap[movie.id] - 1) * actorsPerPage,
                          currentPageMap[movie.id] * actorsPerPage
                        )
                        .map((actor, index) => (
                          <li key={`${movie.id}-${index}-${actor}`}>
                            <a
                              href={`/${actor}`}
                              onClick={(e) => {
                                e.preventDefault();
                                handleActorClick(actor);
                              }}
                            >
                              {actor}
                            </a>
                          </li>
                        ))}
                    </ul>

                    {movie.cast && movie.cast.length > actorsPerPage && (
                      <div className="d-flex justify-content-center">
                        <Button
                          variant="link"
                          disabled={currentPageMap[movie.id] === 1}
                          onClick={() =>
                            handlePageChange(
                              movie.id,
                              currentPageMap[movie.id] - 1
                            )
                          }
                        >
                          Previous
                        </Button>
                        <Button
                          variant="link"
                          disabled={
                            currentPageMap[movie.id] * actorsPerPage >=
                            movie.cast.length
                          }
                          onClick={() =>
                            handlePageChange(
                              movie.id,
                              currentPageMap[movie.id] + 1
                            )
                          }
                        >
                          Next
                        </Button>
                      </div>
                    )}
                  </div>

                  <hr />

                  <Card.Text>Genres:</Card.Text>

                  <ul>
                    {movie.genres?.map((genre) => (
                      <li key={genre}>{genre}</li>
                    ))}
                  </ul>
                </Card.Body>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default RandomMovie;
