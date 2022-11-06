package com.codeforce.hackathon.model;

import java.math.BigDecimal;

import lombok.Data;
import lombok.ToString;

@Data
@ToString
public class Request {
    private String productId;
    private String storeId;
    private BigDecimal price;
    private Integer units;
}
