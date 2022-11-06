package com.codeforce.hackathon.model;

import lombok.Data;

@Data
public class CreateResponseDTO {
    private String message = "Criado com sucesso!";
    
    public CreateResponseDTO(){}
    
    public CreateResponseDTO(String message){
        this.message = message;
    }
}
