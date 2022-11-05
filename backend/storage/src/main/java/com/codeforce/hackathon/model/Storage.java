package com.codeforce.hackathon.model;

import java.math.BigDecimal;

import io.quarkus.mongodb.panache.PanacheMongoEntity;
import io.quarkus.mongodb.panache.common.MongoEntity;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@MongoEntity(collection="storage")
@Getter
@Setter
@ToString
public class Storage extends PanacheMongoEntity {
    public String productId;
    public String storeId;
    public BigDecimal price;
    public Integer units;
    
}
