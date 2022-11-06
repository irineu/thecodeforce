package com.codeforce.hackathon;

import java.util.ArrayList;
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
import com.codeforce.hackathon.model.Order;
import com.codeforce.hackathon.model.Product;
import com.codeforce.hackathon.model.Request;
import com.codeforce.hackathon.model.ResponseDTO;

@Path("/order")
public class Resource {
    
    private static final Logger log = Logger.getLogger(Resource.class);
    

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<Order> list() {
        return Order.findAll().list();
    }
    
    @GET
    @Path("/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Order get( @PathParam("id") String id ) {
        return Order.findById(new ObjectId(id));
    }
    
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    public ResponseDTO create(  Request request ){
        log.info(request);
        
        Order order = new Order();

        List<Product> product = new ArrayList<>();
        request.getListProducts().forEach((produto)->{
            product.add(produto);
        });
        
        order.setAmount(request.getAmount());
        order.setClientId(request.getClientId());
        order.setStatus(request.getStatus());
        order.setDateStart(request.getDateStart());
        order.setDateEnd(request.getDateEnd());
        order.setListProducts(product);

        order.persist();
        
        return new ResponseDTO();
    }
    
    @PATCH
    @Consumes(MediaType.APPLICATION_JSON)
    public ResponseDTO update(  UpdateDTO request ){
        log.info(request);
        
        Order order = new Order();

        List<Product> product = new ArrayList<>();
        request.getListProducts().forEach((produto)->{
            product.add(produto);
        });
        
        order.setAmount(request.getAmount());
        order.setClientId(request.getClientId());
        order.setStatus(request.getStatus());
        order.setDateStart(request.getDateStart());
        order.setDateEnd(request.getDateEnd());
        order.setListProducts(product);

        order.id = new ObjectId(request.getId());
        order.update();
        
        return new ResponseDTO("Atualizado com sucesso!");
    }
    
    @DELETE
    @Path("/{id}")
    public ResponseDTO delete(  @PathParam("id") String id ){
        log.info(id);
        
        Order.deleteById(new ObjectId(id));
        
        return new ResponseDTO("Deletado com sucesso");
    }
    
}