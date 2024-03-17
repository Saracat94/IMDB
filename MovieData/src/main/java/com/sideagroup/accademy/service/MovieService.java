package com.sideagroup.accademy.service;

import com.sideagroup.accademy.dto.GetAllMoviesResponseDto;
import com.sideagroup.accademy.dto.MovieCelebrityDto;
import com.sideagroup.accademy.dto.MovieDto;
import com.sideagroup.accademy.model.MovieCelebrity;

import java.util.Optional;

public interface MovieService {

    public GetAllMoviesResponseDto getAll(int page, int size, String orderBy, String title);

    public Optional<MovieDto> getById(String id);

    public MovieDto create(MovieDto movie);

    public Optional<MovieDto> update(String id, MovieDto movie);

    public MovieCelebrityDto associateCelebrity(String movieId, String celebrityId, MovieCelebrityDto body);

    public void deleteAssociationCelebrity(String movieId, String celebrityId);

    public boolean deleteById(String id);
}
