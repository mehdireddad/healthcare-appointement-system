package ma.emsi.reddad.web;

import ma.emsi.reddad.clients.DocteurServiceClient;
import ma.emsi.reddad.entities.RDV;
import ma.emsi.reddad.repositories.RDVRepository;
import org.springframework.web.bind.annotation.*;

@RestController
public class RdvRestController {

    private final RDVRepository rdvRepository;
    private final DocteurServiceClient docteurServiceClient;

    public RdvRestController(RDVRepository rdvRepository, DocteurServiceClient docteurServiceClient) {
        this.rdvRepository = rdvRepository;
        this.docteurServiceClient = docteurServiceClient;
    }

    @GetMapping("/rdvs/{id}")
    public RDV getRdv(@PathVariable Long id) {
        RDV rdv = rdvRepository.findById(id).get();
        rdv.setDocteur(docteurServiceClient.findDocteurById(rdv.getDocteurID()));
        return rdv;
    }

    @PostMapping("/rdvs")
    public RDV createRdv(@RequestBody RDV rdv) {
        return rdvRepository.save(rdv);
    }
}
