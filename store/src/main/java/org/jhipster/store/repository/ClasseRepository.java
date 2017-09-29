package org.jhipster.store.repository;

import org.jhipster.store.domain.Classe;
import org.springframework.stereotype.Repository;

import org.springframework.data.mongodb.repository.MongoRepository;

/**
 * Spring Data MongoDB repository for the Classe entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ClasseRepository extends MongoRepository<Classe, String> {

}
