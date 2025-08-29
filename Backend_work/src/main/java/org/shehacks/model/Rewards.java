package org.shehacks.model;

public class Rewards {
    private String name;
    private int pointsCost;
    private String description;

    public Rewards(String name, int pointsCost, String description) {
        this.name = name;
        this.pointsCost = pointsCost;
        this.description = description;
    }

    public String getName() { return name; }
    public int getPointsCost() { return pointsCost; }
    public String getDescription() { return description; }
}

