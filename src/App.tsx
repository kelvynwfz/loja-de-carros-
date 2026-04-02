import React, { useState, useEffect } from 'react';
import { 
  MessageCircle, 
  ChevronRight, 
  ChevronDown,
  ShieldCheck, 
  Zap, 
  Clock, 
  Star, 
  CheckCircle2, 
  Fuel, 
  Gauge, 
  Settings2, 
  Calendar,
  ArrowRight,
  Menu,
  X,
  Phone
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Types ---
interface Vehicle {
  id: string;
  name: string;
  year: string;
  km: string;
  transmission: string;
  fuel: string;
  price: string;
  image: string;
  description: string;
  categories: string[];
  badge?: string;
  isNew?: boolean;
  isMostWanted?: boolean;
}

// --- Constants ---
const WHATSAPP_NUMBER = "5582991068093"; // Updated with user provided number
const DEFAULT_MESSAGE = "Olá! Vim pelo site e quero saber mais sobre os veículos disponíveis.";

const VEHICLES: Vehicle[] = [
  // LUXO
  {
    id: 'l1',
    name: 'Honda Civic Touring',
    year: '2022',
    km: '12.000 km',
    transmission: 'CVT',
    fuel: 'Gasolina',
    price: 'R$ 164.900',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/2022_Honda_Civic_Touring,_rear_6.28.22.jpg',
    description: 'Sedan sofisticado, completo e ideal para quem busca presença e conforto.',
    categories: ['Luxo', 'Sedan'],
    badge: 'Destaque'
  },
  {
    id: 'l2',
    name: 'Toyota Corolla Altis',
    year: '2023',
    km: '5.000 km',
    transmission: 'CVT',
    fuel: 'Híbrido',
    price: 'R$ 182.000',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/2023_Toyota_Corolla_Altis_1.6_G.jpg',
    description: 'Um dos sedans mais confiáveis e desejados do mercado.',
    categories: ['Luxo', 'Sedan'],
    isMostWanted: true
  },
  {
    id: 'l3',
    name: 'Jeep Compass Longitude',
    year: '2022',
    km: '20.000 km',
    transmission: 'Automático',
    fuel: 'Flex',
    price: 'R$ 158.000',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Jeep_Compass_S_2022.jpg',
    description: 'SUV imponente, confortável e perfeito para quem busca mais presença.',
    categories: ['Luxo', 'SUV'],
    badge: 'Oportunidade'
  },
  // CASUAL
  {
    id: 'c1',
    name: 'Fiat Argo Drive',
    year: '2022',
    km: '25.000 km',
    transmission: 'Manual',
    fuel: 'Flex',
    price: 'R$ 72.000',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/2022_Fiat_Argo_1.3_Drive_ELX.jpg',
    description: 'Ótima opção para quem busca economia, conforto e visual moderno no dia a dia.',
    categories: ['Casual', 'Hatch'],
    isNew: true
  },
  {
    id: 'c2',
    name: 'Chevrolet Onix LTZ',
    year: '2021',
    km: '35.000 km',
    transmission: 'Automático',
    fuel: 'Flex',
    price: 'R$ 79.900',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Chevrolet_Onix_1.0T_Premier_2020_(Brazil).jpg',
    description: 'Hatch moderno, econômico e excelente para uso urbano.',
    categories: ['Casual', 'Hatch'],
    badge: 'Baixa KM'
  },
  // SUV
  {
    id: 's1',
    name: 'Jeep Renegade Sport',
    year: '2021',
    km: '40.000 km',
    transmission: 'Automático',
    fuel: 'Flex',
    price: 'R$ 98.000',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Jeep_Renegade_Sport_2021.jpg',
    description: 'SUV robusto e versátil, ideal para aventuras urbanas e viagens.',
    categories: ['SUV'],
    badge: 'Oferta'
  },
  {
    id: 's2',
    name: 'Hyundai Creta Ultimate',
    year: '2023',
    km: '8.000 km',
    transmission: 'Automático',
    fuel: 'Flex',
    price: 'R$ 165.000',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/2022_Hyundai_Creta.jpg',
    description: 'SUV moderno com tecnologia de ponta e conforto excepcional.',
    categories: ['SUV'],
    isNew: true
  },
  // SEDAN
  {
    id: 'sd1',
    name: 'Honda City EXL',
    year: '2022',
    km: '15.000 km',
    transmission: 'CVT',
    fuel: 'Flex',
    price: 'R$ 112.000',
    image: 'https://images.unsplash.com/photo-1592198084033-aade902d1aae?q=80&w=1000&auto=format&fit=crop',
    description: 'Sedan compacto com excelente espaço interno e economia de combustível.',
    categories: ['Sedan'],
    badge: 'Recém-chegado'
  },
  // ECONÔMICOS
  {
    id: 'e1',
    name: 'Renault Kwid Zen',
    year: '2021',
    km: '30.000 km',
    transmission: 'Manual',
    fuel: 'Flex',
    price: 'R$ 48.000',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Renault_Kwid_1.0_Zen_(2022)_(52721423597).jpg',
    description: 'O SUV dos compactos, econômico e prático para a cidade.',
    categories: ['Econômicos', 'Casual'],
    badge: 'Entrada Facilitada'
  },
  {
    id: 'e2',
    name: 'Fiat Mobi Like',
    year: '2022',
    km: '18.000 km',
    transmission: 'Manual',
    fuel: 'Flex',
    price: 'R$ 55.000',
    image: 'https://images.unsplash.com/photo-1609521263047-f8f205293f24?q=80&w=1000&auto=format&fit=crop',
    description: 'Compacto, ágil e perfeito para quem busca praticidade no trânsito.',
    categories: ['Econômicos', 'Hatch'],
    badge: 'Aceita Troca'
  },
  // ESPORTIVOS
  {
    id: 'sp1',
    name: 'Volkswagen Jetta GLI',
    year: '2022',
    km: '10.000 km',
    transmission: 'DSG',
    fuel: 'Gasolina',
    price: 'R$ 215.000',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/2022_Volkswagen_Jetta_GLI.jpg',
    description: 'Sedan esportivo com performance impressionante e luxo interior.',
    categories: ['Esportivos', 'Luxo'],
    isMostWanted: true
  },
  {
    id: 'sp2',
    name: 'BMW 320i M Sport',
    year: '2023',
    km: '3.000 km',
    transmission: 'Automático',
    fuel: 'Flex',
    price: 'R$ 320.000',
    image: 'https://images.unsplash.com/photo-1556185781-a47769abb7ee?q=80&w=1000&auto=format&fit=crop',
    description: 'O puro prazer de dirigir com sofisticação e tecnologia alemã.',
    categories: ['Esportivos', 'Luxo'],
    isNew: true
  },
  // UTILITÁRIOS
  {
    id: 'u1',
    name: 'Fiat Strada Freedom',
    year: '2022',
    km: '22.000 km',
    transmission: 'Manual',
    fuel: 'Flex',
    price: 'R$ 95.000',
    image: 'https://images.unsplash.com/photo-1621236304195-06bb1d5f48ae?q=80&w=1000&auto=format&fit=crop',
    description: 'Versátil, resistente e ideal para trabalho ou uso diário.',
    categories: ['Utilitários'],
    badge: 'Oportunidade'
  },
  {
    id: 'u2',
    name: 'Volkswagen Saveiro Trend',
    year: '2021',
    km: '45.000 km',
    transmission: 'Manual',
    fuel: 'Flex',
    price: 'R$ 78.000',
    image: 'https://images.unsplash.com/photo-1619767886558-efdc259cde1a?q=80&w=1000&auto=format&fit=crop',
    description: 'Picape compacta robusta e confiável para qualquer desafio.',
    categories: ['Utilitários'],
    badge: 'Baixa KM'
  },
  // MOTO
  {
    id: 'm1',
    name: 'Honda CG 160 Titan',
    year: '2023',
    km: '1.500 km',
    transmission: 'Manual',
    fuel: 'Flex',
    price: 'R$ 18.500',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/2024_Honda_CG_160_Titan.jpg',
    description: 'Moto prática, econômico e muito procurada no dia a dia.',
    categories: ['Moto'],
    isNew: true
  },
  {
    id: 'm2',
    name: 'Yamaha Fazer 250',
    year: '2022',
    km: '5.000 km',
    transmission: 'Manual',
    fuel: 'Flex',
    price: 'R$ 22.000',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Yamaha_FZ25_2022.jpg',
    description: 'Mais desempenho, conforto e estilo para rodar com confiança.',
    categories: ['Moto'],
    badge: 'Destaque'
  },
  {
    id: 'm3',
    name: 'BMW G 310 GS',
    year: '2022',
    km: '4.000 km',
    transmission: 'Manual',
    fuel: 'Gasolina',
    price: 'R$ 35.000',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/BMW_G310_GS_front_2023-04.jpg',
    description: 'A porta de entrada para o mundo aventureiro da BMW Motorrad.',
    categories: ['Moto', 'Luxo'],
    isMostWanted: true
  }
];

// --- Components ---

const WhatsAppLink = ({ message, children, className }: { message: string, children: React.ReactNode, className?: string }) => {
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
    </a>
  );
};

