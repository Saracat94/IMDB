package com.sideagroup.accademy.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "rating")
@Getter
@Setter
public class Rating {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(nullable = false)
    private Double averageRating;
    @Column(nullable = false)
    private Integer numVotes;

    @OneToOne
    @JoinColumn(name = "movie_id", referencedColumnName = "id", unique = true)
    private Movie movie;
}
