package com.codeforce.hackathon.model;

import com.mongodb.client.model.geojson.Point;

import io.quarkus.mongodb.panache.PanacheMongoEntity;
import io.quarkus.mongodb.panache.common.MongoEntity;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@MongoEntity(collection="address")
@Getter
@Setter
@ToString
public class Address extends PanacheMongoEntity {
    public String street;
    public Integer number;
    public String city;
    public String state;
    public String postalCode;
    public String country;
    public Point geoLocale;
}
