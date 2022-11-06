package com.codeforce.hackathon.model;

import java.math.BigDecimal;

import lombok.Data;
import lombok.ToString;

@Data
@ToString
public class UpdateDTO {
    private String id;
    private String name;
    private String brand;
    private String type;
    private Integer units;
    private String durationUnits;
}
