package ma.emsi.reddad.clients;

import ma.emsi.reddad.model.Docteur;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "docteur-service")
public interface DocteurServiceClient {

    @GetMapping("/docteurs/{id}")
    Docteur findDocteurById(@PathVariable("id") Long id);

    @PutMapping("/docteurs/{id}")
    Docteur updateDocteur(@PathVariable("id") Long id, @RequestBody Docteur docteur);
}
