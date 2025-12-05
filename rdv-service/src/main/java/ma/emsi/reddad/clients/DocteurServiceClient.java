package ma.emsi.reddad.clients;

import ma.emsi.reddad.model.Docteur;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "docteur-service", url = "http://localhost:8081")
public interface DocteurServiceClient {
    @GetMapping("/docteurs/{id}")
    Docteur findDocteurById(@PathVariable("id") Long id);
}
