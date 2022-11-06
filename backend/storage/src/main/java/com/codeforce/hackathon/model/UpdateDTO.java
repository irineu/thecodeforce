package com.codeforce.hackathon.model;

import java.math.BigDecimal;

import lombok.Data;
import lombok.ToString;

@Data
@ToString
public class UpdateDTO {
    private String id;
    public String productId;
    public String storeId;
    public BigDecimal price;
    public Integer units;
}
