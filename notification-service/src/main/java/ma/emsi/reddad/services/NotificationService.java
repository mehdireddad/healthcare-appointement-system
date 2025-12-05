package ma.emsi.reddad.services;

import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@Service
public class NotificationService {

    private final WebClient webClient;

    public NotificationService(WebClient.Builder webClientBuilder) {
        this.webClient = webClientBuilder.baseUrl("http://localhost:8083").build(); // Remplacez par l'URL de votre API SMS/EMAIL
    }

    public Mono<String> sendSms(String to, String message) {
        // Simule l'envoi d'un SMS via une API externe
        return webClient.post()
                .uri("/sms")
                .bodyValue("Sending SMS to " + to + ": " + message)
                .retrieve()
                .bodyToMono(String.class);
    }

    public Mono<String> sendEmail(String to, String subject, String body) {
        // Simule l'envoi d'un email via une API externe
        return webClient.post()
                .uri("/email")
                .bodyValue("Sending email to " + to + " with subject '" + subject + "': " + body)
                .retrieve()
                .bodyToMono(String.class);
    }
}
