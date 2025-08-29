package org.shehacks.web;

import io.javalin.Javalin;

public class WebServer {
    private final Javalin server;

    public WebServer(){
        server = Javalin.create(config -> {config.defaultContentType = "application/json";});
        this.server.get("/{cellphone}", context -> WebAPI.getTransactionHistory(context));
        this.server.post("/transaction", context -> WebAPI.saveTransaction(context));

    }

    public static void main(String[] args) {
        WebServer server = new WebServer();
        server.start(8000);
    }

    public void start(int port){
        this.server.start(port);
    }

    public void stop(){
        this.server.stop();
    }

}
