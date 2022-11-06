package com.codeforce.hackathon.model;

import java.math.BigDecimal;

import lombok.Data;

@Data
public class Product {
    private String id;
    private BigDecimal price;
    private String units;

    public Product(){}

    public Product(String id, BigDecimal price, String units){
        this.id = id;
        this.price = price;
        this.units = units;
    }
}
