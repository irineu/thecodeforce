package com.codeforce.hackathon.model;

import java.time.LocalDate;
import java.util.List;

import lombok.Data;
import lombok.ToString;

@Data
@ToString
public class UpdateDTO {

    private String clientId;
    private LocalDate dateNext;
    private List<Products> products;
}
