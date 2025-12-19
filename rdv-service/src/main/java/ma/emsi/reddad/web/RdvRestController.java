package ma.emsi.reddad.web;

import ma.emsi.reddad.clients.DocteurServiceClient;
import ma.emsi.reddad.clients.NotificationServiceClient;
import ma.emsi.reddad.entities.RDV;
import ma.emsi.reddad.model.Docteur;
import ma.emsi.reddad.model.EmailRequest;
import ma.emsi.reddad.repositories.RDVRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class RdvRestController {

    private final RDVRepository rdvRepository;
    private final DocteurServiceClient docteurServiceClient;
    private final NotificationServiceClient notificationServiceClient;

    public RdvRestController(RDVRepository rdvRepository, DocteurServiceClient docteurServiceClient, NotificationServiceClient notificationServiceClient) {
        this.rdvRepository = rdvRepository;
        this.docteurServiceClient = docteurServiceClient;
        this.notificationServiceClient = notificationServiceClient;
    }

    @GetMapping("/rdvs/{id}")
    public RDV getRdv(@PathVariable Long id) {
        RDV rdv = rdvRepository.findById(id).orElseThrow(() -> new RuntimeException("RDV not found"));
        rdv.setDocteur(docteurServiceClient.findDocteurById(rdv.getDocteurID()));
        return rdv;
    }
    
    @GetMapping("/rdvs/docteur/{docteurId}")
    public List<RDV> getRdvsByDocteur(@PathVariable Long docteurId) {
        // Utilise la méthode optimisée du repository
        return rdvRepository.findByDocteurID(docteurId);
    }

    @PostMapping("/rdvs")
    public RDV createRdv(@RequestBody RDV rdv) {
        // 1. Vérifier la disponibilité du docteur
        Docteur docteur = docteurServiceClient.findDocteurById(rdv.getDocteurID());
        if (!docteur.isAvailable()) {
            throw new RuntimeException("Docteur n'est pas disponible.");
        }

        // 2. Sauvegarder le RDV
        RDV savedRdv = rdvRepository.save(rdv);
        
        // 3. Mettre à jour la disponibilité du docteur
        docteur.setAvailable(false);
        docteurServiceClient.updateDocteur(docteur.getId(), docteur);

        // 4. Envoyer une notification par email
        String patientEmail = "patient@example.com"; // À remplacer par le vrai email du patient
        EmailRequest emailRequest = EmailRequest.builder()
                .to(patientEmail)
                .subject("Confirmation de votre rendez-vous")
                .body("Votre rendez-vous avec le Dr. " + docteur.getNom() + " a été confirmé pour le " + savedRdv.getDate())
                .build();
        try {
            notificationServiceClient.sendEmail(emailRequest);
        } catch (Exception e) {
            // Log l'erreur mais ne bloque pas le processus même si la notification échoue
            System.err.println("Échec de l'envoi de l'email de confirmation : " + e.getMessage());
        }

        return savedRdv;
    }
}
