import { Instagram, Facebook, MapPin, Phone, Clock } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-black text-white py-16 border-t border-white/10">
      <div className="container px-4 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          
          {/* Brand */}
          <div className="space-y-6">
            <h2 className="text-3xl font-display font-bold">
              Barbearia <span className="text-primary">Estilo</span>
            </h2>
            <p className="text-gray-400 max-w-sm">
              Mais do que um corte, uma experiência. Transformando visual e autoestima desde 2015.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary hover:text-black transition-all">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary hover:text-black transition-all">
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-primary">Contato</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-gray-400">
                <MapPin className="w-5 h-5 text-primary shrink-0" />
                <span>Av. Paulista, 1000 - Bela Vista<br />São Paulo - SP</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <span>(11) 99999-9999</span>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-primary">Horário</h3>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-gray-400">
                <Clock className="w-5 h-5 text-primary shrink-0" />
                <div className="flex flex-col">
                  <span>Seg - Sex: 09:00 - 20:00</span>
                  <span>Sáb: 09:00 - 18:00</span>
                  <span className="text-red-400 text-sm">Dom: Fechado</span>
                </div>
              </li>
            </ul>
          </div>

        </div>

        <div className="border-t border-white/10 mt-16 pt-8 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Barbearia Estilo. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
