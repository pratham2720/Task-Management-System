import { useEffect, useRef } from 'react';

const AnimatedBackground = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationId;
        let stars = [];

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initStars();
        };

        const initStars = () => {
            stars = [];
            const numStars = Math.floor((canvas.width * canvas.height) / 8000);

            for (let i = 0; i < numStars; i++) {
                stars.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    size: Math.random() * 1.5 + 0.5,
                    opacity: Math.random() * 0.5 + 0.2,
                    speed: Math.random() * 0.02 + 0.005,
                    twinkleSpeed: Math.random() * 0.02 + 0.01,
                    twinklePhase: Math.random() * Math.PI * 2
                });
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw subtle nebula gradient
            const gradient = ctx.createRadialGradient(
                canvas.width * 0.3, canvas.height * 0.3, 0,
                canvas.width * 0.3, canvas.height * 0.3, canvas.width * 0.6
            );
            gradient.addColorStop(0, 'rgba(59, 130, 246, 0.02)');
            gradient.addColorStop(0.5, 'rgba(99, 102, 241, 0.01)');
            gradient.addColorStop(1, 'transparent');
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Draw stars with twinkle effect
            stars.forEach(star => {
                star.twinklePhase += star.twinkleSpeed;
                const twinkle = Math.sin(star.twinklePhase) * 0.3 + 0.7;
                const currentOpacity = star.opacity * twinkle;

                ctx.beginPath();
                ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${currentOpacity})`;
                ctx.fill();

                // Subtle glow for larger stars
                if (star.size > 1) {
                    ctx.beginPath();
                    ctx.arc(star.x, star.y, star.size * 2, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(180, 200, 255, ${currentOpacity * 0.15})`;
                    ctx.fill();
                }

                // Very slow drift
                star.y += star.speed;
                if (star.y > canvas.height) {
                    star.y = 0;
                    star.x = Math.random() * canvas.width;
                }
            });

            animationId = requestAnimationFrame(animate);
        };

        resize();
        animate();

        window.addEventListener('resize', resize);
        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: -1,
                pointerEvents: 'none'
            }}
        />
    );
};

export default AnimatedBackground;
