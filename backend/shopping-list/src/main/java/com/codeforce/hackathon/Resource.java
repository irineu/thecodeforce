package com.codeforce.hackathon;

import java.net.URI;
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
import javax.ws.rs.core.Response;

import org.bson.types.ObjectId;
import org.jboss.logging.Logger;

import com.codeforce.hackathon.model.UpdateDTO;
import com.codeforce.hackathon.model.ShoppingList;
import com.codeforce.hackathon.model.Product;
import com.codeforce.hackathon.model.Request;
import com.codeforce.hackathon.model.Response;

@Path("/list")
public class GreetingResource {
    
    private static final Logger log = Logger.getLogger(GreetingResource.class);
    

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<ShoppingList> list() {
        return ShoppingList.findAll().list();
    }
    
    @GET
    @Path("/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public ShoppingList get( @PathParam("id") String id ) {
        return ShoppingList.findById(new ObjectId(id));
    }
    
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    public ResponseDTO create(  Request request ) throws Exception{
        log.info(request);
        if(ShoppingList.findByClientId(request.getClientId()) != null){
            throw new InternalError("O cliente só pode ter uma lista de compras!");
        }
        
        ShoppingList shoppinglist = new ShoppingList();

        List<Product> product = new ArrayList<>();
        request.getListProducts().forEach((produto)->{
            product.add(produto);
        });
        
        shoppinglist.setClientId(request.getClientId());
        shoppinglist.setDateNext(request.getDateNext());
        shoppinglist.setListProducts(product);

        shoppinglist.persist();
        
        return new Response("Criado com sucesso!");
    }
    
    @PATCH
    @Consumes(MediaType.APPLICATION_JSON)
    public Response update(  UpdateDTO request ){
        log.info(request);
        
        ShoppingList shoppinglist = new ShoppingList();

        List<Product> product = new ArrayList<>();
        request.getListProducts().forEach((produto)->{
            product.add(produto);
        });
        
        shoppinglist.setDateNext(request.getDateNext());
        shoppinglist.setListProducts(product);

        shoppinglist.id = new ObjectId(request.getId());
        shoppinglist.update();
        
        return new Response("Atualizado com sucesso!");
    }
    
    @DELETE
    @Path("/{id}")
    public Response delete(  @PathParam("id") String id ){
        log.info(id);
        
        ShoppingList.deleteById(new ObjectId(id));
        
        return new Response("Deletado com sucesso");
    }
    
}