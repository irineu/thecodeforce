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

import com.codeforce.hackathon.model.UpdateDTO;
import com.codeforce.hackathon.model.Product;
import com.mongodb.client.model.geojson.Position;
import com.codeforce.hackathon.model.Request;
import com.codeforce.hackathon.model.Response;

@Path("/product")
public class GreetingResource {
    
    private static final Logger log = Logger.getLogger(GreetingResource.class);
    

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<Product> list() {
        return Product.findAll().list();
    }
    
    @GET
    @Path("/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Product get( @PathParam("id") String id ) {
        return Product.findById(new ObjectId(id));
    }
    
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    public Response create(  Request request ){
        log.info(request);
        
        Product product = new Product();
        
        product.setName(request.getName());
        product.setBrand(request.getBrand());
        product.setType(request.getType());
        product.setUnits(request.getUnits());
        product.setAvgDuration(request.getAvgDuration());
        product.setPrice(request.getPrice());

        product.persist();
        
        return new Response();
    }
    
    @PATCH
    @Consumes(MediaType.APPLICATION_JSON)
    public Response update(  UpdateDTO request ){
        log.info(request);
        
        Product product = new Product();

        product.setName(request.getName());
        product.setBrand(request.getBrand());
        product.setType(request.getType());
        product.setUnits(request.getUnits());
        product.setAvgDuration(request.getAvgDuration());
        product.setPrice(request.getPrice());

        product.id = new ObjectId(request.getId());
        product.update();
        
        return new Response("Atualizado com sucesso!");
    }
    
    @DELETE
    @Path("/{id}")
    public Response delete(  @PathParam("id") String id ){
        log.info(id);
        
        Product.deleteById(new ObjectId(id));
        
        return new Response("Deletado com sucesso");
    }
    
}