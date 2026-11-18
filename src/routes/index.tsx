import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Activity, ArrowRight, BatteryCharging, Bike, BookOpen, Check, CheckCircle2, ChevronDown, CircleHelp, ClipboardCheck, Gauge, GraduationCap, Laptop, LockKeyhole, Menu, MonitorPlay, PlayCircle, Search, ShieldCheck, Smartphone, Wrench, X, Zap, Settings2, Cable, Cpu, Disc3, FileText, Megaphone, Users, GaugeCircle, Layers3 } from "lucide-react";

export const Route = createFileRoute("/")({ component: SalesPage });

/** Configure os três links apenas depois de preparar a entrega ou indicar pré-venda. */
export const CHECKOUT_BASICO = "";
export const CHECKOUT_COMPLETO = "";
export const CHECKOUT_UPSELL_COMPLETO = "";

type Offer = "basico" | "completo" | "upsell";
const checkoutUrls: Record<Offer,string> = { basico: CHECKOUT_BASICO, completo: CHECKOUT_COMPLETO, upsell: CHECKOUT_UPSELL_COMPLETO };

function captureInitiateCheckout(offer: Offer) {
  if (typeof window === "undefined") return;
  const detail = { event: "InitiateCheckout", offer, product: "Mecanico de Eletricos 2.0", value: offer === "basico" ? 19.9 : offer === "upsell" ? 26.9 : 37.9, currency: "BRL" };
  // Integrações Meta/TrackUp podem ouvir este evento, sem gerar compras falsas.
  window.dispatchEvent(new CustomEvent("trackup:initiate_checkout", { detail }));
  window.dispatchEvent(new CustomEvent("checkout:initiated", { detail }));
  const w = window as Window & { fbq?: (...args: unknown[]) => void; dataLayer?: Record<string, unknown>[] };
  if (typeof w.fbq === "function") w.fbq("track", "InitiateCheckout", { content_name: detail.product, content_category: offer, value: detail.value, currency: "BRL" });
  if (Array.isArray(w.dataLayer)) w.dataLayer.push({ event: "begin_checkout", ecommerce: { currency: "BRL", value: detail.value, items: [{ item_name: detail.product, item_variant: offer, price: detail.value, quantity: 1 }] } });
}
function goCheckout(offer: Offer) {
  const url = checkoutUrls[offer];
  if (!url) return false;
  captureInitiateCheckout(offer);
  const dest = new URL(url, window.location.href);
  const params = new URLSearchParams(window.location.search);
  ["utm_source","utm_medium","utm_campaign","utm_content","utm_term","fbclid","fbc","fbp","src","sck"].forEach(k => { if (params.has(k) && !dest.searchParams.has(k)) dest.searchParams.set(k,params.get(k)!); });
  window.location.assign(dest.toString());
  return true;
}
const modules = [
  {name:"Introdução aos Veículos Elétricos", desc:"Tipos de veículos e funcionamento.",Icon:Bike},
  {name:"Elétrica do Zero",desc:"Tensão, corrente, potência e resistência.",Icon:Zap},
  {name:"Ferramentas e Multímetro",desc:"Ferramentas e medições seguras.",Icon:Gauge},
  {name:"Motores Elétricos",desc:"Motores, sensores e funcionamento.",Icon:Disc3},
  {name:"Controladoras",desc:"Componentes, conectores e sinais.",Icon:Cpu},
  {name:"Baterias e Carregadores",desc:"Funcionamento, conservação e segurança.",Icon:BatteryCharging},
  {name:"Aceleradores, Freios e Sensores",desc:"Identificação e funcionamento.",Icon:Cable},
  {name:"Manutenção de Bikes Elétricas",desc:"Inspeção e problemas comuns.",Icon:Wrench},
  {name:"Scooters e Patinetes",desc:"Sistemas e manutenção básica.",Icon:GaugeCircle},
  {name:"Diagnóstico de Defeitos",desc:"Sintomas, possíveis causas e estudos de casos.",Icon:Search}
];
const bonuses = [
 {tag:"BÔNUS 01",title:"Manual Visual de 50 Defeitos",desc:"Fichas ilustradas para consultar sintomas, possíveis causas e inspeções.",Icon:FileText},
 {tag:"BÔNUS 02",title:"Kit Oficina de Elétricos",desc:"Ordem de serviço, ficha de entrada, checklist, orçamento e controle de clientes.",Icon:ClipboardCheck},
 {tag:"BÔNUS 03",title:"Primeiros Clientes na Oficina",desc:"Guia de divulgação e modelos de mensagens para WhatsApp.",Icon:Megaphone}
];
const faqs=[
 ["Preciso ter experiência?","Não. O conteúdo começa pelos fundamentos e é organizado para iniciantes."],
 ["O curso é presencial?","Não. O material é digital e pode ser acessado online."],
 ["Posso estudar pelo celular?","Sim. A página e o ambiente de aprendizagem são pensados para dispositivos móveis."],
 ["Qual a diferença entre os planos?","O Básico oferece apostilas e guias. O Completo acrescenta videoaulas, a central de consulta e três bônus exclusivos."],
 ["As aulas ensinam a consertar baterias de lítio internamente?","Não. Abordam funcionamento, conservação, identificação de problemas e segurança, sem procedimentos internos de alto risco."],
 ["Como recebo o acesso?","Pela forma de entrega definida na plataforma de pagamento, após a confirmação da compra."]
];
const baseFeatures=["10 apostilas técnicas ilustradas","Conteúdo dos 10 módulos em PDF","Guias de componentes e defeitos comuns","Material digital para consulta"];
const fullFeatures=["Tudo do Plano Básico","Cerca de 30 videoaulas planejadas","Central Diagnóstico Elétricos 2.0","Manual Visual de 50 Defeitos","Kit Oficina de Elétricos","Primeiros Clientes na Oficina"];
function SectionHead({eyebrow,title,sub}: {eyebrow?:string;title:string;sub?:string}) {return <div className="section-head">{eyebrow && <p className="eyebrow">{eyebrow}</p>}<h2>{title}</h2>{sub && <p>{sub}</p>}</div>;}
function YellowButton({children,onClick,className=""}:{children:React.ReactNode;onClick:()=>void;className?:string}) {return <button className={`yellow-btn ${className}`} onClick={onClick}>{children}<ArrowRight size={19} strokeWidth={3}/></button>;}
function HeroMockup(){
return <div className="hero-mockup" aria-label="Ilustração conceitual de formação em veículos elétricos e materiais digitais" role="img">
 <div className="mockup-halo"/>
 <div className="vehicle vehicle-bike"><Bike strokeWidth={1.3}/><span>BIKE ELÉTRICA</span></div>
 <div className="vehicle vehicle-scooter"><GaugeCircle strokeWidth={1.2}/><span>SCOOTER</span></div>
 <div className="vehicle vehicle-patinete"><Activity strokeWidth={1.4}/><span>PATINETE</span></div>
 <div className="mock-laptop"><div className="mock-screen"><div className="mock-screen-header"><Zap size={13} fill="#ffc400"/> MECÂNICO DE ELÉTRICOS 2.0</div><div className="mock-video"><Disc3 size={62} strokeWidth={1.2}/><PlayCircle size={36} fill="#ffc400" color="#102a43"/></div><small>Aulas e demonstrações técnicas</small></div><div className="mock-keyboard"/></div>
 <div className="mock-books"><div><Zap size={26} fill="#ffc400"/>MECÂNICO DE<br/>ELÉTRICOS 2.0 <small>APOSTILAS TÉCNICAS</small></div><div><Settings2 size={23}/> GUIAS ILUSTRADOS</div></div>
 <div className="mock-phone"><div className="phone-notch"/><b>Diagnóstico<br/><em>Elétricos 2.0</em></b><span><Search size={12}/> Consultar sintomas</span><span><Cpu size={12}/> Componentes</span><span><ClipboardCheck size={12}/> Possíveis causas</span></div>
 <small className="mockup-disclaimer">Imagem ilustrativa dos materiais em desenvolvimento</small>
 </div>;
}
function SalePageBody(){
 const [upsell,setUpsell]=useState(false);
 const [notice,setNotice]=useState("");
 useEffect(()=>{document.body.style.overflow=upsell?"hidden":"";return ()=>{document.body.style.overflow="";};},[upsell]);
 function proceed(type:Offer){ setUpsell(false); if(!goCheckout(type)){setNotice("Inscrições ainda não abertas. O acesso será liberado após a preparação dos materiais e a configuração do pagamento.");} }
 function basic(){setUpsell(true);}
 const scrollPlans=()=>document.getElementById("planos")?.scrollIntoView({behavior:"smooth",block:"start"});
 return <main>
 <div className="top-strip"><Zap size={18} fill="#ffc400" color="#ffc400"/> FORMAÇÃO ONLINE EM VEÍCULOS ELÉTRICOS</div>
 <section className="hero wrap">
  <div className="brand"><span className="brand-icon"><Zap size={25} fill="#ffc400"/></span><span>MECÂNICO DE<br/><strong>ELÉTRICOS <em>2.0</em></strong></span></div>
  <h1>Aprenda a Fazer Manutenção de <span>Bikes, Scooters e Patinetes Elétricos</span>, Mesmo Começando do Zero!</h1>
  <HeroMockup/>
  <p className="hero-sub">Domine os fundamentos dos <b>motores, baterias, controladoras e sistemas elétricos</b> com apostilas ilustradas, videoaulas práticas e materiais de apoio. Aprenda no seu ritmo e desenvolva uma nova habilidade profissional.</p>
  <div className="hero-points"><span><Layers3/> Do básico aos fundamentos avançados</span><span><Laptop/> 100% online</span><span><Smartphone/> Estude pelo celular</span><span><BookOpen/> Material ilustrado</span></div>
  <YellowButton onClick={scrollPlans} className="hero-cta">QUERO APRENDER MANUTENÇÃO DE ELÉTRICOS</YellowButton>
 </section>
 <section className="section light-section" id="modulos"><div className="wrap"><SectionHead eyebrow="CONTEÚDO DA FORMAÇÃO" title="Tudo o Que Você Precisa Para Começar a Entender os Veículos Elétricos" sub="Um treinamento organizado para quem deseja aprender como funcionam os principais sistemas e identificar os defeitos mais comuns."/><div className="module-grid">{modules.map(({name,desc,Icon},i)=><article className="module-card" key={name}><div className="module-art"><span className="module-number">{i+1}</span><Icon size={57} strokeWidth={1.5}/></div><div className="module-copy"><h3>{name}</h3><p>{desc}</p></div></article>)}</div></div></section>
 <section className="section wrap section-split"><div><SectionHead eyebrow="MATERIAL DIDÁTICO" title="Aprenda Com Apostilas Técnicas Que Mostram Cada Componente em Detalhes"/><p className="section-text">Você não precisa ficar tentando imaginar como funciona cada peça. Nosso material foi planejado para apresentar os sistemas de maneira visual, organizada e fácil de acompanhar.</p><div className="technical-pages"><div className="tech-page"><strong>MOTOR ELÉTRICO</strong><Disc3 size={80} strokeWidth={1}/><span>01 — rotor</span><span>02 — estator</span><span>03 — sensores</span></div><div className="tech-page"><strong>INSPEÇÃO TÉCNICA</strong><Cable size={75} strokeWidth={1.1}/><span>✓ Conectores</span><span>✓ Cabos</span><span>✓ Sinais</span></div></div><div className="mini-pill"><BookOpen size={18}/> 10 Apostilas Técnicas Ilustradas</div></div>
 <div><SectionHead eyebrow="AULAS ONLINE" title="Assista às Aulas e Aprenda no Seu Próprio Ritmo"/><div className="course-device"><MonitorPlay size={78}/><p>Plataforma de videoaulas</p><small>Representação ilustrativa · aulas em produção</small></div><ul className="check-list"><li>Cerca de 30 videoaulas planejadas</li><li>Explicações sobre componentes e sistemas</li><li>Demonstrações e exemplos práticos</li><li>Acesso pelo celular, tablet ou computador</li><li>Conteúdo organizado por módulos</li></ul><p className="exclusive-line">As videoaulas fazem parte do <b>Plano Completo.</b></p></div></section>
 <section className="section light-section"><div className="wrap"><SectionHead eyebrow="EXCLUSIVOS DO PLANO COMPLETO" title="No Plano Completo Você Ainda Recebe 3 Bônus Especiais!"/><div className="bonus-grid">{bonuses.map(({tag,title,desc,Icon})=><article className="bonus-card" key={tag}><div className="bonus-cover"><span>{tag}</span><Icon size={64} strokeWidth={1.2}/><b>{title}</b></div><h3>{title}</h3><p>{desc}</p></article>)}</div></div></section>
 <section className="section wrap app-section"><div><SectionHead eyebrow="CONSULTA DIGITAL" title="Uma Central de Consulta Para Ajudar Você a Identificar Defeitos"/><p className="section-text">Uma ferramenta de apoio para localizar informações organizadas por sintomas e componentes.</p><ul className="check-list"><li>Consulta de sintomas</li><li>Possíveis causas e orientações iniciais</li><li>Pesquisa organizada por componentes</li></ul><p className="safety-note"><ShieldCheck size={18}/> Material de apoio educacional. Não substitui diagnóstico presencial qualificado.</p><span className="mini-pill">Exclusivo do Plano Completo</span></div><div className="app-phone"><div className="phone-notch"/><Zap size={32} fill="#ffc400" color="#ffc400"/><h3>Diagnóstico<br/><span>Elétricos 2.0</span></h3><p><Search size={17}/> Consultar sintomas</p><p><Cpu size={17}/> Componentes</p><p><ClipboardCheck size={17}/> Possíveis causas</p><small>Prévia conceitual</small></div></section>
 <section className="section light-section"><div className="wrap"><SectionHead title="Para Quem É Esta Formação?"/><div className="audience-grid"><article><GraduationCap/><h3>Iniciantes</h3><p>Aprenda os fundamentos mesmo sem experiência.</p></article><article><Wrench/><h3>Mecânicos</h3><p>Amplie seus conhecimentos em veículos elétricos leves.</p></article><article><Bike/><h3>Donos de Bikes Elétricas</h3><p>Entenda melhor os sistemas do próprio veículo.</p></article><article><Users/><h3>Quem Busca uma Nova Habilidade</h3><p>Dê os primeiros passos em uma área técnica.</p></article></div></div></section>
 <section id="planos" className="section wrap pricing-section"><SectionHead eyebrow="PLANOS DA FORMAÇÃO" title="Escolha Como Você Quer Começar Hoje"/><div className="pricing-grid"><article className="plan-card"><h3>PLANO BÁSICO</h3><p className="price">R$ <strong>19,90</strong></p><span className="price-caption">Materiais digitais de estudo</span><ul className="check-list">{baseFeatures.map(f=><li key={f}>{f}</li>)}</ul><YellowButton onClick={basic}>QUERO O PLANO BÁSICO — R$ 19,90</YellowButton></article><article className="plan-card premium"><div className="popular">MAIS COMPLETO</div><h3>PLANO COMPLETO</h3><p className="price">R$ <strong>37,90</strong></p><span className="price-caption">Formação com materiais extras</span><ul className="check-list">{fullFeatures.map(f=><li key={f}>{f}</li>)}</ul><YellowButton onClick={()=>proceed("completo")}>QUERO ACESSO COMPLETO — R$ 37,90</YellowButton></article></div><p className="launch-note"><LockKeyhole size={16}/> Os materiais estão em produção. Checkouts permanecerão desativados até a disponibilização dos entregáveis ou comunicação transparente de pré-venda.</p></section>
 <section className="section light-section"><div className="wrap"><div className="guarantee"><ShieldCheck size={46}/><div><h2>Sua Compra Protegida</h2><p>A política de garantia e reembolso será informada conforme as condições efetivamente configuradas na plataforma de pagamento.</p></div></div><div className="faq"><SectionHead title="Dúvidas Frequentes"/>{faqs.map(([q,a])=><details key={q}><summary>{q}<ChevronDown size={17}/></summary><p>{a}</p></details>)}</div></div></section>
 <section className="final-cta"><div className="wrap"><Zap size={35} color="#ffc400"/><div><h2>Comece Hoje Sua Formação em Manutenção de Veículos Elétricos!</h2><p>Aprenda no seu ritmo com materiais visuais e conteúdos organizados para dar seus primeiros passos na manutenção de bikes, scooters e patinetes elétricos.</p></div><YellowButton onClick={scrollPlans}>QUERO COMEÇAR AGORA</YellowButton></div></section>
 <footer>© Mecânico de Elétricos 2.0 · Conteúdo educacional · Formação em preparação</footer>
 {notice && <div className="notice" role="status"><CircleHelp size={20}/><p>{notice}</p><button onClick={()=>setNotice("")} aria-label="Fechar aviso"><X size={20}/></button></div>}
 {upsell && <div className="modal-backdrop" onMouseDown={e=>{if(e.target===e.currentTarget)setUpsell(false)}}><div className="upsell-dialog" role="dialog" aria-modal="true" aria-labelledby="upsell-title"><button className="close-modal" onClick={()=>setUpsell(false)} aria-label="Fechar"><X size={20}/></button><span className="upsell-label"><Zap size={15}/> OPÇÃO ESPECIAL</span><h2 id="upsell-title">Espere! Leve o Kit Completo por um valor especial</h2><p className="upsell-price">R$ <strong>26,90</strong></p><p>Em vez de levar apenas as apostilas, escolha o <b>Plano Completo</b> com videoaulas, central de consulta e os três bônus exclusivos.</p><ul className="check-list"><li>Todos os 10 módulos em PDF</li><li>Cerca de 30 videoaulas planejadas</li><li>Central de consulta e 3 bônus</li></ul><YellowButton onClick={()=>proceed("upsell")}>SIM, QUERO O COMPLETO POR R$ 26,90</YellowButton><button className="decline" onClick={()=>proceed("basico")}>Não, quero somente o Básico por R$ 19,90</button></div></div>}
 </main>;
}
export default function SalesPage(){return <SalePageBody/>;}
