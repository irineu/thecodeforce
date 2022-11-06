package com.codeforce.hackathon.model;

import java.math.BigDecimal;

import lombok.Data;

@Data
public class Product {
    private String id;
    private String nameProduct;
    private BigDecimal price;
    private String units;

    public Product(){}

    public Product(String id, String nameProduct, BigDecimal price, String units){
        this.id = id;
        this.nameProduct = nameProduct;
        this.price = price;
        this.units = units;
    }
}
