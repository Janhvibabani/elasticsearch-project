package com.elasticsearch.elasticsearch.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
@Data
@Entity
@Table(name = "elasticsearchdb")
public class Movie {
    @Id
    private Integer id;

    private String title;
    private String overview;
    private String tagline;
    private String genres;
    private String keywords;
    private Double popularity;

    private String releaseDate;
}