const VehicleCard = ({ vehicle }: { vehicle: Vehicle; key?: string }) => {
  const message = `Olá! Vim pelo site e tenho interesse no ${vehicle.name} ${vehicle.year}. Ele ainda está disponível?`;
  
  return (
    <motion.div 
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className="group relative bg-premium-graphite rounded-2xl overflow-hidden border border-white/5 hover:border-premium-gold/30 transition-all duration-500 flex flex-col"
    >
      {/* Badges */}
      <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
        {vehicle.badge && (
          <span className="bg-premium-gold text-black text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-lg">
            {vehicle.badge}
          </span>
        )}
        {vehicle.isNew && (
          <span className="bg-premium-blue text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-lg">
            Recém Chegado
          </span>
        )}
        {vehicle.isMostWanted && (
          <span className="bg-white text-black text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-lg">
            Mais Procurado
          </span>
        )}
      </div>

      {/* Image Container */}
      <div className="relative h-64 overflow-hidden">
        <img 
          src={vehicle.image} 
          alt={vehicle.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-premium-graphite via-transparent to-transparent opacity-60" />
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="mb-4">
          <h3 className="text-2xl font-bold text-white group-hover:text-premium-gold transition-colors leading-tight">{vehicle.name}</h3>
        </div>

        {/* Specs Grid */}
        <div className="grid grid-cols-2 gap-y-3 gap-x-4 mb-4">
          <div className="flex items-center gap-2 text-slate-400">
            <Calendar size={14} className="text-premium-gold" />
            <span className="text-xs font-medium">{vehicle.year}</span>
          </div>
          <div className="flex items-center gap-2 text-slate-400">
            <Gauge size={14} className="text-premium-gold" />
            <span className="text-xs font-medium">{vehicle.km}</span>
          </div>
          <div className="flex items-center gap-2 text-slate-400">
            <Settings2 size={14} className="text-premium-gold" />
            <span className="text-xs font-medium">{vehicle.transmission}</span>
          </div>
          <div className="flex items-center gap-2 text-slate-400">
            <Fuel size={14} className="text-premium-gold" />
            <span className="text-xs font-medium">{vehicle.fuel}</span>
          </div>
        </div>

        {/* Short Description */}
        <p className="text-slate-400 text-sm italic mb-6 line-clamp-2 leading-relaxed">
          “{vehicle.description}”
        </p>

        {/* Price */}
        <div className="mt-auto mb-6">
          <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">Valor</p>
          <p className="text-2xl font-black text-white tracking-tight">{vehicle.price}</p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col gap-2">
          <WhatsAppLink 
            message={message}
            className="w-full bg-white text-black font-bold py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-premium-gold transition-all duration-300 transform group-hover:translate-y-[-2px]"
          >
            Ver Detalhes
          </WhatsAppLink>
          <WhatsAppLink 
            message={message}
            className="w-full bg-transparent border border-white/10 text-white font-medium py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-white/5 transition-colors text-sm"
          >
            <MessageCircle size={16} className="text-premium-gold" />
            Falar no WhatsApp
          </WhatsAppLink>
        </div>
      </div>
    </motion.div>
  );
};

const SmartCatalog = () => {
  const categories = ['Todos', 'Luxo', 'Casual', 'Moto', 'SUV', 'Sedan', 'Hatch', 'Econômicos', 'Esportivos', 'Utilitários'];
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [isOpen, setIsOpen] = useState(false);

  const filteredVehicles = activeCategory === 'Todos' 
    ? VEHICLES 
    : VEHICLES.filter(v => v.categories.includes(activeCategory));

  return (
    <section id="estoque" className="py-24 bg-premium-black">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-premium-gold font-bold tracking-[0.2em] uppercase text-xs mb-4 block">Estoque Inteligente</span>
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-12">CATÁLOGO COMPLETO</h2>
          
          {/* Category Filter Dropdown Bar */}
          <div className="relative max-w-xs mx-auto z-30">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="w-full bg-premium-graphite border border-white/10 px-6 py-4 rounded-2xl flex items-center justify-between text-white font-bold hover:border-premium-gold/50 transition-all shadow-xl"
            >
              <div className="flex flex-col items-start">
                <span className="text-[10px] text-premium-gold uppercase tracking-widest mb-1">Categoria</span>
                <span className="text-lg">{activeCategory}</span>
              </div>
              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDown className="text-premium-gold" size={24} />
              </motion.div>
            </button>

            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute top-full left-0 w-full mt-3 bg-premium-graphite border border-white/10 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-xl"
                >
                  <div className="max-h-80 overflow-y-auto no-scrollbar py-2">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => {
                          setActiveCategory(cat);
                          setIsOpen(false);
                        }}
                        className={`w-full px-6 py-4 text-left font-bold transition-colors flex items-center justify-between ${
                          activeCategory === cat 
                            ? 'bg-premium-gold text-black' 
                            : 'text-slate-300 hover:bg-white/5 hover:text-white'
                        }`}
                      >
                        {cat}
                        {activeCategory === cat && <CheckCircle2 size={18} />}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredVehicles.map((vehicle) => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} />
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredVehicles.length === 0 && (
          <div className="text-center py-20">
            <p className="text-slate-500 text-lg italic">Nenhum veículo encontrado nesta categoria no momento.</p>
            <button 
              onClick={() => setActiveCategory('Todos')}
              className="mt-4 text-premium-gold font-bold hover:underline"
            >
              Ver todos os veículos
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen">
      {/* --- Navbar --- */}
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-premium-black/90 backdrop-blur-md py-4 border-b border-white/5' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img 
              src="https://i.pinimg.com/1200x/c8/c4/5c/c8c45c2a95a3b46dc54e32736b34210b.jpg" 
              alt="Elite Motors Logo" 
              className="h-10 w-auto object-contain rounded-md"
              referrerPolicy="no-referrer"
            />
            <span className="text-2xl font-black tracking-tighter text-white uppercase hidden sm:block">Elite<span className="text-premium-gold">Motors</span></span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#estoque" className="text-sm font-medium hover:text-premium-gold transition-colors">Estoque</a>
            <a href="#sobre" className="text-sm font-medium hover:text-premium-gold transition-colors">Sobre Nós</a>
            <a href="#depoimentos" className="text-sm font-medium hover:text-premium-gold transition-colors">Depoimentos</a>
            <WhatsAppLink message={DEFAULT_MESSAGE} className="bg-premium-gold text-black px-6 py-2.5 rounded-full font-bold text-sm hover:scale-105 transition-transform flex items-center gap-2">
              <MessageCircle size={18} />
              WhatsApp
            </WhatsAppLink>
          </div>

          {/* Mobile Toggle */}
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden text-white">
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 z-40 bg-premium-black flex flex-col items-center justify-center gap-8 md:hidden"
          >
            <a href="#estoque" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-bold">Estoque</a>
            <a href="#sobre" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-bold">Sobre Nós</a>
            <a href="#depoimentos" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-bold">Depoimentos</a>
            <WhatsAppLink message={DEFAULT_MESSAGE} className="bg-premium-gold text-black px-10 py-4 rounded-full font-bold text-lg flex items-center gap-2">
              <MessageCircle size={24} />
              Falar Agora
            </WhatsAppLink>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- Hero Section --- */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Cinematic Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=2000&auto=format&fit=crop" 
            alt="Hero Car" 
            className="w-full h-full object-cover scale-105 animate-slow-zoom"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 cinematic-overlay" />
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block bg-white/10 backdrop-blur-sm border border-white/20 text-premium-gold text-xs font-bold tracking-[0.3em] uppercase px-4 py-2 rounded-full mb-6">
              Exclusividade & Performance
            </span>
            <h1 className="text-5xl md:text-8xl font-black text-white mb-6 leading-tight tracking-tighter">
              SEU PRÓXIMO CARRO <br />
              <span className="text-gradient-gold">COMEÇA AQUI.</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto mb-10 font-light leading-relaxed">
              Encontre veículos com apresentação premium, atendimento rápido e negociação direta no WhatsApp. Oportunidades selecionadas para quem sabe o que quer.
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-4">
              <WhatsAppLink 
                message={DEFAULT_MESSAGE}
                className="w-full md:w-auto bg-premium-gold text-black px-10 py-5 rounded-2xl font-black text-lg flex items-center justify-center gap-3 hover:scale-105 transition-transform shadow-[0_0_30px_rgba(212,175,55,0.3)]"
              >
                <MessageCircle size={24} />
                QUERO FALAR NO WHATSAPP
              </WhatsAppLink>
              <a 
                href="#estoque"
                className="w-full md:w-auto bg-white/5 backdrop-blur-md border border-white/10 text-white px-10 py-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 hover:bg-white/10 transition-colors"
              >
                VER VEÍCULOS
                <ArrowRight size={20} />
              </a>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/30"
        >
          <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center p-1">
            <div className="w-1 h-2 bg-premium-gold rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* --- Trust Bar --- */}
      <section className="bg-premium-graphite py-10 border-y border-white/5">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="flex items-center gap-4 justify-center md:justify-start">
              <div className="text-premium-gold"><ShieldCheck size={32} /></div>
              <div>
                <p className="text-white font-bold text-sm">Veículos Selecionados</p>
                <p className="text-slate-500 text-xs">Procedência garantida</p>
              </div>
            </div>
            <div className="flex items-center gap-4 justify-center md:justify-start">
              <div className="text-premium-gold"><Zap size={32} /></div>
              <div>
                <p className="text-white font-bold text-sm">Atendimento Rápido</p>
                <p className="text-slate-500 text-xs">Direto no WhatsApp</p>
              </div>
            </div>
            <div className="flex items-center gap-4 justify-center md:justify-start">
              <div className="text-premium-gold"><Clock size={32} /></div>
              <div>
                <p className="text-white font-bold text-sm">Oportunidades</p>
                <p className="text-slate-500 text-xs">Estoque atualizado</p>
              </div>
            </div>
            <div className="flex items-center gap-4 justify-center md:justify-start">
              <div className="text-premium-gold"><Star size={32} /></div>
              <div>
                <p className="text-white font-bold text-sm">Compra Prática</p>
                <p className="text-slate-500 text-xs">Sem burocracia</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Smart Catalog --- */}
      <SmartCatalog />

      {/* --- Why Buy With Us --- */}
      <section id="sobre" className="py-24 bg-premium-graphite relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tighter">POR QUE COMPRAR <br />NA ELITE MOTORS?</h2>
              <div className="space-y-8">
                <div className="flex gap-6">
                  <div className="w-14 h-14 bg-premium-gold/10 border border-premium-gold/20 rounded-2xl flex items-center justify-center shrink-0">
                    <CheckCircle2 className="text-premium-gold" size={28} />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white mb-2">Transparência Total</h4>
                    <p className="text-slate-400 leading-relaxed">Cada veículo em nosso estoque passa por uma rigorosa inspeção técnica e estética antes de ser anunciado.</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="w-14 h-14 bg-premium-gold/10 border border-premium-gold/20 rounded-2xl flex items-center justify-center shrink-0">
                    <MessageCircle className="text-premium-gold" size={28} />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white mb-2">Atendimento Personalizado</h4>
                    <p className="text-slate-400 leading-relaxed">Nossa equipe está pronta para tirar todas as suas dúvidas em tempo real via WhatsApp, com fotos e vídeos detalhados.</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="w-14 h-14 bg-premium-gold/10 border border-premium-gold/20 rounded-2xl flex items-center justify-center shrink-0">
                    <Zap className="text-premium-gold" size={28} />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white mb-2">Negociação Ágil</h4>
                    <p className="text-slate-400 leading-relaxed">Processo de compra simplificado, focado em reduzir a burocracia e acelerar a entrega do seu novo veículo.</p>
                  </div>
                </div>
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-square rounded-3xl overflow-hidden border border-white/10">
                <img 
                  src="https://i.pinimg.com/736x/aa/a1/10/aaa11004a093801a4487fdf0e2e9eb2b.jpg" 
                  alt="Showroom" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              {/* Floating Stat Card */}
              <div className="absolute -bottom-8 -left-8 glass-card p-8 rounded-2xl hidden md:block">
                <p className="text-4xl font-black text-premium-gold mb-1">500+</p>
                <p className="text-sm font-bold text-white uppercase tracking-widest">Clientes Satisfeitos</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- Visual Impact Section --- */}
      <section className="relative py-32 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=2000&auto=format&fit=crop" 
            alt="Impact Background" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-premium-black/80 backdrop-blur-[2px]" />
        </div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-7xl font-black text-white mb-8 tracking-tighter italic">
              "DIRIJA ALGO À ALTURA <br />DA SUA PRESENÇA."
            </h2>
            <p className="text-premium-gold font-bold tracking-[0.3em] uppercase">O carro certo muda tudo.</p>
          </motion.div>
        </div>
      </section>

      {/* --- How It Works --- */}
      <section className="py-24 bg-premium-black">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tighter">COMO FUNCIONA</h2>
            <p className="text-slate-400 max-w-xl mx-auto">Processo simples e transparente para você conquistar seu novo carro.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { step: '01', title: 'Escolha o Veículo', desc: 'Navegue pelo nosso estoque e encontre o carro que combina com seu estilo.' },
              { step: '02', title: 'Chame no WhatsApp', desc: 'Tire dúvidas, peça vídeos detalhados e consulte condições especiais.' },
              { step: '03', title: 'Feche Negócio', desc: 'Receba todo o suporte necessário para finalizar a compra com segurança.' }
            ].map((item, idx) => (
              <div key={idx} className="relative group">
                <div className="text-8xl font-black text-white/5 absolute -top-10 -left-4 group-hover:text-premium-gold/10 transition-colors">{item.step}</div>
                <div className="relative z-10">
                  <h4 className="text-2xl font-bold text-white mb-4">{item.title}</h4>
                  <p className="text-slate-400 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Testimonials --- */}
      <section id="depoimentos" className="py-24 bg-premium-graphite">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tighter">O QUE DIZEM NOSSOS CLIENTES</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Ricardo S.', text: 'Atendimento impecável. O carro estava exatamente como nas fotos e o processo foi muito rápido pelo WhatsApp.', rating: 5 },
              { name: 'Mariana L.', text: 'Melhor experiência de compra que já tive. Transparência total e suporte em cada etapa da negociação.', rating: 5 },
              { name: 'Felipe M.', text: 'Elite Motors é referência. Carros selecionados e atendimento de alto padrão. Recomendo fortemente.', rating: 5 }
            ].map((item, idx) => (
              <div key={idx} className="bg-premium-black p-8 rounded-3xl border border-white/5 hover:border-premium-gold/20 transition-all">
                <div className="flex gap-1 mb-6">
                  {[...Array(item.rating)].map((_, i) => <Star key={i} size={16} className="text-premium-gold fill-premium-gold" />)}
                </div>
                <p className="text-slate-300 italic mb-6 leading-relaxed">"{item.text}"</p>
                <p className="text-white font-bold">{item.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Final CTA --- */}
      <section className="py-24 bg-premium-black relative overflow-hidden">
        {/* Background Accent */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-premium-gold/5 blur-[120px] rounded-full" />
        
        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-7xl font-black text-white mb-8 tracking-tighter">
              SEU PRÓXIMO CARRO ESTÁ A <br />
              <span className="text-gradient-gold">UMA MENSAGEM DE DISTÂNCIA.</span>
            </h2>
            <p className="text-slate-400 text-lg mb-12 max-w-2xl mx-auto">
              As melhores oportunidades não ficam muito tempo disponíveis. Fale agora para consultar disponibilidade, valor e detalhes exclusivos.
            </p>
            <WhatsAppLink 
              message={DEFAULT_MESSAGE}
              className="inline-flex bg-premium-gold text-black px-12 py-6 rounded-2xl font-black text-xl items-center gap-3 hover:scale-105 transition-transform shadow-[0_0_50px_rgba(212,175,55,0.2)]"
            >
              <MessageCircle size={28} />
              FALAR NO WHATSAPP AGORA
            </WhatsAppLink>
          </motion.div>
        </div>
      </section>

      {/* --- Footer --- */}
      <footer className="bg-premium-black py-12 border-t border-white/5">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-3">
              <img 
                src="https://i.pinimg.com/1200x/c8/c4/5c/c8c45c2a95a3b46dc54e32736b34210b.jpg" 
                alt="Elite Motors Logo" 
                className="h-8 w-auto object-contain rounded"
                referrerPolicy="no-referrer"
              />
              <span className="text-xl font-black tracking-tighter text-white uppercase">Elite<span className="text-premium-gold">Motors</span></span>
            </div>
            <div className="flex gap-8 text-slate-500 text-sm">
              <a href="#" className="hover:text-white transition-colors">Privacidade</a>
              <a href="#" className="hover:text-white transition-colors">Termos</a>
              <a href="#" className="hover:text-white transition-colors">Cookies</a>
            </div>
            <p className="text-slate-600 text-xs">© 2024 Elite Motors. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>

      {/* --- Floating WhatsApp Button --- */}
      <WhatsAppLink 
        message={DEFAULT_MESSAGE}
        className="fixed bottom-6 right-6 z-50 bg-whatsapp text-white w-16 h-16 rounded-full flex items-center justify-center shadow-[0_10px_30px_rgba(37,211,102,0.4)] hover:scale-110 transition-transform group"
      >
        <MessageCircle size={32} />
        <span className="absolute right-full mr-4 bg-white text-black px-4 py-2 rounded-lg text-sm font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl">
          Fale conosco agora!
        </span>
      </WhatsAppLink>
    </div>
  );
}
