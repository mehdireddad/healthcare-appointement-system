package ma.emsi.reddad;

import ma.emsi.reddad.entities.Docteur;
import ma.emsi.reddad.repositories.DocteurRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
@EnableFeignClients
public class DocteurServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(DocteurServiceApplication.class, args);
    }

    @Bean
    CommandLineRunner start(DocteurRepository docteurRepository) {
        return args -> {
            // Liste de spécialités réelles
            String[] specialites = { "Cardiologue", "Dentiste", "Ophtalmologue", "Généraliste", "Pédiatre",
                    "Dermatologue", "Neurologue", "Psychiatre", "Gynécologue", "Orthopédiste" };
            String[] noms = { "Reddad", "Benani", "Chraibi", "El Idrissi", "Tazi", "Berrada", "Naciri", "Fassi",
                    "Slimani", "Tahiri",
                    "Mansouri", "Alami", "Bennani", "Kadiri", "Slaoui", "Hassani", "Cherkaoui", "Filali", "Amrani",
                    "Ziani" };
            String[] prenoms = { "Mehdi", "Ahmed", "Sara", "Fatima", "Karim", "Omar", "Yassine", "Hajar", "Salma",
                    "Rachid",
                    "Noura", "Khalid", "Amine", "Sofia", "Leila", "Youssef", "Anas", "Meryem", "Nabil", "Samia" };

            for (int i = 0; i < 20; i++) {
                String nomComplet = "Dr. " + noms[i] + " " + prenoms[i];
                String specialite = specialites[i % specialites.length];
                // 13 disponibles (indices 0 à 12), 7 indisponibles (indices 13 à 19)
                boolean dispo = i < 13;
                docteurRepository.save(new Docteur(null, nomComplet, specialite, dispo));
            }
        };
    }
}
