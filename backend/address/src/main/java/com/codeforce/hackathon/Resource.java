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

import com.codeforce.hackathon.model.Address;
import com.codeforce.hackathon.model.UpdateDTO;
import com.mongodb.client.model.geojson.Point;
import com.mongodb.client.model.geojson.Position;
import com.codeforce.hackathon.model.Request;
import com.codeforce.hackathon.model.ResponseDTO;

@Path("/address")
public class Resource {
    
    private static final Logger log = Logger.getLogger(Resource.class);
    

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<Address> list() {
        return Address.findAll().list();
    }
    
    @GET
    @Path("/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Address get( @PathParam("id") String id ) {
        return Address.findById(new ObjectId(id));
    }
    
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    public ResponseDTO create(  Request request ){
        log.info(request);
        
        Address address = new Address();
        Position position = new Position(request.getX(),request.getY());
        Point point = new Point(position);
        
        address.setStreet(request.getStreet());
        address.setCity(request.getCity());
        address.setNumber(request.getNumber());
        address.setState(request.getState());
        address.setPostalCode(request.getPostalCode());
        address.setCountry(request.getCountry());
        address.setGeoLocale(point);

        
        address.persist();
        
        return new ResponseDTO();
    }
    
    @PATCH
    @Consumes(MediaType.APPLICATION_JSON)
    public ResponseDTO update(  UpdateDTO request ){
        log.info(request);
        
        Address address = new Address();
        Position position = new Position(request.getX(),request.getY());
        Point point = new Point(position);
        
        address.setStreet(request.getStreet());
        address.setCity(request.getCity());
        address.setNumber(request.getNumber());
        address.setState(request.getState());
        address.setPostalCode(request.getPostalCode());
        address.setCountry(request.getCountry());
        address.setGeoLocale(point);
        
        address.id = new ObjectId(request.getId());
        address.update();
        
        return new ResponseDTO("Atualizado com sucesso!");
    }
    
    @DELETE
    @Path("/{id}")
    public ResponseDTO delete(  @PathParam("id") String id ){
        log.info(id);
        
        Address.deleteById(new ObjectId(id));
        
        return new ResponseDTO("Deletado com sucesso");
    }
    
}