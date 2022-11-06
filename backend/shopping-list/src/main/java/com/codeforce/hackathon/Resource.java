package com.codeforce.hackathon;

import java.net.URI;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

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

import com.codeforce.hackathon.model.UpdateDTO;
import com.codeforce.hackathon.model.ShoppingList;
import com.codeforce.hackathon.model.Product;
import com.codeforce.hackathon.model.Products;
import com.codeforce.hackathon.model.Request;
import com.codeforce.hackathon.model.ResponseDTO;

@Path("/list")
public class Resource {
    
    private static final Logger log = Logger.getLogger(Resource.class);
    

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<ShoppingList> list() {
        return ShoppingList.findAll().list();
    }
    
    @GET
    @Path("/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public ShoppingList get( @PathParam("id") String clientId ) {
        return ShoppingList.findByClientId(clientId);
    }
    
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    public Response create(  Request request ) throws Exception{
        log.info(request);
        if(ShoppingList.findByClientId(request.getClientId()) != null){
            throw new InternalError("O cliente só pode ter uma lista de compras!");
        }
        
        ShoppingList shoppinglist = new ShoppingList();
        
        List<Products> produtos = new ArrayList<>();
        request.getProducts().forEach(produto -> {
            produtos.add(produto);
        });
        
        shoppinglist.setClientId(request.getClientId());
        shoppinglist.setDateNext(request.getDateNext());
        shoppinglist.setProducts(produtos);
        
        shoppinglist.persist();
        
        return Response.created(new URI(String.format("/list/%s",shoppinglist.getClientId()))).build();
    }
    
    @PATCH
    @Consumes(MediaType.APPLICATION_JSON)
    public ResponseDTO update(  UpdateDTO request ){
        log.info(request);
        
        ShoppingList shoppingList = ShoppingList.findByClientId(request.getClientId());
        
        if ( shoppingList == null ) {
            throw new NotFoundException("Usuário não encontrado");
        }

        List<Products> produtos = new ArrayList<>();
        request.getProducts().forEach(produto -> {
            produtos.add(produto);
        });
        
        shoppingList.setDateNext(request.getDateNext());
        shoppingList.setProducts(produtos);
        shoppingList.update();
        
        return new ResponseDTO("Atualizado com sucesso!");
    }
    
    @DELETE
    @Path("/{id}")
    public ResponseDTO delete(  @PathParam("id") String id ){
        log.info(id);
        
        ShoppingList.deleteById(new ObjectId(id));
        
        return new ResponseDTO("Deletado com sucesso");
    }
    
}