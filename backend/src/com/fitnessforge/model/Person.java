package com.fitnessforge.model;

/**
 * ABSTRACTION + INHERITANCE base class.
 *
 * Person holds the attributes every human in the club shares (members, trainers,
 * staff). It is declared abstract because a bare "Person" is never stored on its
 * own - the database only holds members and trainers, which extend this class.
 *
 * The abstract method describeRole() forces every subclass to explain what it is;
 * calling it through a Person reference is POLYMORPHISM in action (see
 * FitnessService.printDirectory).
 */
public abstract class Person {

    // Encapsulation: fields are private, access happens through getters/setters.
    private int id;
    private String fullName;
    private String email;
    private String phone;

    protected Person(int id, String fullName, String email, String phone) {
        this.id = id;
        this.fullName = fullName;
        this.email = email;
        this.phone = phone;
    }

    /** Each subclass must describe its own role - no default is meaningful here. */
    public abstract String describeRole();

    /**
     * Monthly amount this person is billed by (member) or paid by (trainer).
     * Overridden by both subclasses -> runtime polymorphism.
     */
    public abstract double monthlyAmount();

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    /** Common behaviour inherited by every subclass. */
    public String contactLine() {
        return fullName + " <" + email + "> " + (phone == null ? "" : phone);
    }

    @Override
    public String toString() {
        return describeRole() + ": " + contactLine();
    }
}
