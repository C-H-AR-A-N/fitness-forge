package com.fitnessforge.model;

import java.time.LocalDateTime;

/**
 * Join entity between Member and GymClass.
 *
 * A member attends many classes and a class holds many members - a many-to-many
 * relation. Normalisation requires resolving that into its own table
 * (booking), which is exactly what this class maps to.
 */
public class Booking {

    private int id;
    private Member member;
    private GymClass gymClass;
    private LocalDateTime bookedAt;
    private Status status;

    public enum Status { CONFIRMED, WAITLISTED, CANCELLED }

    public Booking(int id, Member member, GymClass gymClass,
                   LocalDateTime bookedAt, Status status) {
        this.id = id;
        this.member = member;
        this.gymClass = gymClass;
        this.bookedAt = bookedAt;
        this.status = status;
    }

    public int getId() {
        return id;
    }

    public Member getMember() {
        return member;
    }

    public GymClass getGymClass() {
        return gymClass;
    }

    public LocalDateTime getBookedAt() {
        return bookedAt;
    }

    public Status getStatus() {
        return status;
    }

    public void cancel() {
        if (status == Status.CONFIRMED) {
            gymClass.releaseSeat();
        }
        status = Status.CANCELLED;
    }

    @Override
    public String toString() {
        return member.getFullName() + " -> " + gymClass.getTitle() + " [" + status + "]";
    }
}
