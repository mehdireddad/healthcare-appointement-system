package ma.emsi.reddad;

import ma.emsi.reddad.entities.Docteur;
import ma.emsi.reddad.repositories.DocteurRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class DocteurServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(DocteurServiceApplication.class, args);
    }

    @Bean
    CommandLineRunner start(DocteurRepository docteurRepository) {
        return args -> {
            docteurRepository.save(new Docteur(null, "Reddad", "Cardiologue", true));
            docteurRepository.save(new Docteur(null, "Mehdi", "Dentiste", false));
            docteurRepository.save(new Docteur(null, "Ahmed", "Ophtalmologue", true));
        };
    }
}
