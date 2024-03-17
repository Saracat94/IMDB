package com.sideagroup.accademy.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;
@Getter
@Setter
public class CelebrityDto {
    @Schema(description = "Celebrity Id", example = "nm0000168", requiredMode = Schema.RequiredMode.REQUIRED)
    private String id;
    @Schema(description = "Celebrity name", requiredMode = Schema.RequiredMode.REQUIRED)
    private String name;
    @Schema(description = "Celebrity Birthday", requiredMode = Schema.RequiredMode.REQUIRED)
    private Integer birthYear;
    @Schema(description = "Celebrity death", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
    private Integer deathYear;
    @Schema(description = "Movie list", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
    private List<MovieCelebrityDto> movies;

    public CelebrityDto() { movies = new ArrayList<>(); }
}
