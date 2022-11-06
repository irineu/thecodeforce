package com.codeforce.hackathon.model;

import java.time.LocalDate;
import java.util.List;

import io.quarkus.mongodb.panache.PanacheMongoEntity;
import io.quarkus.mongodb.panache.common.MongoEntity;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@MongoEntity(collection="shoppinglist")
@Getter                            
@Setter
@ToString
public class ShoppingList extends PanacheMongoEntity {
    public String clientId;
    public LocalDate dateNext;
    public List<Product> listProducts;

    public static ShoppingList findByClientId(String clientId){
        return find("clientId", clientId).firstResult();
    }
}

