package com.codeforce.hackathon.model;

import lombok.Data;
import lombok.ToString;

@Data
@ToString
public class Products {
    private Product product;
    private Integer amount;
    
    public Products( ){
        
    }
    
    public Products( Product product, Integer amount ){
        this.product = product;
        this.amount = amount;
    }
}