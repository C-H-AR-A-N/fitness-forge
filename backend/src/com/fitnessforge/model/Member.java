package com.fitnessforge.model;

import java.time.LocalDate;

/**
 * A paying club member. INHERITS identity fields from Person and adds
 * membership-specific state (plan, join date, active flag).
 */
public class Member extends Person {

    private MembershipPlan plan;
    private LocalDate joinedOn;
    private boolean active;

    public Member(int id, String fullName, String email, String phone,
                  MembershipPlan plan, LocalDate joinedOn, boolean active) {
        super(id, fullName, email, phone); // inherited constructor
        this.plan = plan;
        this.joinedOn = joinedOn;
        this.active = active;
    }

    @Override
    public String describeRole() {
        return "Member (" + (plan == null ? "no plan" : plan.getName()) + ")";
    }

    /** Polymorphic override: a member PAYS the price of their plan. */
    @Override
    public double monthlyAmount() {
        return plan == null ? 0d : plan.getMonthlyPrice();
    }

    /** Business rule: only active members with a plan may book a class. */
    public boolean canBookClasses() {
        return active && plan != null;
    }

    public MembershipPlan getPlan() {
        return plan;
    }

    public void setPlan(MembershipPlan plan) {
        this.plan = plan;
    }

    public LocalDate getJoinedOn() {
        return joinedOn;
    }

    public void setJoinedOn(LocalDate joinedOn) {
        this.joinedOn = joinedOn;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }
}
