package ma.emsi.reddad.clients;

import ma.emsi.reddad.model.RDV;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@FeignClient(name = "rdv-service")
public interface RdvServiceClient {

    @GetMapping("/rdvs/docteur/{docteurId}")
    List<RDV> getRdvsByDocteur(@PathVariable("docteurId") Long docteurId);
}
