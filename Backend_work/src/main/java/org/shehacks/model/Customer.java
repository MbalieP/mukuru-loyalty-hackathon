package org.shehacks.model;

public class Customer {
    private String cellphone;
    private String name;
    private int pointsBalance;
    private Tiers tier; //Member, Bronze, Silver, Gold
    private int transactionsCount;
public Customer(String cellphone, String name) {
    this.cellphone = cellphone;
    this.name = name;
    this.pointsBalance = 0;
    this.tier = Tiers.MEMBER;
    this.transactionsCount= 0;
}
    // --- Update points when a new transaction is made ---


    // Getters & Setters
    public String getCellphone() { return cellphone; }
    public String getName() { return name; }
    public int getPointsBalance() { return pointsBalance; }

    public Tiers getTier() { return tier; }
    public void setTier(Tiers tier) { this.tier = tier; }

    public void addTransaction(Transaction transaction) {
        this.pointsBalance += transaction.getPointsEarned();
        this.transactionsCount++;   // increment transaction count
        updateTier();
    }
    private void updateTier() {
        if (transactionsCount >= 20) {
            this.tier = Tiers.GOLD;
        } else if (transactionsCount >= 10) {
            this.tier = Tiers.SILVER;
        } else if (transactionsCount >= 5) {
            this.tier = Tiers.BRONZE;
        } else {
            this.tier = Tiers.MEMBER;
        }

}
    public boolean redeemReward(Rewards reward) {
        if (this.pointsBalance >= reward.getPointsCost()) {
            this.pointsBalance -= reward.getPointsCost();
            updateTier(); // Tier might drop if points are spent
            return true; // Successful redemption
        } else {
            return false; // Not enough points
        }
    }}
