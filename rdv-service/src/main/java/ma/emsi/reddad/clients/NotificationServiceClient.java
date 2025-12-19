package ma.emsi.reddad.clients;

import ma.emsi.reddad.model.EmailRequest;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "notification-service")
public interface NotificationServiceClient {

    @PostMapping("/email")
    String sendEmail(@RequestBody EmailRequest emailRequest);
}
