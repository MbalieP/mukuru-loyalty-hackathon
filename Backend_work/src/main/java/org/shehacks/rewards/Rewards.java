package org.shehacks.rewards;
import java.io.BufferedReader;
import java.io.FileReader;
import java.nio.file.*;
import java.io.IOException;
import java.util.Arrays;
import java.util.List;

public class Rewards {
    private static int current_points;
    private static String chosen_reward;
    private static int points_to_spend;
    private static String[] rewards_type = {"airtime","electricity","voucher","bus_ticket_discount","mistery_box","spin_the_will"};

    public Rewards(int current_points, String chosen_reward, int points_to_spend){
        this.current_points = current_points;
        this.chosen_reward = chosen_reward;
        this.points_to_spend = points_to_spend;

    }

    public static void main(String[] args) throws IOException {
//        String fileName = "rewards.txt"; // Replace with your file path
//        try (BufferedReader reader = new BufferedReader(new FileReader(fileName))) {
//            String line;
//            while ((line = reader.readLine()) != null) {
//                System.out.println(line);
//            }
//        } catch (IOException e) {
//            System.err.println("Error reading file: " + e.getMessage());
//        }
        Rewards reward = new Rewards(50, "airtime",20);
        if(Arrays.asList(rewards_type).contains(chosen_reward)){
            String reward_requirements = reward.getRewardInfo();
            if(reward_requirements.equals("")){
                System.out.println("Chosen reward does not exist");
            }else{
                int remaining_points = processReward(reward_requirements);
                System.out.println("Your remaining points are: "+ remaining_points);
            }
        }
        else{
            System.out.println("Error! Invalid reward.");
        }


    }

    public static String getRewardInfo() throws IOException {
        List<String> lines = Files.readAllLines(Paths.get("rewards.txt"));
        for (String line : lines) {
            if(line.contains(chosen_reward)){
                System.out.println(line);
                return line;
            }
        }
        return "";
    }

    public static int processReward(String reward_requirements){
        String[] rewardInfo = reward_requirements.split(",");
        int min_points_required = Integer.parseInt(rewardInfo[1]);
        String qualifier = rewardInfo[2];
        String customer_tier = "all";
        if(qualifier.equals("all") || qualifier.equals(customer_tier)){
            if(rewardInfo[0].equals("bus_ticket_discount")){
                float discount = Float.parseFloat(rewardInfo[1]);
                System.out.println("Congratulations! Bus discount processed.");
            }
            if(current_points >= min_points_required && current_points>= points_to_spend){
                return current_points - points_to_spend;
            }
        }
        System.out.println("Not enough points to process rewards");
        return -1;
    }
}
