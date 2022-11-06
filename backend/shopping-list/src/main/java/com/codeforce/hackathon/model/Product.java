package com.codeforce.hackathon.model;

import java.math.BigDecimal;

import lombok.Data;

@Data
public class Product {
    private String id;
    private String name;
    private BigDecimal price;

    public Product(){}

    public Product(String id, String name, BigDecimal price){
        this.id = id;
        this.name = name;
        this.price = price;
    }
}
