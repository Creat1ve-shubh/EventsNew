"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Image from "next/image";
import { surfer } from "../assets/index"
dayjs.extend(relativeTime);

interface Event {
  id: number;
  title: string;
  date: string; // ISO format
  description: string;
  image?: string;
}

const defaultOptions = {
	reverse:        false,  // reverse the tilt direction
	max:            35,     // max tilt rotation (degrees)
	perspective:    1000,   // Transform perspective, the lower the more extreme the tilt gets.
	scale:          1.1,    // 2 = 200%, 1.5 = 150%, etc..
	speed:          1000,   // Speed of the enter/exit transition
	transition:     true,   // Set a transition on enter/exit.
	axis:           null,   // What axis should be disabled. Can be X or Y.
	reset:          true,    // If the tilt effect has to be reset on exit.
	easing:         "cubic-bezier(.03,.98,.52,.99)",    // Easing on enter/exit.
}

const events: Event[] = [
  { id: 1, title: "Hackathon", date: "2025-02-10T10:00:00Z", description: "A 24-hour coding challenge.", image: surfer  },
  { id: 2, title: "AI Workshop", date: "2025-02-15T14:00:00Z", description: "Learn the latest in AI development.", image: "/images/ai-workshop.jpg" },
  { id: 3, title: "Cybersecurity Meetup", date: "2025-02-20T18:00:00Z", description: "Discussion on the latest threats and defenses.", image: "/images/cybersecurity.jpg" },
];

const EventTracker = () => {
  const [nextEvent, setNextEvent] = useState<Event | null>(null);
  const [timeLeft, setTimeLeft] = useState<string>("");
  const [countdown, setCountdown] = useState<{ hours: number; minutes: number; seconds: number }>({ hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const now = dayjs();
    const upcoming = events.find((event) => dayjs(event.date).isAfter(now));
    if (upcoming) {
      setNextEvent(upcoming);
      updateCountdown(upcoming.date);
    }
  }, []);

  useEffect(() => {
    if (nextEvent) {
      const interval = setInterval(() => updateCountdown(nextEvent.date), 1000);
      return () => clearInterval(interval);
    }
  }, [nextEvent]);

  const updateCountdown = (eventDate: string) => {
    const now = dayjs();
    const eventTime = dayjs(eventDate);
    const diff = eventTime.diff(now, "second");
    
    if (diff > 0) {
      setTimeLeft(dayjs(eventDate).fromNow());
      setCountdown({
        hours: Math.floor(diff / 3600),
        minutes: Math.floor((diff % 3600) / 60),
        seconds: diff % 60,
      });
    } else {
      setTimeLeft("Happening now!");
    }
  };

  if (!nextEvent) return <p className="text-center text-gray-500">No upcoming events</p>;

  return (
    <motion.div
      className="mx-[30vh] mt-10 px-18 py-24 text-white rounded-2xl shadow-lg border border-gray-700 relative overflow-hidden"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {nextEvent.image && (
        <Image 
          src={nextEvent.image} 
          alt={nextEvent.title} 
          layout="fill"
          objectFit="cover"
          className="absolute inset-0 w-full h-full opacity-50"
        />
      )}
      <div className="relative bg-opacity-60 p-6 rounded-2xl">
        <h2 className="text-3xl text-center font-bold text-teal-400">Upcoming Event</h2>
        <motion.p 
          className="text-7xl text-center font-semibold mt-2 bg-gradient-to-r from-teal-300 via-white to-teal-300 bg-clip-text text-transparent"
          animate={{ backgroundPosition: ["0%", "200%", "0%"] }}
          transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
        >
          {nextEvent.title}
        </motion.p>
        <p className="text-xl text-center text-gray-400 mt-1">{nextEvent.description}</p>
        <p className="mt-4 text-3xl text-center text-teal-300">{timeLeft}</p>
        <p className="mt-2 text-4xl text-center text-red-400">Countdown: {countdown.hours}h {countdown.minutes}m {countdown.seconds}s</p>
      </div>
    </motion.div>
  );
};

export default EventTracker;
