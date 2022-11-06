package com.codeforce.hackathon.model;

import java.time.LocalDate;

import io.quarkus.mongodb.panache.PanacheMongoEntity;
import io.quarkus.mongodb.panache.common.MongoEntity;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@MongoEntity(collection="clients")
@Getter
@Setter
@ToString
public class Client extends PanacheMongoEntity {
    public String firstName;
    public String lastName;
    public String documentNumber;
    public String documentType;
    public String email;
    public String addressId;
    public String phone;
    
    public static Client findByDocumentNumber(String documentNumber){
        return find("documentNumber", documentNumber).firstResult();
    }
}
