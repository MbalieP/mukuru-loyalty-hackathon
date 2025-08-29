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
<<<<<<< HEAD
    private int calculatePoints(double amount) {
        // Example: 1 point for every R100 sent
        return (int) (amount / 200);
=======
    private int calculatePoints(float amount) {
        // Example: 1 point for every R10 sent

        return (int) (amount * 0.01);
>>>>>>> 6e1bfa826524b972e08d734a41d1f5ac38fc73ca
    }
    public float getAmount() { return amount; }
    public int getPointsEarned() { return pointsEarned; }
    }

