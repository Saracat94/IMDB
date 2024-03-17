package com.sideagroup.accademy.service.impl;

import com.sideagroup.accademy.dto.GetAllMoviesResponseDto;
import com.sideagroup.accademy.dto.MovieCelebrityDto;
import com.sideagroup.accademy.dto.MovieDto;
import com.sideagroup.accademy.exception.GenericServiceException;
import com.sideagroup.accademy.mapper.MovieCelebrityMapper;
import com.sideagroup.accademy.mapper.MovieMapper;
import com.sideagroup.accademy.mapper.RatingMapper;
import com.sideagroup.accademy.model.*;
import com.sideagroup.accademy.repository.CelebrityRepository;
import com.sideagroup.accademy.repository.MovieCelebrityRepository;
import com.sideagroup.accademy.repository.MovieRepository;
import com.sideagroup.accademy.repository.RatingRepository;
import com.sideagroup.accademy.service.MovieService;
import com.sideagroup.accademy.service.validator.MovieValidator;
import jakarta.transaction.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import java.util.ArrayList;
import java.util.Optional;

@Service
//@Service("mainMovieService")
public class MovieDbService implements MovieService {

    private static final Logger logger = LoggerFactory.getLogger(MovieDbService.class);

    @Autowired
    private MovieRepository repo;

    @Autowired
    private CelebrityRepository celebrityRepo;

    @Autowired
    private MovieMapper mapper;

    @Autowired
    private MovieCelebrityMapper movieCelebrityMapper;

    @Autowired
    private MovieCelebrityRepository movieCelebrityRepository;

    @Autowired
    private RatingMapper ratingMapper;

    @Autowired
    private RatingRepository ratingRepository;
    @Autowired
    private MovieValidator movieValidator;

    @Override
    public GetAllMoviesResponseDto getAll(int page, int size, String orderBy, String title) {
        logger.info("getAll called");
        movieValidator.validateQueryParams(orderBy);

        Pageable pageable = PageRequest.of(page, size, Sort.by(orderBy));
        Page<Movie> movies = title == null ? repo.findAll(pageable) : repo.findByTitle("%" + title + "%", pageable);
        return mapper.toDto(movies, size);
    }

    @Override
    public Optional<MovieDto> getById(String id) {
        logger.info("getById called");
        Optional<Movie> result = repo.findById(id);
        if (!result.isEmpty()) {
            MovieDto dto = mapper.toDto(result.get(), true, true);
            return Optional.of(dto);
        }

        return Optional.empty();
    }

    @Override
    @Transactional
    public MovieDto create(MovieDto movie) {
        logger.info("create called");
        movieValidator.validateCreateMovieRequest(movie);
        Optional<Movie> opt = repo.findById(movie.getId());
        if (!opt.isEmpty())
            throw new GenericServiceException("Movie with id " + movie.getId() + " already exists");

        Movie movieEntity = mapper.toEntity(movie);
        movieEntity = repo.save(movieEntity);

        Rating ratingEntity = ratingMapper.toEntity(movie.getRating());
        ratingEntity.setMovie(movieEntity);
        ratingEntity = ratingRepository.save(ratingEntity);
        movieEntity.setRating(ratingEntity);

        return mapper.toDto(movieEntity, false, false);
    }

    @Override
    public Optional<MovieDto> update(String id, MovieDto movie) {
        logger.info("update called");
        Optional<Movie> opt = repo.findById(id);
        if (opt.isEmpty())
            return Optional.empty();

        Movie entity = opt.get();
        mapper.updateFromDto(entity, movie);
        entity = repo.save(entity);

        return Optional.of(mapper.toDto(entity, false, false));
    }

    @Override
    @Transactional
    public boolean deleteById(String id) {
        logger.info("deleteById called");
        Optional<Movie> movie = repo.findById(id);
        if (movie.isEmpty())
            return false;
        ratingRepository.deleteById(movie.get().getRating().getId());
        repo.deleteById(id);
        return true;
    }
        @Override
    public MovieCelebrityDto associateCelebrity(String movieId, String celebrityId, MovieCelebrityDto body) {
        Optional<Movie> movie = repo.findById(movieId);
        if (movie.isEmpty())
            throw new GenericServiceException("Movie with id " + movieId + " does not exist");
        Optional<Celebrity> celebrity = celebrityRepo.findById(celebrityId);
        if (celebrity.isEmpty())
            throw new GenericServiceException("Celebrity with id " + " does not exist");

        MovieCelebrityKey key = new MovieCelebrityKey(celebrityId, movieId);
        Optional<MovieCelebrity> rel = movieCelebrityRepository.findById(key);
        if (!rel.isEmpty()) {
            return movieCelebrityMapper.toDto(rel.get());
        }

        MovieCelebrity entity = new MovieCelebrity(key);
        entity.setCelebrity(celebrity.get());
        entity.setMovie(movie.get());
        entity.setCategory(body.getCategory());
        entity.setCharacters(body.getCharacters());
        entity = movieCelebrityRepository.save(entity);
        return movieCelebrityMapper.toDto(entity);
    }

    @Override
    public void deleteAssociationCelebrity(String movieId, String celebrityId) {
        logger.info("deleteAssociationCelebrity called");
        MovieCelebrityKey key = new MovieCelebrityKey(celebrityId, movieId);
        movieCelebrityRepository.deleteById(key);
    }


}
