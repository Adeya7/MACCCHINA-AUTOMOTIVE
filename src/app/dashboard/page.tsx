import type { Metadata } from "next";
import Link from "next/link";
import styles from "./dashboard.module.css";

export const metadata: Metadata = {
  title: "Dealership Dashboard | MACCHINA Automotive",
  description: "A demonstration workspace for MACCHINA Automotive dealership teams.",
};

type IconName = "overview" | "inventory" | "enquiries" | "passport" | "analytics" | "settings" | "car" | "plus" | "arrow" | "clock" | "check" | "menu" | "chevron" | "spark";

const navigation: { label: string; href: string; icon: IconName }[] = [
  { label: "Overview", href: "#overview", icon: "overview" },
  { label: "Vehicle Inventory", href: "#inventory", icon: "inventory" },
  { label: "Customer Enquiries", href: "#enquiries", icon: "enquiries" },
  { label: "Vehicle Trust Passports", href: "#passports", icon: "passport" },
  { label: "Analytics", href: "#analytics", icon: "analytics" },
  { label: "Settings", href: "#settings", icon: "settings" },
];

const vehicles = [
  { name: "Mercedes-Benz E 300", details: "E-Class · 2022 · 18,420 km", stock: "MC-24018", price: "$58,900", status: "Available", updated: "Today", tone: "blue" },
  { name: "BMW X5 xDrive40i", details: "X5 · 2023 · 12,860 km", stock: "MC-24012", price: "$76,250", status: "Reserved", updated: "Yesterday", tone: "violet" },
  { name: "Porsche Taycan 4S", details: "Taycan · 2022 · 9,240 km", stock: "MC-23994", price: "$91,400", status: "Sold", updated: "12 Nov 2026", tone: "silver" },
];

const activity = [
  { icon: "enquiries" as const, title: "New customer enquiry", detail: "Amina K. · Mercedes-Benz E 300", time: "18 min ago", tone: "blue" },
  { icon: "passport" as const, title: "Trust Passport reviewed", detail: "BMW X5 xDrive40i · Demo record", time: "1 hr ago", tone: "violet" },
  { icon: "check" as const, title: "Vehicle marked as sold", detail: "Porsche Taycan 4S · Demo listing", time: "Yesterday", tone: "green" },
];

const enquiries = [
  { initials: "AK", name: "Amina K.", interest: "Mercedes-Benz E 300", received: "Today, 10:42 AM", status: "New", tone: "blue" },
  { initials: "DM", name: "David M.", interest: "BMW X5 xDrive40i", received: "Today, 9:18 AM", status: "In review", tone: "amber" },
  { initials: "SW", name: "Sarah W.", interest: "Porsche Taycan 4S", received: "Yesterday, 4:06 PM", status: "Replied", tone: "green" },
];

