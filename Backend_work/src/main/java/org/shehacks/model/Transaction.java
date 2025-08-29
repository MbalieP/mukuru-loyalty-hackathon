package org.shehacks.model;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

public class Transaction {
    private double amount;
    private int pointsEarned;
    private String date;

public Transaction(int amount){
    this.amount = amount;
    this.pointsEarned = calculatePoints(amount);
    this.date = LocalDate.now().format(DateTimeFormatter.ofPattern("dd/MM/yyyy"));
}


    public String getDate(){
        return date;
    }
    private int calculatePoints(double amount) {
        // Example: 1 point for every R10 sent
        return (int) (amount / 200);
    }
    public double getAmount() { return amount; }
    public int getPointsEarned() { return pointsEarned; }
    }

