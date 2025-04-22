// This file simulates a database for the FuelFlow application

import { format, addMinutes, isAfter, isBefore } from "date-fns"

// Types
export type TimeSlot = {
  id: string
  time: string
  available: boolean
}

export type Station = {
  id: string
  name: string
  location: string
}

export type FuelType = {
  id: string
  name: string
  price: number
}

export type Booking = {
  id: string
  userId: string
  stationId: string
  fuelTypeId: string
  slotId: string
  tokenNumber: string
  status: "pending" | "completed" | "cancelled"
  createdAt: string
}

// Mock data
export const stations: Station[] = [
  { id: "1", name: "City Center Fuel Station", location: "Downtown, Main Street" },
  { id: "2", name: "Highway Express Pump", location: "Highway 101, Exit 23" },
  { id: "3", name: "Suburban Fuel Stop", location: "Greenfield Area, Park Road" },
]

export const fuelTypes: FuelType[] = [
  { id: "1", name: "Regular Petrol", price: 95.5 },
  { id: "2", name: "Premium Petrol", price: 105.8 },
  { id: "3", name: "Diesel", price: 89.3 },
]

// Generate time slots for today (every 10 minutes from 6 AM to 10 PM)
export const generateTimeSlots = (): TimeSlot[] => {
  const slots: TimeSlot[] = []
  const now = new Date()
  let startTime = new Date(now)
  startTime.setHours(6, 0, 0, 0) // Start at 6 AM

  // If current time is after 6 AM, start from the next available slot
  if (isAfter(now, startTime)) {
    const minutes = now.getMinutes()
    const roundedMinutes = Math.ceil(minutes / 10) * 10
    startTime = new Date(now)
    startTime.setMinutes(roundedMinutes, 0, 0)
  }

  const endTime = new Date(now)
  endTime.setHours(22, 0, 0, 0) // End at 10 PM

  while (isBefore(startTime, endTime)) {
    const id = format(startTime, "HHmm")
    const time = format(startTime, "h:mm a")
    const available = Math.random() > 0.3 // 70% chance of being available

    slots.push({ id, time, available })
    startTime = addMinutes(startTime, 10)
  }

  return slots
}

// Mock bookings
const bookings: Booking[] = []

// Current token being served (for the live status page)
let currentToken = "A001"
let estimatedWaitTime = 5 // minutes

// Helper functions
export const getAvailableTimeSlots = () => {
  return generateTimeSlots().filter((slot) => slot.available)
}

export const generateToken = () => {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  const letter = letters[Math.floor(Math.random() * letters.length)]
  const number = Math.floor(Math.random() * 900) + 100 // 100-999
  return `${letter}${number}`
}

export const createBooking = (userId: string, stationId: string, fuelTypeId: string, slotId: string): Booking => {
  const token = generateToken()
  const booking: Booking = {
    id: Math.random().toString(36).substring(2, 9),
    userId,
    stationId,
    fuelTypeId,
    slotId,
    tokenNumber: token,
    status: "pending",
    createdAt: new Date().toISOString(),
  }

  bookings.push(booking)
  return booking
}

export const getBookingByToken = (token: string): Booking | undefined => {
  return bookings.find((booking) => booking.tokenNumber === token)
}

export const cancelBooking = (bookingId: string): boolean => {
  const bookingIndex = bookings.findIndex((booking) => booking.id === bookingId)
  if (bookingIndex !== -1) {
    bookings[bookingIndex].status = "cancelled"
    return true
  }
  return false
}

export const getCurrentStatus = () => {
  return {
    currentToken,
    estimatedWaitTime,
    totalPending: bookings.filter((b) => b.status === "pending").length,
  }
}

// Update the current token every few minutes (in a real app, this would be done by the staff)
setInterval(() => {
  const tokenLetter = currentToken.charAt(0)
  const tokenNumber = Number.parseInt(currentToken.substring(1))

  if (tokenNumber >= 999) {
    const letterIndex = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".indexOf(tokenLetter)
    const newLetter = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"[(letterIndex + 1) % 26]
    currentToken = `${newLetter}001`
  } else {
    currentToken = `${tokenLetter}${(tokenNumber + 1).toString().padStart(3, "0")}`
  }

  estimatedWaitTime = Math.floor(Math.random() * 10) + 2 // 2-12 minutes
}, 300000) // Update every 5 minutes