function Icon({ name, size = 18 }: { name: IconName; size?: number }) {
  const paths: Record<IconName, string> = {
    overview: "M3 3h7v7H3z M14 3h7v4h-7z M14 10h7v11h-7z M3 13h7v8H3z",
    inventory: "M3 7h18M5 7l1.5 13h11L19 7M9 7V5a3 3 0 0 1 6 0v2",
    enquiries: "M4 5.5A2.5 2.5 0 0 1 6.5 3h11A2.5 2.5 0 0 1 20 5.5v9a2.5 2.5 0 0 1-2.5 2.5H10l-5 4v-4.5a2.5 2.5 0 0 1-1-2z M8 8h8M8 12h5",
    passport: "M12 3 19 6v5c0 4.7-3 8.2-7 10-4-1.8-7-5.3-7-10V6z M9 12l2 2 4-4",
    analytics: "M4 19V5M4 19h17M8 15l4-4 3 2 5-7",
    settings: "M12 8.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7z M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-1.7 2.9-.2-.1a1.7 1.7 0 0 0-1.8.1l-.2.1h-3.4l-.1-.2a1.7 1.7 0 0 0-1.5-1h-.2l-2.9-1.7.1-.2a1.7 1.7 0 0 0-.1-1.8l-.1-.2v-3.4l.2-.1a1.7 1.7 0 0 0 1-1.5v-.2l1.7-2.9.2.1a1.7 1.7 0 0 0 1.8-.1l.2-.1h3.4l.1.2a1.7 1.7 0 0 0 1.5 1h.2l2.9 1.7-.1.2a1.7 1.7 0 0 0 .1 1.8l.1.2v3.4z",
    car: "M5 16l-1 2v2h2v-2h12v2h2v-2l-1-2 1-5-2-5H6l-2 5 1 5z M4 11h16M7 15h.01M17 15h.01",
    plus: "M12 5v14M5 12h14",
    arrow: "M5 12h14M13 6l6 6-6 6",
    clock: "M12 8v4l2.5 1.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z",
    check: "M5 12l4 4L19 6",
    menu: "M4 7h16M4 12h16M4 17h16",
    chevron: "m7 10 5 5 5-5",
    spark: "m12 3 1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z M19 16l.8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8z",
  };

  return <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d={paths[name]} /></svg>;
}

function Brand() {
  return <Link className={styles.brand} href="/" aria-label="MACCHINA Automotive home"><span className={styles.brandMark}>M</span><span className={styles.brandName}>MACCHINA<span>AUTOMOTIVE</span></span></Link>;
}

function NavigationLinks() {
  return <nav className={styles.navLinks} aria-label="Dashboard navigation">{navigation.map((item, index) => <a key={item.label} href={item.href} className={`${styles.navLink} ${index === 0 ? styles.navLinkActive : ""}`} aria-current={index === 0 ? "page" : undefined}><Icon name={item.icon} size={17} /><span>{item.label}</span>{item.label === "Customer Enquiries" && <span className={styles.navCount}>4</span>}</a>)}</nav>;
}

function Sidebar() {
  return <aside className={styles.sidebar}><Brand /><div className={styles.workspace}><span className={styles.workspaceIcon}>N</span><span><strong>Northline Motors</strong><small>DEALERSHIP WORKSPACE</small></span><span className={styles.workspaceChevron}>⌄</span></div><div className={styles.navCaption}>WORKSPACE</div><NavigationLinks /><div className={styles.sidebarBottom}><div className={styles.supportCard}><span className={styles.supportIcon}><Icon name="spark" size={16} /></span><strong>Support preview</strong><p>Help resources are not connected in this demo.</p></div><div className={styles.sidebarFooter}><span className={styles.onlineDot} />Demo workspace status</div></div></aside>;
}

function MobileNavigation() {
  return <details className={styles.mobileNavigation}><summary><Icon name="menu" size={17} /><span>Menu</span><Icon name="chevron" size={15} /></summary><NavigationLinks /></details>;
}

function DashboardHeader() {
  return <header className={styles.header}><div className={styles.headerTitle}><div className={styles.breadcrumb}>DEALERSHIP WORKSPACE <span>/</span> OVERVIEW</div><h1>Good morning, Jordan</h1><p>Here’s what’s happening at your dealership today.</p></div><div className={styles.profile}><div className={styles.profileAvatar}>JM</div><span><strong>Jordan Mwangi</strong><small>Dealership admin</small></span><span className={styles.profileChevron}>⌄</span></div></header>;
}

function MetricCard({ label, value, note, icon, tint }: { label: string; value: string; note: string; icon: IconName; tint: string }) {
  return <article className={styles.metricCard}><div className={styles.metricTop}><span>{label}</span><span className={`${styles.metricIcon} ${styles[tint]}`}><Icon name={icon} size={17} /></span></div><div className={styles.metricValue}>{value}</div><div className={styles.metricNote}>{note}</div></article>;
}

