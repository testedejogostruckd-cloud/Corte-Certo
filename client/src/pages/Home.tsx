import { useRef } from "react";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { BookingForm } from "@/components/BookingForm";
import { Footer } from "@/components/Footer";

export default function Home() {
  const bookingRef = useRef<HTMLDivElement>(null);

  const scrollToBooking = () => {
    bookingRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Hero onBookClick={scrollToBooking} />
      
      <div className="relative z-10 space-y-24 pb-24">
        <Services />
        
        <section ref={bookingRef} className="container px-4 mx-auto scroll-mt-24">
          <div className="text-center mb-12">
            <span className="text-primary font-bold uppercase tracking-widest text-sm">Online</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-2">Agende seu Horário</h2>
            <p className="text-muted-foreground mt-4 text-lg">
              Rápido, fácil e sem espera.
            </p>
          </div>
          <BookingForm />
        </section>
      </div>

      <Footer />
    </main>
  );
}
