package com.fitnessforge.model;

/**
 * A coach employed by the club. Also INHERITS from Person but overrides the
 * shared methods differently from Member - the same call, different behaviour.
 */
public class Trainer extends Person {

    private String speciality;
    private int yearsExperience;
    private double monthlySalary;

    public Trainer(int id, String fullName, String email, String phone,
                   String speciality, int yearsExperience, double monthlySalary) {
        super(id, fullName, email, phone);
        this.speciality = speciality;
        this.yearsExperience = yearsExperience;
        this.monthlySalary = monthlySalary;
    }

    @Override
    public String describeRole() {
        return "Trainer (" + speciality + ")";
    }

    /** Polymorphic override: a trainer is PAID, so the amount is the salary. */
    @Override
    public double monthlyAmount() {
        return monthlySalary;
    }

    /** Senior coaches may run the advanced (high intensity) sessions. */
    public boolean canLeadAdvancedClasses() {
        return yearsExperience >= 5;
    }

    public String getSpeciality() {
        return speciality;
    }

    public void setSpeciality(String speciality) {
        this.speciality = speciality;
    }

    public int getYearsExperience() {
        return yearsExperience;
    }

    public void setYearsExperience(int yearsExperience) {
        this.yearsExperience = yearsExperience;
    }

    public double getMonthlySalary() {
        return monthlySalary;
    }

    public void setMonthlySalary(double monthlySalary) {
        this.monthlySalary = monthlySalary;
    }
}
