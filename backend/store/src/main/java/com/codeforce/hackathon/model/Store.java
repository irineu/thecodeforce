package com.codeforce.hackathon.model;

import java.time.LocalDate;

import io.quarkus.mongodb.panache.PanacheMongoEntity;
import io.quarkus.mongodb.panache.common.MongoEntity;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@MongoEntity(collection="store")
@Getter
@Setter
@ToString
public class Store extends PanacheMongoEntity {
    public String name;
    public String cnpj;
    public String contato;
    public String addressId;
    
}
