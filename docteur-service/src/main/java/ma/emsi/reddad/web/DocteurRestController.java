package ma.emsi.reddad.web;

import ma.emsi.reddad.clients.RdvServiceClient;
import ma.emsi.reddad.model.RDV;
import org.springframework.data.rest.webmvc.RepositoryRestController;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@RepositoryRestController
public class DocteurRestController {

    private final RdvServiceClient rdvServiceClient;

    public DocteurRestController(RdvServiceClient rdvServiceClient) {
        this.rdvServiceClient = rdvServiceClient;
    }

    @GetMapping("/docteurs/{id}/agenda")
    public @ResponseBody ResponseEntity<List<RDV>> getAgenda(@PathVariable Long id) {
        List<RDV> agenda = rdvServiceClient.getRdvsByDocteur(id);
        return ResponseEntity.ok(agenda);
    }
}
