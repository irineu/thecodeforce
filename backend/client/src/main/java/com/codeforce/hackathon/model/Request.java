package com.codeforce.hackathon.model;

import lombok.Data;
import lombok.ToString;

@Data
@ToString
public class Request {
    private String firstName;
    private String lastName;
    private String documentNumber;
    private String documentType;
    private String email;
    private String addressId;
    private String phone;
}
