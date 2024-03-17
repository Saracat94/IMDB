package com.sideagroup.accademy.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;
@Getter
@Setter
public class MovieDto {
    @Schema(description = "Movie Id", example = "tt0120804", requiredMode = Schema.RequiredMode.REQUIRED)
    private String id;
    @Schema(description = "Movie title", requiredMode = Schema.RequiredMode.REQUIRED)
    private String title;
    @Schema(description = "HTTP year", requiredMode = Schema.RequiredMode.REQUIRED)
    private Integer year;
    @Schema(description = "Running time in minutes", example = "178", requiredMode = Schema.RequiredMode.REQUIRED)
    private Integer runningTime;
    @Schema(description = "Comma separated genres of a movie", example = "Action, Adventure", requiredMode = Schema.RequiredMode.REQUIRED)
    private String genres;
    @Schema(description = "Movie cast", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
    private List<MovieCelebrityDto> cast;
    @Schema(description = "Movie rating", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
    private RatingDto rating;
    @Schema(description = "Movie countries", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
    private List<CountryDto> country;

    public MovieDto () {
        cast = new ArrayList<>();
        country = new ArrayList<>();
    }
}
