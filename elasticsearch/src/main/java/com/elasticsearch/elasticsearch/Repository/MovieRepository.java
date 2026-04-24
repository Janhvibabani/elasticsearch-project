package com.elasticsearch.elasticsearch.Repository;

import com.elasticsearch.elasticsearch.Entity.Movie;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MovieRepository extends JpaRepository<Movie, Integer> {

    @Query("SELECT m FROM Movie m WHERE LOWER(m.title) LIKE LOWER(CONCAT('%', :q, '%')) " +
            "OR LOWER(m.overview) LIKE LOWER(CONCAT('%', :q, '%'))")
    List<Movie> searchPostgres(@Param("q") String q);
}