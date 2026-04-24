package com.elasticsearch.elasticsearch.Controller;

import com.elasticsearch.elasticsearch.Entity.Movie;
import com.elasticsearch.elasticsearch.Repository.MovieRepository;
import com.elasticsearch.elasticsearch.Service.ElasticsearchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/search")
public class SearchController {

    @Autowired
    private MovieRepository repo;

    @Autowired
    private ElasticsearchService esService;

    // PostgreSQL search
    @GetMapping("/postgres")
    public List<Movie> searchPostgres(@RequestParam String q) {
        return repo.searchPostgres(q);
    }

    // Elasticsearch search
    @GetMapping("/es")
    public List<Movie> searchES(@RequestParam String q) throws IOException {
        return esService.search(q);
    }

    @GetMapping("/test")
    public List<Movie> test() {
        return repo.findAll().stream().limit(5).toList();
    }

    @GetMapping("/test-es")
    public Object testES() throws Exception {
        return esService.search("avatar");
    }

}
