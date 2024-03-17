package com.sideagroup.accademy.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.util.Set;

@Entity
@Table(name = "movie")
@Getter
@Setter
public class Movie {
    @Id
    @Column(length = 200)
    private String id;
    @Column(length = 1000, nullable = false)
    private String title;
    @Column(name = "startYear")
    private Integer year;
    private Integer runtimeMinutes;
    @Column(length = 1000)
    private String genres;

    @OneToMany(mappedBy = "movie")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Set<MovieCelebrity> names;

    @OneToMany(mappedBy = "movie")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Set<Country> countries;

    @OneToOne(mappedBy = "movie")
    private Rating rating;

}
