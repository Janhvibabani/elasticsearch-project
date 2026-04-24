package com.elasticsearch.elasticsearch.Service;

import co.elastic.clients.elasticsearch.ElasticsearchClient;
import co.elastic.clients.elasticsearch.core.SearchResponse;
import com.elasticsearch.elasticsearch.Entity.Movie;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;

@Service
public class ElasticsearchService {

    @Autowired
    private ElasticsearchClient client;

    public List<Movie> search(String query) throws IOException {

        SearchResponse<Movie> response = client.search(s -> s
                        .index("movies")
                        .query(q -> q
                                .multiMatch(m -> m
                                        .query(query)
                                        .fields("title", "overview", "tagline")
                                )
                        ),
                Movie.class
        );

        return response.hits().hits().stream()
                .map(hit -> hit.source())
                .toList();
    }
}
