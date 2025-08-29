package org.shehacks.model;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

public class Transaction {
    private float amount;
    private int pointsEarned;
    private String date;

public Transaction(float amount){
    this.amount = amount;
    this.pointsEarned = calculatePoints(amount);
    this.date = LocalDate.now().format(DateTimeFormatter.ofPattern("dd/MM/yyyy"));
}


    public String getDate(){
        return date;
    }
    private int calculatePoints(float amount) {
        // Example: 1 point for every R10 sent

        return (int) (amount * 0.01);
    }
    public float getAmount() { return amount; }
    public int getPointsEarned() { return pointsEarned; }
    }

