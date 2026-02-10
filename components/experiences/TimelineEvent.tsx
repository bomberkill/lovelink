'use client';

import { motion } from 'framer-motion';
import { TimelineEvent as TimelineEventType } from '@/lib/types';

interface TimelineEventProps {
    event: TimelineEventType;
    index: number;
}

export default function TimelineEvent({ event, index }: TimelineEventProps) {
    const isEven = index % 2 === 0;

    return (
        <motion.div
            initial={{ opacity: 0, x: isEven ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            className={`flex ${isEven ? 'flex-row' : 'flex-row-reverse'} items-center gap-8 mb-12`}
        >
            {/* Timeline dot */}
            <div className="flex-shrink-0 w-4 h-4 bg-pink-500 rounded-full relative">
                <div className="absolute inset-0 bg-pink-500 rounded-full animate-ping opacity-75"></div>
            </div>

            {/* Event card */}
            <div className={`flex-1 bg-white p-6 rounded-2xl shadow-lg ${isEven ? 'text-left' : 'text-right'}`}>
                <p className="text-sm text-pink-600 font-semibold mb-2">{event.date}</p>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">{event.title}</h3>
                <p className="text-gray-600 leading-relaxed">{event.description}</p>

                {event.photoUrl && (
                    <motion.img
                        whileHover={{ scale: 1.05 }}
                        src={event.photoUrl}
                        alt={event.title}
                        className="mt-4 rounded-lg w-full object-cover max-h-64 cursor-pointer"
                    />
                )}
            </div>
        </motion.div>
    );
}
