export default function FloatingElements() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Large 3D floating orbs */}
      <div 
        className="absolute top-1/4 left-1/4 w-32 h-32 glass rounded-full animate-float card-3d"
        style={{ 
          animationDelay: '0s',
          background: 'radial-gradient(circle at 30% 30%, rgba(0, 212, 255, 0.3), rgba(233, 69, 96, 0.1))',
          boxShadow: '0 0 60px rgba(0, 212, 255, 0.3), inset 0 0 30px rgba(255, 255, 255, 0.1)'
        }}
      />
      
      <div 
        className="absolute top-3/4 right-1/4 w-24 h-24 glass rounded-full animate-float card-3d" 
        style={{ 
          animationDelay: '3s',
          background: 'radial-gradient(circle at 30% 30%, rgba(233, 69, 96, 0.3), rgba(175, 56, 90, 0.1))',
          boxShadow: '0 0 40px rgba(233, 69, 96, 0.3), inset 0 0 20px rgba(255, 255, 255, 0.1)'
        }}
      />
      
      <div 
        className="absolute bottom-1/4 left-1/3 w-20 h-20 glass rounded-full animate-float card-3d" 
        style={{ 
          animationDelay: '6s',
          background: 'radial-gradient(circle at 30% 30%, rgba(175, 56, 90, 0.3), rgba(0, 212, 255, 0.1))',
          boxShadow: '0 0 35px rgba(175, 56, 90, 0.3), inset 0 0 20px rgba(255, 255, 255, 0.1)'
        }}
      />

      {/* Medium floating cubes with 3D transform */}
      <div 
        className="absolute top-1/2 right-1/6 w-16 h-16 glass animate-float"
        style={{ 
          animationDelay: '2s',
          borderRadius: '8px',
          transform: 'rotateX(15deg) rotateY(25deg)',
          background: 'linear-gradient(135deg, rgba(0, 212, 255, 0.2), rgba(233, 69, 96, 0.2))',
          boxShadow: '0 0 30px rgba(0, 212, 255, 0.2), inset 0 0 15px rgba(255, 255, 255, 0.1)'
        }}
      />

      <div 
        className="absolute top-1/6 right-1/3 w-12 h-12 glass animate-float"
        style={{ 
          animationDelay: '4s',
          borderRadius: '6px',
          transform: 'rotateX(-10deg) rotateY(-20deg)',
          background: 'linear-gradient(135deg, rgba(233, 69, 96, 0.2), rgba(175, 56, 90, 0.2))',
          boxShadow: '0 0 25px rgba(233, 69, 96, 0.2), inset 0 0 12px rgba(255, 255, 255, 0.1)'
        }}
      />

      {/* Small prismatic elements */}
      <div 
        className="absolute top-2/3 left-1/6 w-8 h-8 glass animate-float"
        style={{ 
          animationDelay: '1s',
          clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
          background: 'linear-gradient(135deg, rgba(175, 56, 90, 0.3), transparent)',
          boxShadow: '0 0 20px rgba(175, 56, 90, 0.3)'
        }}
      />

      <div 
        className="absolute top-1/3 left-2/3 w-10 h-10 glass animate-float"
        style={{ 
          animationDelay: '5s',
          clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',
          background: 'linear-gradient(135deg, rgba(0, 212, 255, 0.3), transparent)',
          boxShadow: '0 0 20px rgba(0, 212, 255, 0.3)'
        }}
      />

      {/* Rotating ring elements */}
      <div 
        className="absolute top-1/5 left-1/2 w-24 h-24 animate-rotate-slow"
        style={{ animationDelay: '0s' }}
      >
        <div 
          className="w-full h-full rounded-full border-2 border-opacity-30"
          style={{ 
            borderColor: 'rgba(0, 212, 255, 0.3)',
            borderStyle: 'dashed',
            boxShadow: '0 0 30px rgba(0, 212, 255, 0.2)'
          }}
        />
      </div>

      <div 
        className="absolute bottom-1/5 right-1/2 w-18 h-18 animate-rotate-slow"
        style={{ animationDelay: '3s', animationDirection: 'reverse' }}
      >
        <div 
          className="w-full h-full rounded-full border-2 border-opacity-30"
          style={{ 
            borderColor: 'rgba(233, 69, 96, 0.3)',
            borderStyle: 'dotted',
            boxShadow: '0 0 25px rgba(233, 69, 96, 0.2)'
          }}
        />
      </div>
    </div>
  );
}
