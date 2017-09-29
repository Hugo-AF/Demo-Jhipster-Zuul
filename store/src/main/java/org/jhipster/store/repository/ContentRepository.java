package org.jhipster.store.repository;

import org.jhipster.store.domain.Content;
import org.springframework.stereotype.Repository;

import org.springframework.data.mongodb.repository.MongoRepository;

/**
 * Spring Data MongoDB repository for the Content entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ContentRepository extends MongoRepository<Content, String> {

}
