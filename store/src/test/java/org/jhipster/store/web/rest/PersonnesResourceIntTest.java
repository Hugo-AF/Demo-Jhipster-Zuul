package org.jhipster.store.web.rest;

import org.jhipster.store.StoreApp;

import org.jhipster.store.domain.Personnes;
import org.jhipster.store.repository.PersonnesRepository;
import org.jhipster.store.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the PersonnesResource REST controller.
 *
 * @see PersonnesResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = StoreApp.class)
public class PersonnesResourceIntTest {

    private static final String DEFAULT_NOM = "AAAAAAAAAA";
    private static final String UPDATED_NOM = "BBBBBBBBBB";

    private static final Integer DEFAULT_AGE = 1;
    private static final Integer UPDATED_AGE = 2;

    @Autowired
    private PersonnesRepository personnesRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    private MockMvc restPersonnesMockMvc;

    private Personnes personnes;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final PersonnesResource personnesResource = new PersonnesResource(personnesRepository);
        this.restPersonnesMockMvc = MockMvcBuilders.standaloneSetup(personnesResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Personnes createEntity() {
        Personnes personnes = new Personnes()
            .nom(DEFAULT_NOM)
            .age(DEFAULT_AGE);
        return personnes;
    }

    @Before
    public void initTest() {
        personnesRepository.deleteAll();
        personnes = createEntity();
    }

    @Test
    public void createPersonnes() throws Exception {
        int databaseSizeBeforeCreate = personnesRepository.findAll().size();

        // Create the Personnes
        restPersonnesMockMvc.perform(post("/api/personnes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(personnes)))
            .andExpect(status().isCreated());

        // Validate the Personnes in the database
        List<Personnes> personnesList = personnesRepository.findAll();
        assertThat(personnesList).hasSize(databaseSizeBeforeCreate + 1);
        Personnes testPersonnes = personnesList.get(personnesList.size() - 1);
        assertThat(testPersonnes.getNom()).isEqualTo(DEFAULT_NOM);
        assertThat(testPersonnes.getAge()).isEqualTo(DEFAULT_AGE);
    }

    @Test
    public void createPersonnesWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = personnesRepository.findAll().size();

        // Create the Personnes with an existing ID
        personnes.setId("existing_id");

        // An entity with an existing ID cannot be created, so this API call must fail
        restPersonnesMockMvc.perform(post("/api/personnes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(personnes)))
            .andExpect(status().isBadRequest());

        // Validate the Personnes in the database
        List<Personnes> personnesList = personnesRepository.findAll();
        assertThat(personnesList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    public void checkNomIsRequired() throws Exception {
        int databaseSizeBeforeTest = personnesRepository.findAll().size();
        // set the field null
        personnes.setNom(null);

        // Create the Personnes, which fails.

        restPersonnesMockMvc.perform(post("/api/personnes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(personnes)))
            .andExpect(status().isBadRequest());

        List<Personnes> personnesList = personnesRepository.findAll();
        assertThat(personnesList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void checkAgeIsRequired() throws Exception {
        int databaseSizeBeforeTest = personnesRepository.findAll().size();
        // set the field null
        personnes.setAge(null);

        // Create the Personnes, which fails.

        restPersonnesMockMvc.perform(post("/api/personnes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(personnes)))
            .andExpect(status().isBadRequest());

        List<Personnes> personnesList = personnesRepository.findAll();
        assertThat(personnesList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void getAllPersonnes() throws Exception {
        // Initialize the database
        personnesRepository.save(personnes);

        // Get all the personnesList
        restPersonnesMockMvc.perform(get("/api/personnes?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(personnes.getId())))
            .andExpect(jsonPath("$.[*].nom").value(hasItem(DEFAULT_NOM.toString())))
            .andExpect(jsonPath("$.[*].age").value(hasItem(DEFAULT_AGE)));
    }

    @Test
    public void getPersonnes() throws Exception {
        // Initialize the database
        personnesRepository.save(personnes);

        // Get the personnes
        restPersonnesMockMvc.perform(get("/api/personnes/{id}", personnes.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(personnes.getId()))
            .andExpect(jsonPath("$.nom").value(DEFAULT_NOM.toString()))
            .andExpect(jsonPath("$.age").value(DEFAULT_AGE));
    }

    @Test
    public void getNonExistingPersonnes() throws Exception {
        // Get the personnes
        restPersonnesMockMvc.perform(get("/api/personnes/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updatePersonnes() throws Exception {
        // Initialize the database
        personnesRepository.save(personnes);
        int databaseSizeBeforeUpdate = personnesRepository.findAll().size();

        // Update the personnes
        Personnes updatedPersonnes = personnesRepository.findOne(personnes.getId());
        updatedPersonnes
            .nom(UPDATED_NOM)
            .age(UPDATED_AGE);

        restPersonnesMockMvc.perform(put("/api/personnes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedPersonnes)))
            .andExpect(status().isOk());

        // Validate the Personnes in the database
        List<Personnes> personnesList = personnesRepository.findAll();
        assertThat(personnesList).hasSize(databaseSizeBeforeUpdate);
        Personnes testPersonnes = personnesList.get(personnesList.size() - 1);
        assertThat(testPersonnes.getNom()).isEqualTo(UPDATED_NOM);
        assertThat(testPersonnes.getAge()).isEqualTo(UPDATED_AGE);
    }

    @Test
    public void updateNonExistingPersonnes() throws Exception {
        int databaseSizeBeforeUpdate = personnesRepository.findAll().size();

        // Create the Personnes

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restPersonnesMockMvc.perform(put("/api/personnes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(personnes)))
            .andExpect(status().isCreated());

        // Validate the Personnes in the database
        List<Personnes> personnesList = personnesRepository.findAll();
        assertThat(personnesList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    public void deletePersonnes() throws Exception {
        // Initialize the database
        personnesRepository.save(personnes);
        int databaseSizeBeforeDelete = personnesRepository.findAll().size();

        // Get the personnes
        restPersonnesMockMvc.perform(delete("/api/personnes/{id}", personnes.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Personnes> personnesList = personnesRepository.findAll();
        assertThat(personnesList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Personnes.class);
        Personnes personnes1 = new Personnes();
        personnes1.setId("id1");
        Personnes personnes2 = new Personnes();
        personnes2.setId(personnes1.getId());
        assertThat(personnes1).isEqualTo(personnes2);
        personnes2.setId("id2");
        assertThat(personnes1).isNotEqualTo(personnes2);
        personnes1.setId(null);
        assertThat(personnes1).isNotEqualTo(personnes2);
    }
}
