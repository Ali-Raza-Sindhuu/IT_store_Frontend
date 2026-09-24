import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { ArrowRight, Camera, Gamepad2, Headphones, Laptop, MonitorSmartphone, ShieldCheck, Truck, Zap } from "lucide-react";
import SampleProduct from "./SampleProduct";
import { resolveImg } from "../utils/resolveImg";

const categories = [
  ["Smartphones", MonitorSmartphone, "phones"], ["Laptops", Laptop, "laptops"], ["Gaming", Gamepad2, "gaming"], ["Audio", Headphones, "audio"], ["Cameras", Camera, "cameras"],
];

export default function TechHome() {
  const products = useSelector((state) => state.products?.items || []);
  const lead = products[0];
  const picks = products.slice(0, 4);
  const latest = products.slice(4, 6).length ? products.slice(4, 6) : products.slice(0, 2);
  const image = resolveImg(lead?.image_url || lead?.images?.[0]);
  return <div className="tech-home">
    <section className="tech-hero page-x"><div className="page-inner tech-hero-grid">
      <div className="tech-hero-copy"><span className="tech-eyebrow"><Zap size={14}/> Technology, simplified</span><p className="tech-kicker">NEW SEASON / 2026</p><h1>Upgrade the way<br/>you <em>live.</em></h1><p className="tech-lead">Discover dependable tech, from everyday essentials to your next favourite device.</p><div className="tech-hero-actions"><Link to="/shops" className="tech-primary">Shop all products <ArrowRight size={17}/></Link><Link to="/about" className="tech-text-link">Explore IT Store</Link></div></div>
      <div className="tech-hero-product"><div className="tech-orb"/>{image ? <img src={image} alt={lead?.name || "Featured product"}/> : <MonitorSmartphone size={160}/>}<div className="tech-product-note"><span>Featured pick</span><strong>{lead?.name || "Power your day"}</strong></div></div><div className="tech-hero-side"><span>01 / 03</span><div/><p>Curated devices.<br/>Clear choices.</p></div>
    </div></section>
    <section className="tech-categories page-x"><div className="page-inner"><SectionTop kicker="SHOP BY TYPE" title="Find your next essential."/><div className="tech-category-grid">{categories.map(([label, Icon, query]) => <Link to={`/shops?category=${encodeURIComponent(query)}`} key={label} className="tech-category"><span><Icon size={25}/></span><b>{label}</b><ArrowRight size={15}/></Link>)}</div></div></section>
    <section className="tech-deals page-x"><div className="page-inner tech-deal-grid"><Deal dark icon={Gamepad2} kicker="GAME ON" title={<>Built for<br/>the next level.</>} to="/shops?category=gaming" label="Discover gaming"/><Deal icon={Headphones} kicker="HEAR EVERY DETAIL" title={<>Sound that<br/>moves with you.</>} to="/shops?category=audio" label="Shop audio"/></div></section>
    <section className="tech-products page-x"><div className="page-inner"><SectionTop kicker="TRENDING NOW" title="Popular with our customers."/><div className="tech-product-grid">{picks.map((p) => <SampleProduct key={p.id || p.slug} {...p}/>)}</div></div></section>
    <section className="tech-editorial page-x"><div className="page-inner tech-editorial-grid"><div className="tech-editorial-copy"><p className="tech-kicker">SMARTER SHOPPING</p><h2>Technology that earns a place in your everyday.</h2><p>Thoughtful products, clear pricing and helpful service from checkout to delivery.</p><Link to="/shipping-returns" className="tech-primary">How we help <ArrowRight size={17}/></Link></div><div className="tech-editorial-products">{latest.map((p) => <Link key={p.id || p.slug} to={`/shop/${p.slug}`}><img src={resolveImg(p.image_url || p.images?.[0])} alt=""/><span>{p.name}</span></Link>)}</div></div></section>
    <section className="tech-trust page-x"><div className="page-inner">{[[Truck,"Fast delivery","Delivered across Pakistan"],[ShieldCheck,"Secure shopping","Protected checkout"],[Zap,"Easy support","Here when you need us"]].map(([Icon,title,body]) => <div key={title}><Icon size={22}/><span><b>{title}</b><small>{body}</small></span></div>)}</div></section>
  </div>;
}

function SectionTop({ kicker, title }) { return <div className="tech-section-top"><div><p className="tech-kicker">{kicker}</p><h2>{title}</h2></div><Link to="/shops">View catalog <ArrowRight size={16}/></Link></div>; }
function Deal({ dark, icon: Icon, kicker, title, to, label }) { return <div className={`tech-deal ${dark ? "tech-deal-dark" : "tech-deal-light"}`}><p>{kicker}</p><h2>{title}</h2><Link to={to}>{label} <ArrowRight size={16}/></Link><Icon className="tech-deal-icon" size={126}/></div>; }
