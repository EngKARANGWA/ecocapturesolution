import {
  Microscope,
  FlaskConical,
  Radio,
  LayoutDashboard,
  BellRing,
  Cloud,
} from "lucide-react";
import FeatureCard from "../components/FeatureCard";

const features = [
  {
    icon: <Microscope className="w-7 h-7 text-blue-400" />,
    title: "On-Vehicle CO Detection",
    desc: "MQ-7 sensor mounted on the exhaust pipe of cars, motorcycles, and industry equipment — measuring CO from 0 to 1000 ppm continuously.",
  },
  {
    icon: <FlaskConical className="w-7 h-7 text-purple-400" />,
    title: "Catalytic Purification",
    desc: "Compact catalytic converter fitted to the exhaust converts toxic CO into CO₂ before it is released, achieving 40–60% reduction.",
  },
  {
    icon: <Radio className="w-7 h-7 text-cyan-400" />,
    title: "IoT Data Transmission",
    desc: "ESP32 on each vehicle or machine sends sensor readings to the cloud via Wi-Fi every 2–5 seconds for live tracking.",
  },
  {
    icon: <LayoutDashboard className="w-7 h-7 text-green-400" />,
    title: "Live Dashboard",
    desc: "Admin dashboard tracks all registered cars, motos, and small industries — showing live CO levels, plate numbers, and purification status.",
  },
  {
    icon: <BellRing className="w-7 h-7 text-red-400" />,
    title: "Threshold Alerts",
    desc: "Automatic alerts when a vehicle or industry unit exceeds 400 ppm, with severity levels and acknowledge/resolve workflow.",
  },
  {
    icon: <Cloud className="w-7 h-7 text-sky-400" />,
    title: "Cloud Storage",
    desc: "All readings per vehicle and industry unit are stored with ≥95% reliability, enabling historical analysis and compliance reporting.",
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="px-8 py-20 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-4 text-slate-900 dark:text-white">System Features</h2>
      <p className="text-slate-500 dark:text-slate-400 text-center mb-12">
        Built for cars, motorcycles, and small industries in Rwanda
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {features.map((f) => (
          <FeatureCard key={f.title} {...f} />
        ))}
      </div>
    </section>
  );
}
