import { useEffect, useState, useRef } from 'react';

const StatsCard = ({ title, count, icon, variant = 'primary' }) => {
    const [displayCount, setDisplayCount] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const cardRef = useRef(null);

    const variantStyles = {
        primary: {
            bg: 'rgba(99, 102, 241, 0.15)',
            color: '#818cf8',
            glow: 'rgba(99, 102, 241, 0.2)'
        },
        success: {
            bg: 'rgba(52, 211, 153, 0.15)',
            color: '#34d399',
            glow: 'rgba(52, 211, 153, 0.2)'
        },
        warning: {
            bg: 'rgba(251, 191, 36, 0.15)',
            color: '#fbbf24',
            glow: 'rgba(251, 191, 36, 0.2)'
        },
        danger: {
            bg: 'rgba(248, 113, 113, 0.15)',
            color: '#f87171',
            glow: 'rgba(248, 113, 113, 0.2)'
        }
    };

    const style = variantStyles[variant] || variantStyles.primary;

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
            { threshold: 0.1 }
        );
        if (cardRef.current) observer.observe(cardRef.current);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!isVisible) return;
        const duration = 400;
        const steps = 15;
        const stepValue = count / steps;
        let current = 0;
        const timer = setInterval(() => {
            current += stepValue;
            if (current >= count) {
                setDisplayCount(count);
                clearInterval(timer);
            } else {
                setDisplayCount(Math.floor(current));
            }
        }, duration / steps);
        return () => clearInterval(timer);
    }, [count, isVisible]);

    return (
        <div
            ref={cardRef}
            className="stats-card"
            style={{ '--stat-glow': style.glow }}
        >
            <div
                className="stats-icon"
                style={{
                    background: style.bg,
                    color: style.color
                }}
            >
                {icon}
            </div>
            <div className="stats-value" style={{ color: style.color }}>
                {displayCount}
            </div>
            <div className="stats-label">{title}</div>
        </div>
    );
};

export default StatsCard;
