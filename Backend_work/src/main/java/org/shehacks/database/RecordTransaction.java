package org.shehacks.database;

import net.lemnik.eodsql.QueryTool;
import org.shehacks.model.Customer;
import org.shehacks.model.Transaction;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.List;
import java.util.Locale;

public class RecordTransaction {

    public static void transact(Customer customer, Transaction transaction){
        try(Connection connection = DriverManager.getConnection(Database.DISK_DB_URL)){
            HistoryDAI historyDAI = QueryTool.getQuery(connection,HistoryDAI.class);

        } catch (SQLException e) {
            System.out.println("ERROR! Could not connect to database.");
            throw new RuntimeException(e);
        }

    }

    public static void saveTransaction(HistoryDAI historyDAI, Customer customer, Transaction transaction){
        HistoryDO historyDO = new HistoryDO();
        historyDO.id = 1;
        historyDO.cellphone = customer.getCellphone();
        historyDO.amount = transaction.getAmount();
        historyDO.date = transaction.getDate();
        historyDO.points = customer.getPointsBalance();
        historyDO.status = customer.getTier().name().toLowerCase();

        historyDAI.addTransaction(historyDO);
    }

    public static List<HistoryDO> getTransactionHistory(HistoryDAI historyDAI,String cellphone){
        List<HistoryDO> customerHistory = historyDAI.getCustomerTransactionHistory(cellphone);
        return customerHistory;
    }

    public static List<HistoryDO> getAllHistory(HistoryDAI historyDAI){
        List<HistoryDO> allTransactionHistory = historyDAI.getTransactionHistory();
        return allTransactionHistory;
    }



}
