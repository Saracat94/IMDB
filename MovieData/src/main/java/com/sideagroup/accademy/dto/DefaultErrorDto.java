package com.sideagroup.accademy.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class DefaultErrorDto {
    private Date timestamp;
    @Schema(description = "HTTP Status code", example = "404")
    private int status;
    @Schema(description = "HTTP Status message", example = "Not Found")
    private String error;
    @Schema(description = "error detail", example = "item not found")
    private String message;
    @Schema(description = "Requested Path", example = "/api/v1/movies/tt01207370")
    private String path;
}
