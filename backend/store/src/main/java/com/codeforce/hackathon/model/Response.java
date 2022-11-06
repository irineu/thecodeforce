package com.codeforce.hackathon.model;

import lombok.Data;

@Data
public class Response {
    private String message = "Criado com sucesso!";
    
    public Response(){}
    
    public Response(String message){
        this.message = message;
    }
}
