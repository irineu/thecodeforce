package com.codeforce.hackathon.model;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

import io.quarkus.mongodb.panache.PanacheMongoEntity;
import io.quarkus.mongodb.panache.common.MongoEntity;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@MongoEntity(collection="order")
@Getter                            
@Setter
@ToString
public class Order extends PanacheMongoEntity {
    public BigDecimal amount;
    public String idClient;
    public String status;
    public LocalDate dateStart;
    public LocalDate dateEnd;
    public List<Product> listProducts;
}
