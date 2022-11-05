package com.codeforce.hackathon.model;

import lombok.Data;
import lombok.ToString;

@Data
@ToString
public class UpdateDTO {
    private String id;
    private String name;
    private String cnpj;
    private String contato;
    private String addressId;
}
