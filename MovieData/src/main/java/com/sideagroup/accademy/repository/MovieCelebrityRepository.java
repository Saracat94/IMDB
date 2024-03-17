package com.sideagroup.accademy.repository;

import com.sideagroup.accademy.model.MovieCelebrity;
import com.sideagroup.accademy.model.MovieCelebrityKey;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MovieCelebrityRepository extends JpaRepository<MovieCelebrity, MovieCelebrityKey> {
}
