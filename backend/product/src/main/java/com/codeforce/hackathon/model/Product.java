package com.codeforce.hackathon.model;

import java.math.BigDecimal;

import io.quarkus.mongodb.panache.PanacheMongoEntity;
import io.quarkus.mongodb.panache.common.MongoEntity;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@MongoEntity(collection="product")
@Getter
@Setter
@ToString
public class Product extends PanacheMongoEntity {
    public String name;
    public String brand;
    public String type;
    public Integer units;
    public Integer avgDuration;
    public BigDecimal price;
}
