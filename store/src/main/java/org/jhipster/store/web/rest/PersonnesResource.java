package org.jhipster.store.web.rest;

import com.codahale.metrics.annotation.Timed;
import org.jhipster.store.domain.Personnes;

import org.jhipster.store.repository.PersonnesRepository;
import org.jhipster.store.web.rest.util.HeaderUtil;
import org.jhipster.store.web.rest.util.PaginationUtil;
import io.swagger.annotations.ApiParam;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Personnes.
 */
@RestController
@RequestMapping("/api")
public class PersonnesResource {

    private final Logger log = LoggerFactory.getLogger(PersonnesResource.class);

    private static final String ENTITY_NAME = "personnes";

    private final PersonnesRepository personnesRepository;

    public PersonnesResource(PersonnesRepository personnesRepository) {
        this.personnesRepository = personnesRepository;
    }

    /**
     * POST  /personnes : Create a new personnes.
     *
     * @param personnes the personnes to create
     * @return the ResponseEntity with status 201 (Created) and with body the new personnes, or with status 400 (Bad Request) if the personnes has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/personnes")
    @Timed
    public ResponseEntity<Personnes> createPersonnes(@Valid @RequestBody Personnes personnes) throws URISyntaxException {
        log.debug("REST request to save Personnes : {}", personnes);
        if (personnes.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new personnes cannot already have an ID")).body(null);
        }
        Personnes result = personnesRepository.save(personnes);
        return ResponseEntity.created(new URI("/api/personnes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /personnes : Updates an existing personnes.
     *
     * @param personnes the personnes to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated personnes,
     * or with status 400 (Bad Request) if the personnes is not valid,
     * or with status 500 (Internal Server Error) if the personnes couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/personnes")
    @Timed
    public ResponseEntity<Personnes> updatePersonnes(@Valid @RequestBody Personnes personnes) throws URISyntaxException {
        log.debug("REST request to update Personnes : {}", personnes);
        if (personnes.getId() == null) {
            return createPersonnes(personnes);
        }
        Personnes result = personnesRepository.save(personnes);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, personnes.getId().toString()))
            .body(result);
    }

    /**
     * GET  /personnes : get all the personnes.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of personnes in body
     */
    @GetMapping("/personnes")
    @Timed
    public ResponseEntity<List<Personnes>> getAllPersonnes(@ApiParam Pageable pageable) {
        log.debug("REST request to get a page of Personnes");
        Page<Personnes> page = personnesRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/personnes");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /personnes/:id : get the "id" personnes.
     *
     * @param id the id of the personnes to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the personnes, or with status 404 (Not Found)
     */
    @GetMapping("/personnes/{id}")
    @Timed
    public ResponseEntity<Personnes> getPersonnes(@PathVariable String id) {
        log.debug("REST request to get Personnes : {}", id);
        Personnes personnes = personnesRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(personnes));
    }

    /**
     * DELETE  /personnes/:id : delete the "id" personnes.
     *
     * @param id the id of the personnes to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/personnes/{id}")
    @Timed
    public ResponseEntity<Void> deletePersonnes(@PathVariable String id) {
        log.debug("REST request to delete Personnes : {}", id);
        personnesRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id)).build();
    }
}
