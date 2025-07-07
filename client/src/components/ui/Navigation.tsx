export default function Navigation() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 p-6">
      <div className="glass rounded-2xl px-6 py-4 max-w-4xl mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[hsl(348,83%,60%)] to-[hsl(280,50%,60%)] flex items-center justify-center">
              <span className="text-white font-bold">3D</span>
            </div>
            <h1 className="font-orbitron font-bold text-2xl text-white">Pokémon Explorer</h1>
          </div>
          <div className="flex items-center space-x-4">
            <button className="glass-dark rounded-lg px-4 py-2 text-white hover:bg-white hover:bg-opacity-20 transition-all">
              3D Mode
            </button>
            <button className="glass-dark rounded-lg px-4 py-2 text-white hover:bg-white hover:bg-opacity-20 transition-all">
              Settings
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
