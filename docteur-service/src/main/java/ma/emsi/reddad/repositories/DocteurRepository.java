package ma.emsi.reddad.repositories;

import ma.emsi.reddad.entities.Docteur;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource
public interface DocteurRepository extends JpaRepository<Docteur, Long> {
}
