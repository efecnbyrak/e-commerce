import { MapPin, Phone, Clock, Navigation } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const shops = [
    { name: "Sarıyer Deneyim Merkezi", address: "Maslak, Büyükdere Cd. Sarıyer/İstanbul", phone: "+90 212 555 10 01", hours: "09:00 - 22:00" },
    { name: "Nişantaşı Butik", address: "Abdi İpekçi Cd. No:42, Nişantaşı/İstanbul", phone: "+90 212 555 10 02", hours: "10:00 - 20:00" },
    { name: "Bağdat Caddesi", address: "Bağdat Cd. No:314, Kadıköy/İstanbul", phone: "+90 216 555 10 03", hours: "10:00 - 22:00" },
    { name: "Ankara Armada", address: "Eskişehir Yolu No:6, Yenimahalle/Ankara", phone: "+90 312 555 10 04", hours: "10:00 - 22:00" },
];

export default function ShopsPage() {
    return (
        <div className="max-w-7xl mx-auto space-y-16 pb-32">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-center">Mağazalarımız</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {shops.map((shop, i) => (
                    <Card key={i} className="p-8 bg-surface border-border-subtle rounded-[2rem] hover:shadow-2xl transition-all group">
                        <div className="flex justify-between items-start mb-6">
                            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                                <MapPin className="w-6 h-6" />
                            </div>
                            <Button variant="ghost" className="rounded-xl gap-2 font-bold text-xs uppercase tracking-widest text-primary hover:bg-primary/5">
                                <Navigation className="w-4 h-4" /> Yol Tarifi
                            </Button>
                        </div>
                        <h3 className="text-2xl font-bold mb-4">{shop.name}</h3>
                        <div className="space-y-4 text-sm font-medium text-muted-foreground">
                            <div className="flex items-center gap-3"><MapPin className="w-4 h-4" /> {shop.address}</div>
                            <div className="flex items-center gap-3"><Phone className="w-4 h-4" /> {shop.phone}</div>
                            <div className="flex items-center gap-3"><Clock className="w-4 h-4" /> {shop.hours}</div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
}
