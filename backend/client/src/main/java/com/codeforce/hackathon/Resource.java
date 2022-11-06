package com.codeforce.hackathon;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;

import javax.ws.rs.BadRequestException;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.NotFoundException;
import javax.ws.rs.PATCH;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.bson.types.ObjectId;
import org.jboss.logging.Logger;

import com.codeforce.hackathon.model.Client;
import com.codeforce.hackathon.model.CreateResponseDTO;
import com.codeforce.hackathon.model.UpdateDTO;

import io.quarkus.security.ForbiddenException;

import com.codeforce.hackathon.model.Request;

@Path("/client")
public class Resource {
    
    private static final Logger log = Logger.getLogger(Resource.class);
    

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<Client> list() {
        return Client.findAll().list();
    }
    
    @GET
    @Path("/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Client get( @PathParam("id") String documentNumber ) {
        return Client.findByDocumentNumber(documentNumber);
    }
    
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response create(  Request request ) throws URISyntaxException{
        log.info(request);
        
        if ( Client.findByDocumentNumber(request.getDocumentNumber()) != null) {
            throw new ForbiddenException("Somente um usuario por documento"); 
        }
        
        Client client = new Client();
        
        client.setFirstName(request.getLastName());
        client.setLastName(request.getLastName());
        client.setDocumentNumber(request.getDocumentNumber());
        client.setDocumentType(request.getDocumentType());
        client.setEmail(request.getEmail());
        client.setPhone(request.getPhone());
        client.setAddressId(request.getAddressId());
        
        client.persist();
        
        return Response.created(new URI(String.format("/client/%s",client.getDocumentNumber()))).build();
    }
    
    @PATCH
    @Consumes(MediaType.APPLICATION_JSON)
    public CreateResponseDTO update(  UpdateDTO request ){
        log.info(request);
        
        if ( Client.findByDocumentNumber(request.getDocumentNumber()) == null) {
            throw new NotFoundException("Somente um usuario por documento"); 
        }
        
        Client client = new Client();
        
        client.setFirstName(request.getLastName());
        client.setLastName(request.getLastName());
        client.setEmail(request.getEmail());
        client.setPhone(request.getPhone());
        client.setAddressId(request.getAddressId());

        client.id = new ObjectId(request.getId());
        client.update();
        
        return new CreateResponseDTO("Atualizado com sucesso!");
    }
    
    @DELETE
    @Path("/{id}")
    public CreateResponseDTO delete(  @PathParam("id") String id ){
        log.info(id);
        
        Client.deleteById(new ObjectId(id));
        
        return new CreateResponseDTO("Deletado com sucesso");
    }
    
}