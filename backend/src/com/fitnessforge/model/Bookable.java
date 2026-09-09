package com.fitnessforge.model;

/**
 * ABSTRACTION through an interface: anything a member can reserve a spot in
 * (a group class today, a court or a workshop tomorrow) implements Bookable.
 *
 * The service layer talks to this interface, so adding a new bookable type
 * needs no change in the booking logic - only a new implementing class.
 */
public interface Bookable {

    int getId();

    /** Human readable title shown in the front-end timetable. */
    String getTitle();

    /** Places still free. */
    int seatsAvailable();

    /** True when at least one seat remains. */
    default boolean isBookable() {
        return seatsAvailable() > 0;
    }

    /** Reserve one seat; returns false when the session is already full. */
    boolean reserveSeat();

    /** Release a previously reserved seat. */
    void releaseSeat();
}
