package ma.emsi.reddad.model;

import lombok.Data;

@Data
public class Docteur {
    private Long id;
    private String nom;
    private String specialite;
    private boolean isAvailable;
}
