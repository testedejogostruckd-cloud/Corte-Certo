import { Scissors, User, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const services = [
  {
    id: "corte",
    title: "Corte de Cabelo",
    price: "R$ 50",
    description: "Corte clássico ou moderno, lavagem e finalização com produtos premium.",
    icon: Scissors,
  },
  {
    id: "barba",
    title: "Barba Profissional",
    price: "R$ 30",
    description: "Modelagem, toalha quente, esfoliação e hidratação da pele.",
    icon: User,
  },
  {
    id: "completo",
    title: "Combo Completo",
    price: "R$ 70",
    description: "A experiência total. Corte, barba e sobrancelha com desconto especial.",
    icon: Sparkles,
  },
];

export function Services() {
  return (
    <section className="py-24 bg-secondary/30 relative">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Nossos <span className="text-primary">Serviços</span></h2>
          <p className="text-muted-foreground text-lg">Excelência em cada detalhe</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-card hover:bg-card/80 border border-border/50 rounded-2xl p-8 transition-all hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/5 hover:border-primary/20 group"
            >
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                <service.icon className="w-8 h-8 text-primary group-hover:text-primary-foreground transition-colors" />
              </div>
              <h3 className="text-2xl font-bold mb-2">{service.title}</h3>
              <p className="text-3xl font-display font-bold text-primary mb-4">{service.price}</p>
              <p className="text-muted-foreground leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
