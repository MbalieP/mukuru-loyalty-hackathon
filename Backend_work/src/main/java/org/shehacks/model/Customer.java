package org.shehacks.model;

public class Customer {
    private String cellphone;
    private String name;
    private int pointsBalance;
    private Tiers tier; //Member, Bronze, Silver, Gold

public Customer(String cellphone, String name) {
    this.cellphone = cellphone;
    this.name = name;
    this.pointsBalance = 0;
    this.tier = Tiers.MEMBER;
}
    // --- Update points when a new transaction is made ---


    // Getters & Setters
    public String getCellphone() { return cellphone; }
    public String getName() { return name; }
    public int getPointsBalance() { return pointsBalance; }
    public void setPointsBalance(int pointsBalance) { this.pointsBalance = pointsBalance; }
    public Tiers getTier() { return tier; }
    public void setTier(Tiers tier) { this.tier = tier; }

    public void addTransaction(Transaction transaction) {
        this.pointsBalance += transaction.getPointsEarned();
        updateTier();
    }
    private void updateTier() {
        if (pointsBalance >= 1000) {
            this.tier = Tiers.GOLD;
        } else if (pointsBalance >= 500) {
            this.tier = Tiers.SILVER;
        } else if (pointsBalance >= 100) {
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