function StatusBadge({ status, tone }: { status: string; tone: string }) {
  return <span className={`${styles.statusBadge} ${styles[tone]}`}><span />{status}</span>;
}

function ActivityPanel() {
  return <section id="overview-activity" className={styles.panel}><div className={styles.panelHeader}><div><span className={styles.panelEyebrow}>THE LATEST</span><h2>Recent activity</h2></div><a href="#enquiries" className={styles.panelAction}>See enquiries <Icon name="arrow" size={14} /></a></div><div className={styles.activityList}>{activity.map((item) => <article className={styles.activityItem} key={item.title}><span className={`${styles.activityIcon} ${styles[item.tone]}`}><Icon name={item.icon} size={16} /></span><div className={styles.activityCopy}><strong>{item.title}</strong><span>{item.detail}</span></div><time>{item.time}</time></article>)}</div><a href="#enquiries" className={styles.activityFooter}>View all customer enquiries <Icon name="arrow" size={14} /></a></section>;
}

function PassportPanel() {
  return <section id="passports" className={`${styles.panel} ${styles.passportPanel}`}><div className={styles.panelHeader}><div><span className={styles.panelEyebrow}>TRUST, MADE VISIBLE</span><h2>Vehicle Trust Passports</h2></div><span className={styles.demoPill}>DEMO PREVIEW</span></div><div className={styles.passportSummary}><span className={styles.passportGraphic}><Icon name="passport" size={23} /></span><div><strong>Clarity behind every listing</strong><p>Review vehicle records and share a clearer picture with every buyer.</p></div></div><div className={styles.passportFoot}><span>3 sample vehicle records</span><a href="#inventory">Explore inventory <Icon name="arrow" size={13} /></a></div></section>;
}

function VehicleTable() {
  return <section id="inventory" className={`${styles.panel} ${styles.listingsPanel}`}><div className={styles.panelHeader}><div><span className={styles.panelEyebrow}>YOUR LATEST STOCK</span><h2>Recent vehicle listings</h2><p className={styles.panelDescription}>Fictional demonstration inventory for preview purposes.</p></div><a className={styles.panelAction} href="#inventory">View inventory <Icon name="arrow" size={14} /></a></div><div className={styles.tableWrap}><table className={styles.vehicleTable}><thead><tr><th>VEHICLE</th><th>STOCK ID</th><th>STATUS</th><th>PRICE</th><th>UPDATED</th></tr></thead><tbody>{vehicles.map((vehicle) => <tr key={vehicle.stock}><td data-label="Vehicle"><div className={styles.vehicleCell}><span className={`${styles.vehicleThumb} ${styles[vehicle.tone]}`}><Icon name="car" size={21} /></span><span><strong>{vehicle.name}</strong><small>{vehicle.details}</small></span></div></td><td data-label="Stock ID" className={styles.stockId}>{vehicle.stock}</td><td data-label="Status"><StatusBadge status={vehicle.status} tone={vehicle.status === "Available" ? "green" : vehicle.status === "Sold" ? "silver" : "amber"} /></td><td data-label="Price" className={styles.price}>{vehicle.price}</td><td data-label="Updated" className={styles.updated}>{vehicle.updated}</td></tr>)}</tbody></table></div><div className={styles.tableFoot}><span><span className={styles.demoDot} />Demo listings · no live inventory connected</span><a href="#inventory">See all vehicles <Icon name="arrow" size={14} /></a></div></section>;
}

function EnquiriesPanel() {
  return <section id="enquiries" className={styles.panel}><div className={styles.panelHeader}><div><span className={styles.panelEyebrow}>BUYER INTEREST</span><h2>Customer enquiries</h2><p className={styles.panelDescription}>Sample enquiries shown for dashboard demonstration.</p></div><span className={styles.demoPill}>DEMO DATA</span></div><div className={styles.enquiryList}>{enquiries.map((enquiry) => <article className={styles.enquiryItem} key={enquiry.initials}><span className={styles.enquiryAvatar}>{enquiry.initials}</span><div className={styles.enquiryCopy}><strong>{enquiry.name}</strong><span>{enquiry.interest}</span></div><time>{enquiry.received}</time><StatusBadge status={enquiry.status} tone={enquiry.tone} /></article>)}</div><div className={styles.panelNote}>Enquiry records are fictional and are not connected to a customer management system.</div></section>;
}

