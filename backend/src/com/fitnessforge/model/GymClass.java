package com.fitnessforge.model;

import java.time.LocalTime;

/**
 * A scheduled group class. Implements Bookable, so the booking service can
 * handle it without knowing this concrete type (abstraction + polymorphism).
 */
public class GymClass implements Bookable {

    private int id;
    private String title;
    private String dayOfWeek;
    private LocalTime startTime;
    private int durationMinutes;
    private Intensity intensity;
    private int capacity;
    private int booked;
    private Trainer coach;

    /** Enum keeps intensity values valid at compile time. */
    public enum Intensity { LOW, MODERATE, HIGH }

    public GymClass(int id, String title, String dayOfWeek, LocalTime startTime,
                    int durationMinutes, Intensity intensity, int capacity,
                    int booked, Trainer coach) {
        this.id = id;
        this.title = title;
        this.dayOfWeek = dayOfWeek;
        this.startTime = startTime;
        this.durationMinutes = durationMinutes;
        this.intensity = intensity;
        this.capacity = capacity;
        this.booked = booked;
        this.coach = coach;
    }

    @Override
    public int getId() {
        return id;
    }

    @Override
    public String getTitle() {
        return title + " (" + dayOfWeek + " " + startTime + ")";
    }

    @Override
    public int seatsAvailable() {
        return Math.max(0, capacity - booked);
    }

    @Override
    public boolean reserveSeat() {
        if (!isBookable()) {
            return false; // full
        }
        booked++;
        return true;
    }

    @Override
    public void releaseSeat() {
        if (booked > 0) {
            booked--;
        }
    }

    /** Club rule: high intensity classes need an experienced coach. */
    public boolean hasQualifiedCoach() {
        return intensity != Intensity.HIGH
                || (coach != null && coach.canLeadAdvancedClasses());
    }

    public String getName() {
        return title;
    }

    public String getDayOfWeek() {
        return dayOfWeek;
    }

    public LocalTime getStartTime() {
        return startTime;
    }

    public int getDurationMinutes() {
        return durationMinutes;
    }

    public Intensity getIntensity() {
        return intensity;
    }

    public int getCapacity() {
        return capacity;
    }

    public int getBooked() {
        return booked;
    }

    public Trainer getCoach() {
        return coach;
    }
}
