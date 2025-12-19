package ma.emsi.reddad.model;

import lombok.Data;
import java.util.Date;

@Data
public class RDV {
    private Long id;
    private Date date;
    private Long docteurID;
}
