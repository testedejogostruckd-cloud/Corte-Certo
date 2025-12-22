import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export function Hero({ onBookClick }: { onBookClick: () => void }) {
  return (
    <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent z-10" />
        {/* Modern barbershop interior dark theme */}
        <img
          src="https://images.unsplash.com/photo-1585747860715-2ba37e788b70?q=80&w=2074&auto=format&fit=crop"
          alt="Barbershop Interior"
          className="w-full h-full object-cover opacity-50"
        />
      </div>

      <div className="container relative z-20 px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block py-1 px-3 rounded-full bg-primary/20 text-primary border border-primary/30 text-sm font-semibold mb-6 tracking-wider uppercase">
            Desde 2015
          </span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-white mb-6 leading-tight">
            Barbearia <span className="text-primary">Estilo</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-10 font-light">
            Onde a tradição encontra o moderno. Seu estilo é a nossa paixão.
            Cortes clássicos, barbas perfeitas e uma experiência premium.
          </p>
          <button
            onClick={onBookClick}
            className="group relative inline-flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground text-lg font-bold rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_0_40px_-10px_rgba(234,179,8,0.5)]"
          >
            <span className="relative z-10">Agendar Agora</span>
            <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
