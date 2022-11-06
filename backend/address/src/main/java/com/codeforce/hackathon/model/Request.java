package com.codeforce.hackathon.model;

import java.math.BigDecimal;

import lombok.Data;
import lombok.ToString;

@Data
@ToString
public class Request {
    private String street;
    private Integer number;
    private String city;
    private String state;
    private String postalCode;
    private String country;
    private Double x;
    private Double y;
}
