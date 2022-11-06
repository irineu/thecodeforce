package com.codeforce.hackathon.model;

import lombok.Data;

@Data
public class ResponseDTO {
    private String message = "Criado com sucesso!";
    
    public ResponseDTO(){}
    
    public ResponseDTO(String message){
        this.message = message;
    }
}
