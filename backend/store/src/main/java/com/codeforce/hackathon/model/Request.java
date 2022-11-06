package com.codeforce.hackathon.model;

import lombok.Data;
import lombok.ToString;

@Data
@ToString
public class Request {
    private String nome;
    private String cnpj;
    private String contato;
    private String addressId;
}
