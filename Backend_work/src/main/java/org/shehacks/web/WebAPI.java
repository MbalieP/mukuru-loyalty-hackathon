package org.shehacks.web;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import io.javalin.http.Context;
import io.javalin.http.HttpCode;
import io.javalin.http.NotFoundResponse;
import net.lemnik.eodsql.QueryTool;
import org.shehacks.database.Database;
import org.shehacks.database.HistoryDAI;
import org.shehacks.database.HistoryDO;
import org.shehacks.database.RecordTransaction;
import org.shehacks.model.Customer;
import org.shehacks.model.Tiers;
import org.shehacks.model.Transaction;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.List;


public class WebAPI {

    private static HistoryDAI historyDAI;

    public WebAPI(){
        try(Connection connection = DriverManager.getConnection(Database.DISK_DB_URL)){
            this.historyDAI = QueryTool.getQuery(connection,HistoryDAI.class);

        } catch (
                SQLException e) {
            System.out.println("ERROR! Could not connect to database.");
            throw new RuntimeException(e);
        }

    }

    public static void getTransactionHistory(Context context){
        String cellphone = context.pathParamAsClass("cellphone", String.class).get();
        List<HistoryDO> recordsList = RecordTransaction.getTransactionHistory(historyDAI,cellphone);
        int count = 1;
        JsonObject response = new JsonObject();
        for(HistoryDO historyDO: recordsList){
            JsonObject record = new JsonObject();
            record.addProperty("Date",historyDO.date);
            record.addProperty("Amount",historyDO.amount);
            response.add(""+count,record);
            count+=1;
        }
        context.result(String.valueOf(response));

    }


    public static void saveTransaction(Context context) throws InterruptedException {
        try{
            String body = context.body();
            Gson gson = new Gson();
            JsonObject request = gson.fromJson(body, JsonObject.class);
            String cellphone = request.get("cellphone").getAsString();
            float amount = request.get("amount").getAsFloat();
            String date = request.get("date").getAsString();
            int points = request.get("points").getAsInt();
            String tier = request.get("tier").getAsString();

            Customer customer = new Customer(cellphone,"");
            customer.setPointsBalance(points);
            switch (tier){
                case "gold":
                    customer.setTier(Tiers.GOLD);

                case "bronze":
                    customer.setTier(Tiers.BRONZE);

                case "silver":
                    customer.setTier(Tiers.SILVER);

                default:
                    customer.setTier(Tiers.MEMBER);
            }

            Transaction transaction = new Transaction(amount);
            RecordTransaction.saveTransaction(historyDAI,customer,transaction);

            String response = "Successfully saved record!";
            context.result(response);

        }catch(Exception e){
            context.result("ERROR: Invalid request!");
        }




    }



}
