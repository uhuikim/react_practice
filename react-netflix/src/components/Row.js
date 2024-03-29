import axios from "../api/axios";
import React, { useEffect, useState, useCallback } from "react";
import "./Row.css";

const Row = ({ title, id, fetchUrl, isLargeRow }) => {
    const [movies, setMovies] = useState([]);

    const fetchMovieData = useCallback(async () => {
        const request = await axios.get(fetchUrl);
        setMovies(request.data.results);
    }, [fetchUrl]);

    useEffect(() => {
        fetchMovieData();
    }, [fetchMovieData]);

    return (
        <section className="row">
            <h2>{title}</h2>

            <div className="slider">
                <div className="slider__arrow-left">
                    <span
                        className="arrow"
                        onClick={() => {
                            document.getElementById(id).scrollLeft -= window.innerWidth - 80;
                        }}>
                        {"<"}
                    </span>
                </div>
                <div id={id} className="row__posters">
                    {movies.map((movie) => (
                        <img
                            key={movie.id}
                            className={`row__poster ${isLargeRow && "row__posterLarge"}`}
                            src={`https://image.tmdb.org/t/p/original/${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                            alt={movie.name}
                        />
                    ))}
                </div>
                <div className="slider__arrow-right">
                    <span
                        className="arrow"
                        onClick={() => {
                            document.getElementById(id).scrollLeft += window.innerWidth + 80;
                        }}>
                        {">"}
                    </span>
                </div>
            </div>
        </section>
    );
};

export default Row;
