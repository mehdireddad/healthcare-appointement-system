package ma.emsi.reddad;

import ma.emsi.reddad.entities.RDV;
import ma.emsi.reddad.repositories.RDVRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.Bean;

import java.util.Date;

@SpringBootApplication
@EnableFeignClients
public class RdvServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(RdvServiceApplication.class, args);
    }

    @Bean
    CommandLineRunner start(RDVRepository rdvRepository) {
        return args -> {
            rdvRepository.save(new RDV(null, new Date(), null, 1L));
            rdvRepository.save(new RDV(null, new Date(), null, 2L));
            rdvRepository.save(new RDV(null, new Date(), null, 3L));
        };
    }
}
