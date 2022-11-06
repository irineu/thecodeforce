package com.codeforce.hackathon.model;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

import lombok.Data;
import lombok.ToString;

@Data
@ToString
public class UpdateDTO {
    private String id;
    private BigDecimal amount;
    private String clientId;
    private String status;
    private LocalDate dateStart;
    private LocalDate dateEnd;
    private List<Products> products;
}
