package ma.emsi.reddad.repositories;

import ma.emsi.reddad.entities.RDV;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface RDVRepository extends JpaRepository<RDV, Long> {
    List<RDV> findByDocteurID(Long docteurID);
}
