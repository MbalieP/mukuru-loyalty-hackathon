package org.shehacks.rewards;
import java.nio.file.*;
import java.io.IOException;
import java.util.List;

public class Rewards {
    private int current_points;
    private String chosen_rewards;

    public Rewards(int current_points, String chosen_reward){
        this.current_points = current_points;
        this.chosen_rewards = chosen_reward;

    }

    public static void main(String[] args) throws IOException {
        boolean check = readTextfile();

    }

    public static boolean readTextfile() throws IOException {
        List<String> lines = Files.readAllLines(Paths.get("rewards.txt"));
        for (String line : lines) {
            System.out.println(line);
        }

        return true;
    }
}
