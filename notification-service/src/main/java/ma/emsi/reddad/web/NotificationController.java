package ma.emsi.reddad.web;

import ma.emsi.reddad.services.NotificationService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

@RestController
public class NotificationController {

    private final NotificationService notificationService;

    public NotificationController(NotificationService notificationService) {
        this.notificationService = notificationService;
    }

    @PostMapping("/sms")
    public Mono<String> sendSms(@RequestBody SmsRequest smsRequest) {
        return notificationService.sendSms(smsRequest.getTo(), smsRequest.getMessage());
    }

    @PostMapping("/email")
    public Mono<String> sendEmail(@RequestBody EmailRequest emailRequest) {
        return notificationService.sendEmail(emailRequest.getTo(), emailRequest.getSubject(), emailRequest.getBody());
    }

    // Classes internes pour représenter les requêtes
    static class SmsRequest {
        private String to;
        private String message;

        // getters and setters
        public String getTo() {
            return to;
        }

        public void setTo(String to) {
            this.to = to;
        }

        public String getMessage() {
            return message;
        }

        public void setMessage(String message) {
            this.message = message;
        }
    }

    static class EmailRequest {
        private String to;
        private String subject;
        private String body;

        // getters and setters
        public String getTo() {
            return to;
        }

        public void setTo(String to) {
            this.to = to;
        }

        public String getSubject() {
            return subject;
        }

        public void setSubject(String subject) {
            this.subject = subject;
        }

        public String getBody() {
            return body;
        }

        public void setBody(String body) {
            this.body = body;
        }
    }
}
