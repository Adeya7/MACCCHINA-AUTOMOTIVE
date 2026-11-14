"use client";

import { useMemo, useState } from "react";
import type { FormEvent } from "react";

type Vehicle = {
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: string;
  fuel: string;
  image: string;
  imageAlt: string;
  tag: string;
};

const vehicles: Vehicle[] = [
  { make: "Mercedes-Benz", model: "E-Class E 300", year: 2022, price: 58900, mileage: "18,420 km", fuel: "Petrol · Automatic", image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1100&q=85", imageAlt: "Silver luxury sedan in a modern architectural setting", tag: "EDITOR’S PICK" },
  { make: "BMW", model: "X5 xDrive40i", year: 2023, price: 76250, mileage: "12,860 km", fuel: "Petrol · Automatic", image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1100&q=85", imageAlt: "Dark premium SUV on a city street", tag: "PASSPORT READY" },
  { make: "Porsche", model: "Taycan 4S", year: 2022, price: 91400, mileage: "9,240 km", fuel: "Electric · Automatic", image: "https://images.unsplash.com/photo-1611859266238-4b98091d9d9b?auto=format&fit=crop&w=1100&q=85", imageAlt: "Electric sports car photographed in dramatic light", tag: "LOW MILEAGE" },
];

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <span aria-hidden="true" className="arrow">{diagonal ? "↗" : "→"}</span>;
}

function Brand({ light = false }: { light?: boolean }) {
  return <a href="#home" className={`brand${light ? " brand-light" : ""}`} aria-label="MACCHINA Automotive home"><span className="brand-mark">M</span><span className="brand-word">MACCHINA<span className="brand-sub">AUTOMOTIVE</span></span></a>;
}

function VehicleSearch({ onSearch }: { onSearch: (make: string, model: string, budget: string) => void }) {
  const [make, setMake] = useState("Any make");
  const [model, setModel] = useState("");
  const [budget, setBudget] = useState("Any budget");
  const [applied, setApplied] = useState(false);

  function search(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setApplied(true);
    onSearch(make, model, budget);
    document.getElementById("featured")?.scrollIntoView({ behavior: "smooth" });
  }

  return <form className="search-panel" onSubmit={search}>
    <div className="search-field"><label htmlFor="make">Make</label><select id="make" value={make} onChange={(event) => { setMake(event.target.value); setApplied(false); }}><option>Any make</option>{[...new Set(vehicles.map((vehicle) => vehicle.make))].map((item) => <option key={item}>{item}</option>)}</select></div>
    <div className="search-field"><label htmlFor="model">Model</label><input id="model" placeholder="e.g. E-Class" value={model} onChange={(event) => { setModel(event.target.value); setApplied(false); }} /></div>
    <div className="search-field"><label htmlFor="budget">Price range</label><select id="budget" value={budget} onChange={(event) => { setBudget(event.target.value); setApplied(false); }}><option>Any budget</option><option>Under $60,000</option><option>$60,000 – $80,000</option><option>$80,000+</option></select></div>
    <button className="button button-blue search-button" type="submit">Find a vehicle <Arrow /></button>
    {applied && <span className="sr-only" role="status">Vehicle filters applied.</span>}
  </form>;
}

function VehicleCard({ vehicle }: { vehicle: Vehicle }) {
  return <article className="vehicle-card">
    <a href="#contact" className="vehicle-image" style={{ backgroundImage: `url("${vehicle.image}")` }} aria-label={`Enquire about the ${vehicle.year} ${vehicle.make} ${vehicle.model}`}>
      <span className="demo-tag">DEMO VEHICLE</span><span className="vehicle-tag">{vehicle.tag}</span><span className="image-arrow"><Arrow diagonal /></span>
    </a>
    <div className="vehicle-info"><p className="vehicle-year">{vehicle.year} <span>·</span> {vehicle.mileage}</p><h3>{vehicle.make} <span>{vehicle.model}</span></h3><p className="vehicle-spec">{vehicle.fuel}</p><div className="vehicle-bottom"><strong>${vehicle.price.toLocaleString("en-US")}</strong><a href="#contact" aria-label={`View details for ${vehicle.make} ${vehicle.model}`}>View vehicle <Arrow /></a></div></div>
  </article>;
}

function SectionLabel({ children, light = false }: { children: string; light?: boolean }) {
  return <p className={`section-label${light ? " section-label-light" : ""}`}><span />{children}</p>;
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeMake, setActiveMake] = useState("All vehicles");
  const [searchMake, setSearchMake] = useState("Any make");
  const [searchModel, setSearchModel] = useState("");
  const [searchBudget, setSearchBudget] = useState("Any budget");
  const filteredVehicles = useMemo(() => vehicles.filter((vehicle) => {
    const selectedMake = searchMake !== "Any make" ? searchMake : activeMake;
    const makeMatches = selectedMake === "All vehicles" || selectedMake === "Any make" || vehicle.make === selectedMake;
    const modelMatches = !searchModel || `${vehicle.make} ${vehicle.model}`.toLowerCase().includes(searchModel.toLowerCase());
    const budgetMatches = searchBudget === "Any budget" || (searchBudget === "Under $60,000" && vehicle.price < 60000) || (searchBudget === "$60,000 – $80,000" && vehicle.price >= 60000 && vehicle.price <= 80000) || (searchBudget === "$80,000+" && vehicle.price > 80000);
    return makeMatches && modelMatches && budgetMatches;
  }), [activeMake, searchMake, searchModel, searchBudget]);

  return <main id="home">
    <div className="announcement"><span className="announcement-dot" />THE NEXT STANDARD IN AUTOMOTIVE RETAIL<span className="announcement-divider">/</span><a href="#passport">Discover the Trust Passport <Arrow /></a></div>
    <header className="site-header"><div className="nav-wrap"><Brand /><nav className="desktop-nav" aria-label="Main navigation"><a className="nav-active" href="#home">Home</a><a href="#featured">Browse Vehicles</a><a href="#passport">Trust Passport</a><a href="#about">About</a></nav><a href="#featured" className="button button-dark nav-cta">Explore inventory <Arrow /></a><button className="mobile-menu" type="button" aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={() => setMenuOpen((open) => !open)}><span>{menuOpen ? "Close" : "Menu"}</span><span aria-hidden="true">{menuOpen ? "\u00d7" : "\u2630"}</span></button>{menuOpen && <nav id="mobile-navigation" className="mobile-nav" aria-label="Mobile navigation">{[["Home", "#home"], ["Browse Vehicles", "#featured"], ["Trust Passport", "#passport"], ["About", "#about"]].map(([label, href]) => <a key={label} href={href} onClick={() => setMenuOpen(false)}>{label}<Arrow /></a>)}</nav>}</div></header>

    <section className="hero"><div className="hero-image" role="img" aria-label="Premium modern electric sedan in a dramatic architectural setting" /><div className="hero-shade" /><div className="hero-content page-width"><SectionLabel light>THE FUTURE OF AUTOMOTIVE RETAIL</SectionLabel><h1>Confidence looks<br />good <em>on you.</em></h1><p className="hero-copy">A more considered way to find your next vehicle. Exceptional cars, thoughtfully selected, with the story behind every mile.</p><div className="hero-actions"><a className="button button-blue" href="#featured">Explore vehicles <Arrow /></a><a className="text-link text-link-light" href="#passport">Discover the Trust Passport <Arrow diagonal /></a></div><div className="hero-note"><span className="hero-note-line" /><span>Every vehicle has a story.<br /><strong>Know it before you go.</strong></span></div></div><div className="hero-index">01 <span>/</span> 03</div><div className="hero-caption"><span>DESIGNED FOR A BETTER DRIVE</span><span>MACCHINA AUTOMOTIVE — 2026</span></div></section>

    <section className="finder page-width" aria-label="Search vehicles"><div className="finder-heading"><div><SectionLabel>YOUR NEXT CHAPTER STARTS HERE</SectionLabel><h2>Find your <em>drive.</em></h2></div><span className="finder-count">Curated for the way you move</span></div><VehicleSearch onSearch={(make, model, budget) => { setSearchMake(make); setSearchModel(model); setSearchBudget(budget); setActiveMake("All vehicles"); }} /></section>

    <section id="featured" className="featured section-pad"><div className="page-width"><div className="section-heading"><div><SectionLabel>THE MACCHINA SELECTION</SectionLabel><h2>Considered cars.<br /><em>Clear histories.</em></h2></div><a className="text-link" href="#featured">View all vehicles <Arrow /></a></div><div className="inventory-toolbar"><p>Every listing is a <strong>fictional demonstration vehicle</strong> created to showcase the MACCHINA experience.{filteredVehicles.length === 0 && <><br /><strong>No demo vehicles match those filters.</strong></>}</p><div className="filter-pills" aria-label="Filter demonstration vehicles">{["All vehicles", "Mercedes-Benz", "BMW", "Porsche"].map((item) => <button key={item} type="button" onClick={() => { setActiveMake(item); setSearchMake("Any make"); setSearchModel(""); setSearchBudget("Any budget"); }} className={activeMake === item ? "pill pill-active" : "pill"}>{item}</button>)}</div></div><div className="vehicle-grid">{filteredVehicles.map((vehicle) => <VehicleCard key={vehicle.model} vehicle={vehicle} />)}</div><div className="demo-disclaimer"><span className="info-icon">i</span><span>Demonstration inventory only. Vehicles, specifications, and prices shown are fictional and not available for purchase.</span></div></div></section>

    <section id="passport" className="passport section-pad"><div className="page-width passport-layout"><div className="passport-copy"><SectionLabel light>INTRODUCING THE VEHICLE TRUST PASSPORT</SectionLabel><h2>Every car has a past.<br /><em>Now you can see it.</em></h2><p>A vehicle’s history shouldn’t be a mystery. The MACCHINA Trust Passport brings key vehicle information together in one clear, considered view—so every decision starts with understanding.</p><a className="button button-white" href="#about">Explore the Trust Passport <Arrow /></a><div className="passport-footnote"><span>01</span><span>CLARITY, BUILT INTO EVERY JOURNEY</span></div></div><div className="passport-visual"><div className="passport-glow" /><div className="passport-card"><div className="passport-card-top"><span className="passport-logo">M<span>·</span></span><span className="verified-badge">✓ VERIFIED DEMO</span></div><div className="passport-car"><div className="car-silhouette"><span /></div><div><small>VEHICLE TRUST PASSPORT</small><h3>Mercedes-Benz E 300</h3><p>2022 <span>·</span> Demonstration record</p></div></div><div className="passport-divider" /><div className="passport-checks"><div><span className="check-icon">✓</span><span><strong>Identity & specifications</strong><small>Record reviewed</small></span><b>VERIFIED</b></div><div><span className="check-icon">✓</span><span><strong>History overview</strong><small>Demo information</small></span><b>ON FILE</b></div><div><span className="check-icon">✓</span><span><strong>Inspection summary</strong><small>Dealer supplied</small></span><b>ON FILE</b></div></div><div className="passport-card-bottom"><span>MACCHINA AUTOMOTIVE</span><span>MP · 000 284</span></div></div><div className="visual-caption">A CLEARER PICTURE, FROM THE START <span>↗</span></div></div></div></section>

    <section id="about" className="why section-pad"><div className="page-width"><div className="why-heading"><div><SectionLabel>BUILT AROUND WHAT MATTERS</SectionLabel><h2>Better for the people<br />behind <em>the wheel.</em></h2></div><p>Good automotive retail is built on good relationships. We give buyers and dealerships a clearer way to find each other, built on confidence from the first click.</p></div><div className="benefit-grid"><article className="benefit-card"><span className="benefit-number">01</span><div className="benefit-icon">⌕</div><h3>For the considered buyer</h3><p>Discover standout vehicles with the details you need to make your next move with confidence.</p><a href="#featured">Find your next vehicle <Arrow /></a></article><article className="benefit-card"><span className="benefit-number">02</span><div className="benefit-icon">▤</div><h3>For the trusted dealer</h3><p>Present your inventory with clarity and build stronger connections with serious buyers.</p><a href="#contact">Partner with MACCHINA <Arrow /></a></article><article className="benefit-card"><span className="benefit-number">03</span><div className="benefit-icon">◈</div><h3>Confidence by design</h3><p>Make meaningful vehicle information easier to understand at every step of the journey.</p><a href="#passport">Meet the Trust Passport <Arrow /></a></article></div></div></section>

    <section id="contact" className="closing-cta"><div className="page-width closing-inner"><div><SectionLabel light>YOUR ROAD, YOUR TERMS</SectionLabel><h2>Move forward<br />with <em>confidence.</em></h2></div><a className="button button-white" href="#featured">Start exploring <Arrow diagonal /></a><span className="closing-decoration">M</span></div></section>

    <footer className="site-footer"><div className="page-width"><div className="footer-main"><div className="footer-brand-col"><Brand light /><p>A more considered way to move.<br />Built for what’s next.</p></div><div className="footer-column"><h3>Explore</h3><a href="#home">Home</a><a href="#featured">Browse vehicles</a><a href="#passport">Trust Passport</a><a href="#about">About MACCHINA</a></div><div className="footer-column"><h3>Discover</h3><a href="#passport">How it works</a><a href="#about">For dealerships</a><a href="#about">Our approach</a></div><div className="footer-note"><span className="footer-note-dot" />Built for a better kind of automotive retail.<span>Clarity at every turn.</span></div></div><div className="footer-bottom"><span>© 2026 MACCHINA Technologies. All rights reserved.</span><span>MACCHINA AUTOMOTIVE <b>·</b> A MACCHINA TECHNOLOGIES PRODUCT</span><a href="#home">Back to top ↑</a></div></div></footer>
  </main>;
}
