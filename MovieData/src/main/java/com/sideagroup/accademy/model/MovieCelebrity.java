package com.sideagroup.accademy.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "movie_celebrity")
@Getter
@Setter
public class MovieCelebrity {
    @EmbeddedId
    private MovieCelebrityKey id;

    @ManyToOne
    @MapsId("celebrityId")
    private Celebrity celebrity;

    @ManyToOne
    @MapsId("movieId")
    private Movie movie;

    @Column(length = 1000)
    private String category;

    @Column(length = 1000)
    private String characters;

    public MovieCelebrity(){this(null);}
    public MovieCelebrity(MovieCelebrityKey id) {this.id = id;}
}
