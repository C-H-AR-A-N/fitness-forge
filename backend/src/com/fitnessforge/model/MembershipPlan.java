package com.fitnessforge.model;

/**
 * A membership tier (Flex / Performance / Elite).
 * Kept in its own table so plan prices change in ONE place - this is what
 * third normal form (3NF) asks for: no plan price duplicated on every member row.
 */
public class MembershipPlan {

    private int id;
    private String name;
    private double monthlyPrice;
    private boolean classesIncluded;
    private int personalSessionsPerMonth;

    public MembershipPlan(int id, String name, double monthlyPrice,
                          boolean classesIncluded, int personalSessionsPerMonth) {
        this.id = id;
        this.name = name;
        this.monthlyPrice = monthlyPrice;
        this.classesIncluded = classesIncluded;
        this.personalSessionsPerMonth = personalSessionsPerMonth;
    }

    public int getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public double getMonthlyPrice() {
        return monthlyPrice;
    }

    public boolean isClassesIncluded() {
        return classesIncluded;
    }

    public int getPersonalSessionsPerMonth() {
        return personalSessionsPerMonth;
    }

    @Override
    public String toString() {
        return name + " - " + monthlyPrice + "/month";
    }
}
