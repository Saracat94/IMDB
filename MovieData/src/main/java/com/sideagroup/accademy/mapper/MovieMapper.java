package com.sideagroup.accademy.mapper;

import com.sideagroup.accademy.dto.GetAllMoviesResponseDto;
import com.sideagroup.accademy.dto.MovieDto;
import com.sideagroup.accademy.model.Movie;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Component;

@Component
public class MovieMapper {

    @Autowired
    private MovieCelebrityMapper movieCelebrityMapper;

    @Autowired
    private CountryMapper countryMapper;

    @Autowired
    private RatingMapper ratingMapper;

    public MovieDto toDto(Movie entity, boolean withCast, boolean withCountry) {
        MovieDto dto = new MovieDto();
        dto.setTitle(entity.getTitle());
        dto.setId(entity.getId());
        dto.setYear(entity.getYear());
        dto.setRunningTime(entity.getRuntimeMinutes());
        dto.setGenres(entity.getGenres());
        dto.setRating(ratingMapper.toDto(entity.getRating()));

        if (withCast)
            dto.getCast().addAll(entity.getNames().stream().map(item -> movieCelebrityMapper.toDto(item)).toList());

        if (withCountry)
            dto.getCountry().addAll(entity.getCountries().stream().map(item->countryMapper.toDto(item)).toList());

        return dto;
    }

    public GetAllMoviesResponseDto toDto(Page<Movie> movies, int size) {
        GetAllMoviesResponseDto dto = new GetAllMoviesResponseDto();
        dto.getPagination().setCurrentPage(movies.getNumber());
        dto.getPagination().setTotalElements(movies.getTotalElements());
        dto.getPagination().setTotalPages(movies.getTotalPages());
        dto.getPagination().setPageSize(size);
        dto.getMovies().addAll(movies.getContent().stream().map(item -> toDto(item, true, false)).toList());
        return dto;
    }

    public Movie toEntity(MovieDto dto) {
        Movie entity = new Movie();
        entity.setTitle(dto.getTitle());
        entity.setGenres(dto.getGenres());
        entity.setId(dto.getId());
        entity.setYear(dto.getYear());
        entity.setRuntimeMinutes(dto.getRunningTime());
        return entity;
    }

    public void updateFromDto(Movie entity, MovieDto dto) {
        entity.setTitle(dto.getTitle());
        entity.setGenres(dto.getGenres());
        entity.setYear(dto.getYear());
        entity.setRuntimeMinutes(dto.getRunningTime());
    }


}
