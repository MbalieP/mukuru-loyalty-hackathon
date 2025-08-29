package org.shehacks.model;

import java.util.ArrayList;
import java.util.List;

public class Marketplace {
    private List<Rewards> rewards = new ArrayList<>();

    public Marketplace(){
        rewards.add(new Rewards("R50 Airtime", 200, "Get R50 worth of airtime"));
        rewards.add(new Rewards("Shopping Voucher", 500, "R100 Shoprite voucher"));
        rewards.add(new Rewards("Data Bundle", 300, "1GB Data Bundle"));
}

    public List<Rewards> getAvailableRewards() {
        return rewards;
}

    public boolean redeemReward(Customer customer, String rewardName) {
        for (Rewards reward : rewards) {
            if (reward.getName().equalsIgnoreCase(rewardName)) {
                if (customer.redeemReward(reward)) {
                    System.out.println(customer.getName() + " redeemed " + reward.getName());
                    return true;
                } else {
                    System.out.println("Not enough points to redeem this reward.");
                    return false;
                }
            }
        }
        System.out.println("Reward not found.");
        return false;
    }

}
