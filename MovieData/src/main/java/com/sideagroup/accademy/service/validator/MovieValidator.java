package com.sideagroup.accademy.service.validator;

import com.sideagroup.accademy.dto.MovieDto;
import com.sideagroup.accademy.exception.GenericServiceException;
import jakarta.persistence.Column;
import org.springframework.stereotype.Component;

@Component
public class MovieValidator {
    public void validateQueryParams(String orderBy) {
        if (!"id".equals(orderBy) &&
                !"title".equals(orderBy) &&
                !"year".equals(orderBy)) {
            throw new GenericServiceException("Invalid Sort field '" + orderBy + "'. Valid values are: [id, title, year]");
        }
    }
    public void validateCreateMovieRequest(MovieDto movie){
        if (movie.getRating() == null)
            throw new GenericServiceException("Missing field 'rating'");
    }
}
