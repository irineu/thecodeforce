package com.codeforce.hackathon.model;

import lombok.Data;
import lombok.ToString;

@Data
@ToString
public class UpdateDTO {
    private String id;
    private String street;
    private String number;
    private String city;
    private String state;
    private String postalCode;
    private String country;
    private Double x;
    private Double y;
}
