package com.sideagroup.accademy.repository;

import com.sideagroup.accademy.model.Movie;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface MovieRepository extends JpaRepository<Movie, String> {
    @Query("SELECT m FROM Movie m WHERE UPPER(m.title) LIKE UPPER(:title)")
    Page<Movie> findByTitle(@Param("title") String title, Pageable pageable);
}


