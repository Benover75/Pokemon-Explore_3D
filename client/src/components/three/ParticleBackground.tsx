export default function ParticleBackground() {
  // Generate particles with random positions and delays
  const particles = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
    delay: Math.random() * 20,
    duration: 15 + Math.random() * 25,
    size: 2 + Math.random() * 4,
  }));

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[hsl(240,20%,10%)] via-[hsl(221,39%,16%)] via-[hsl(221,71%,20%)] via-[hsl(280,23%,35%)] to-[hsl(348,83%,60%)] animate-pulse-glow" />
      
      {/* Floating particles */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full bg-gradient-to-r from-[hsl(193,100%,50%)] to-[hsl(280,50%,60%)] opacity-60 animate-float"
          style={{
            left: `${particle.left}%`,
            top: `${particle.top}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            animationDelay: `${particle.delay}s`,
            animationDuration: `${particle.duration}s`,
            filter: 'blur(1px)',
          }}
        />
      ))}

      {/* Moving light beams */}
      <div className="absolute inset-0">
        <div 
          className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-[hsl(193,100%,50%)] to-transparent opacity-30 animate-pulse"
          style={{ animationDelay: '0s', animationDuration: '4s' }}
        />
        <div 
          className="absolute top-0 left-3/4 w-px h-full bg-gradient-to-b from-transparent via-[hsl(348,83%,60%)] to-transparent opacity-30 animate-pulse"
          style={{ animationDelay: '2s', animationDuration: '4s' }}
        />
        <div 
          className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-[hsl(280,50%,60%)] to-transparent opacity-20 animate-pulse"
          style={{ animationDelay: '1s', animationDuration: '6s' }}
        />
      </div>

      {/* Large floating orbs */}
      <div 
        className="absolute top-1/4 left-1/6 w-32 h-32 rounded-full bg-gradient-radial from-[hsl(193,100%,50%,0.1)] to-transparent animate-float"
        style={{ animationDelay: '0s', animationDuration: '20s' }}
      />
      <div 
        className="absolute bottom-1/4 right-1/6 w-24 h-24 rounded-full bg-gradient-radial from-[hsl(348,83%,60%,0.1)] to-transparent animate-float"
        style={{ animationDelay: '10s', animationDuration: '25s' }}
      />
      <div 
        className="absolute top-3/4 left-2/3 w-20 h-20 rounded-full bg-gradient-radial from-[hsl(280,50%,60%,0.1)] to-transparent animate-float"
        style={{ animationDelay: '5s', animationDuration: '18s' }}
      />
    </div>
  );
}
