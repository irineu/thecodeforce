package com.codeforce.hackathon;

import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.PATCH;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.bson.types.ObjectId;
import org.jboss.logging.Logger;

import com.codeforce.hackathon.model.Storage;
import com.codeforce.hackathon.model.UpdateDTO;
import com.codeforce.hackathon.model.Request;
import com.codeforce.hackathon.model.ResponseDTO;

@Path("/storage")
public class Resource {
    
    private static final Logger log = Logger.getLogger(Resource.class);
    

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<Storage> list() {
        return Storage.findAll().list();
    }
    
    @GET
    @Path("/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Storage get( @PathParam("id") String id ) {
        return Storage.findById(new ObjectId(id));
    }
    
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    public ResponseDTO create(  Request request ){
        log.info(request);
        
        Storage storage = new Storage();
        
        storage.setPrice(request.getPrice());
        storage.setProductId(request.getProductId());
        storage.setStoreId(request.getStoreId());
        storage.setUnits(request.getUnits());
        
        storage.persist();
        
        return new ResponseDTO();
    }
    
    @PATCH
    @Consumes(MediaType.APPLICATION_JSON)
    public ResponseDTO update(  UpdateDTO request ){
        log.info(request);
        
        Storage storage = new Storage();
        
        storage.setPrice(request.getPrice());
        storage.setProductId(request.getProductId());
        storage.setStoreId(request.getStoreId());
        storage.setUnits(request.getUnits());
        
        storage.id = new ObjectId(request.getId());
        storage.update();
        
        return new ResponseDTO("Atualizado com sucesso!");
    }
    
    @DELETE
    @Path("/{id}")
    public ResponseDTO delete(  @PathParam("id") String id ){
        log.info(id);
        
        Storage.deleteById(new ObjectId(id));
        
        return new ResponseDTO("Deletado com sucesso");
    }
    
}