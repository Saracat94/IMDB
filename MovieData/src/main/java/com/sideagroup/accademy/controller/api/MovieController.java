package com.sideagroup.accademy.controller.api;

import com.sideagroup.accademy.dto.DefaultErrorDto;
import com.sideagroup.accademy.dto.GetAllMoviesResponseDto;
import com.sideagroup.accademy.dto.MovieCelebrityDto;
import com.sideagroup.accademy.dto.MovieDto;
import com.sideagroup.accademy.exception.GenericServiceException;
import com.sideagroup.accademy.service.MovieService;
//non servono più, il controller ora sa solo che esiste l'interfaccia ma non i services
//import com.sideagroup.accademy.service.impl.MovieDbService;
//import com.sideagroup.accademy.service.impl.MovieMemoryService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.springframework.data.jpa.domain.AbstractPersistable_.id;

@RestController
@RequestMapping("/api/v1/movies")
@Tag(name = "Movies", description = "Movies management APIs")
@CrossOrigin(origins = "*")
public class MovieController {

    // Per i più esperti, non badate a queste variabili
    // (quella commentata, in quanto il controller non deve avere i dati);
    // Il controller evolverà durante il corso.
//    private MovieMemoryService movieServices = new MovieMemoryService();
//    private MovieDbService movieServices = new MovieDbService();
//    private List<MovieDto> movies = new ArrayList<>();

    @Autowired
    private MovieService movieServices;

    @Operation(summary = "Retrieves all movies without cast",
            description = "Retrieves all movies without cast in paginated way")
    @ApiResponses(value = {@ApiResponse(responseCode = "200", description = "Successfully retrieved"),
            @ApiResponse(responseCode = "400", description = "One or more parameters are invalid",
                    content = @Content(schema = @Schema(implementation = DefaultErrorDto.class)))})
    @GetMapping
    public GetAllMoviesResponseDto getAll(
            @RequestParam(name = "page", required = false, defaultValue = "0")
            @Parameter(description = "Page number", example = "0") int page,
            @RequestParam(name = "size", required = false, defaultValue = "20")
            @Parameter(description = "Page size", example = "30") int size,
            @RequestParam(name = "order_by", required = false, defaultValue = "id")
            @Parameter(description = "Field used for sorting", example = "id") String orderBy,
            @RequestParam(name = "title", required = false)
            @Parameter(description = "Searches for movies with title like this string", example = "star") String title) {
        try {
            return movieServices.getAll(page, size, orderBy, title);
        } catch (GenericServiceException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }
    }
    @Operation(summary = "Gets a movie with cast by id",
            description = "Returns a movie with cast as per id")
    @ApiResponses(value = {@ApiResponse(responseCode = "200", description = "Successfully retrieved"),
            @ApiResponse(responseCode = "404", description = "Not found - The movie was not found",
                    content = @Content(schema = @Schema(implementation = DefaultErrorDto.class)))})
    @GetMapping("{id}")
    public MovieDto getById(@PathVariable("id")
                            @Parameter(description = "Movie id", example = "tt0120804") String id) {
        Optional<MovieDto> opt = movieServices.getById(id);

        if (opt.isEmpty())
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "item not found");

        return opt.get();
    }
    @Operation(summary = "Creates a new movie",
            description = "Creates a new novie")
    @ApiResponses(value = {@ApiResponse(responseCode = "201", description = "Successfully created"),
            @ApiResponse(responseCode = "400", description = "A movie with same id already exists",
                    content = @Content(schema = @Schema(implementation = DefaultErrorDto.class)))})
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public MovieDto create(@RequestBody MovieDto movie) {
        try {
            return movieServices.create(movie);
        } catch (GenericServiceException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }
    }
    @Operation(summary = "Updates a new movie",
            description = "Updates the movie with the given id")
    @ApiResponses(value = {@ApiResponse(responseCode = "200", description = "Successfully updated"),
            @ApiResponse(responseCode = "404", description = "Not found - the movie was not found",
                    content = @Content(schema = @Schema(implementation = DefaultErrorDto.class)))})
    @PutMapping("{id}")
    public MovieDto update(@PathVariable("id") String id, @RequestBody MovieDto movie) {
        Optional<MovieDto> opt = movieServices.update(id, movie);

        if (opt.isEmpty())
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "item not found");

        return opt.get();
    }
    @Operation(summary = "Associate a celebrity with a movie",
            description = "Associate the celebrity 'celebrityId' with the 'movieId'")
    @ApiResponses(value = {@ApiResponse(responseCode = "200", description = "Successfully updated"),
            @ApiResponse(responseCode = "400", description = "The movie or the celebrity does not exist.",
                    content = @Content(schema = @Schema(implementation = DefaultErrorDto.class)))})
    @PutMapping("{movieId}/celebrities/{celebrityId}")
    public MovieCelebrityDto associateCelebrity(
            @PathVariable String movieId,
            @PathVariable String celebrityId,
            @RequestBody MovieCelebrityDto body) {
        try {
            return movieServices.associateCelebrity(movieId, celebrityId, body);
        } catch (GenericServiceException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }
    }
    @Operation(summary = "Removes the association between the movie and the celebrity",
            description = "Removes the association between the movie and the celebrity")
    @ApiResponses(value = {@ApiResponse(responseCode = "204", description = "Successfully deleted")
    })
    @DeleteMapping("{movieId}/celebrities/{celebrityId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteAssociationCelebrity(@PathVariable String movieId, @PathVariable String celebrityId) {
        movieServices.deleteAssociationCelebrity(movieId, celebrityId);
    }
    @Operation(summary = "Deletes a movie",
            description = "Deletes the movie with the given id")
    @ApiResponses(value = {@ApiResponse(responseCode = "204", description = "Successfully deleted")
    })
    @DeleteMapping("{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteById(@PathVariable String id) {
        movieServices.deleteById(id);
    }
}
