package org.jhipster.store.repository;

import org.jhipster.store.domain.Personnes;
import org.springframework.stereotype.Repository;

import org.springframework.data.mongodb.repository.MongoRepository;

/**
 * Spring Data MongoDB repository for the Personnes entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PersonnesRepository extends MongoRepository<Personnes, String> {

}