function AnalyticsPanel() {
  const bars = [{ label: "Available", value: "75%", width: "75%", tone: "blueBar" }, { label: "Reserved", value: "8%", width: "8%", tone: "violetBar" }, { label: "Sold", value: "17%", width: "17%", tone: "navyBar" }];
  return <section id="analytics" className={styles.panel}><div className={styles.panelHeader}><div><span className={styles.panelEyebrow}>A QUICK LOOK</span><h2>Inventory snapshot</h2></div><span className={styles.demoPill}>FICTIONAL</span></div><div className={styles.chartCaption}><strong>Vehicle status mix</strong><span>Sample distribution</span></div><div className={styles.barList}>{bars.map((bar) => <div className={styles.barRow} key={bar.label}><span>{bar.label}</span><div className={styles.barTrack}><span className={`${styles.barFill} ${styles[bar.tone]}`} style={{ width: bar.width }} /></div><strong>{bar.value}</strong></div>)}</div><div className={styles.panelNote}>Illustrative only. This dashboard does not report live dealership performance.</div></section>;
}

function SettingsPanel() {
  return <section id="settings" className={styles.settingsPanel}><span className={styles.settingsIcon}><Icon name="settings" size={18} /></span><div><strong>Settings preview</strong><p>Dealership preferences are not connected in this demonstration.</p></div><span className={styles.placeholderLabel}>NOT CONNECTED</span></section>;
}

function QuickActions() {
  return <div className={styles.quickActions}><details className={styles.addAction}><summary><Icon name="plus" size={16} />Add vehicle</summary><div className={styles.actionNotice}><strong>Demo action</strong><span>Vehicle creation is not connected. No data will be saved.</span></div></details><a className={styles.secondaryAction} href="#enquiries">View enquiries <Icon name="arrow" size={15} /></a></div>;
}

export default function DashboardPage() {
  return <div className={`${styles.dashboard} min-h-screen bg-[#f4f6f9] text-[#10243d]`}>
    <Sidebar />
    <div className={styles.mainColumn}>
      <div className={styles.mobileTop}><Brand /><MobileNavigation /></div>
      <div className={styles.content}>
        <DashboardHeader />
        <main id="overview" className={styles.dashboardMain}>
          <div className={styles.overviewToolbar}><div><span className={styles.demoPill}><span className={styles.demoDot} />DEMONSTRATION WORKSPACE</span></div><QuickActions /></div>
          <section className={styles.metrics} aria-label="Dealership summary"><MetricCard label="Total vehicles" value="128" note="Across all listing statuses" icon="inventory" tint="blue" /><MetricCard label="Available vehicles" value="96" note="Ready for a new owner" icon="car" tint="green" /><MetricCard label="Vehicles sold" value="32" note="In this demo inventory" icon="check" tint="violet" /><MetricCard label="Customer enquiries" value="24" note="Sample enquiries this month" icon="enquiries" tint="amber" /></section>
          <div className={styles.overviewGrid}><ActivityPanel /><PassportPanel /></div>
          <VehicleTable />
          <div className={styles.lowerGrid}><EnquiriesPanel /><AnalyticsPanel /></div>
          <SettingsPanel />
          <footer className={styles.dashboardFooter}><span>MACCHINA AUTOMOTIVE <b>·</b> DEALERSHIP WORKSPACE</span><span>Fictional demonstration data · No live records connected</span><Link href="/">Return to MACCHINA Automotive <Icon name="arrow" size={13} /></Link></footer>
        </main>
      </div>
    </div>
  </div>;
}
