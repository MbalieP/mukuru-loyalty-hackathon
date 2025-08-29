package org.shehacks.model;

import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class CustomerControl {
    private Customer customer = new Customer("0812345678", "Mbali"); // Demo customer
    private Marketplace marketplace = new Marketplace();

    // --- 1. Get customer info ---
    @GetMapping("/customer")
    public Map<String, Object> getCustomerInfo() {
        Map<String, Object> info = new HashMap<>();
        info.put("name", customer.getName());
        info.put("cellphone", customer.getCellphone());
        info.put("points", customer.getPointsBalance());
        info.put("tier", customer.getTier());
        return info;
    }

    // --- 2. Send money (create transaction) ---
    @PostMapping("/send")
    public Map<String, Object> sendMoney(@RequestParam double amount) {
        Transaction transaction = new Transaction((int) amount);
        customer.addTransaction(transaction);

        Map<String, Object> response = new HashMap<>();
        response.put("amountSent", amount);
        response.put("pointsEarned", transaction.getPointsEarned());
        response.put("totalPoints", customer.getPointsBalance());
        response.put("tier", customer.getTier());
        return response;
    }

    // --- 3. Get available rewards ---
    @GetMapping("/rewards")
    public List<Rewards> getRewards() {
        return marketplace.getAvailableRewards();
    }

    // --- 4. Redeem reward ---
    @PostMapping("/redeem")
    public Map<String, Object> redeemReward(@RequestParam String rewardName) {
        boolean success = marketplace.redeemReward(customer, rewardName);
        Map<String, Object> response = new HashMap<>();
        response.put("success", success);
        response.put("pointsLeft", customer.getPointsBalance());
        response.put("tier", customer.getTier());
        return response;
    }
}
