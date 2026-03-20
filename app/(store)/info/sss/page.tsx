import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
    { q: "Siparişim ne zaman kargoya verilir?", a: "Siparişleriniz genellikle 24-48 saat içerisinde kargoya teslim edilmektedir. Hafta sonu verilen siparişler Pazartesi günü işleme alınır." },
    { q: "İade süreci nasıl işler?", a: "Ürünü teslim aldığınız tarihten itibaren 14 gün içerisinde iade edebilirsiniz. İade edilecek ürünün kullanılmamış ve orijinal ambalajında olması gerekmektedir." },
    { q: "Hangi ödeme yöntemlerini kabul ediyorsunuz?", a: "Kredi kartı, banka kartı ve havale/EFT ile ödeme kabul etmekteyiz. Tüm işlemler 256-bit SSL sertifikası ile korunmaktadır." },
    { q: "Yurt dışına gönderim yapıyor musunuz?", a: "Şu an için sadece Türkiye sınırları içerisine gönderim yapmaktayız." },
    { q: "Ürün değişimi yapabilir miyim?", a: "Evet, ürün değişimi için ürünün stokta olması ve iade koşullarını sağlaması gerekmektedir. Detaylı bilgi için müşteri hizmetlerimizle iletişime geçebilirsiniz." },
];

export default function FAQPage() {
    return (
        <div className="max-w-4xl mx-auto space-y-16 pb-32">
            <div className="text-center space-y-6">
                <h1 className="text-5xl md:text-7xl font-bold tracking-tighter">Sıkça Sorulan Sorular</h1>
                <p className="text-lg text-muted-foreground font-medium">Merak ettiğiniz tüm cevaplar burada. Aradığınızı bulamazsanız bize ulaşın.</p>
            </div>

            <Card className="p-8 md:p-12 bg-surface border-border-subtle rounded-[2.5rem] shadow-2xl">
                <Accordion type="single" collapsible className="w-full space-y-4">
                    {faqs.map((faq, i) => (
                        <AccordionItem key={i} value={`item-${i}`} className="border-border-subtle hover:bg-muted/30 transition-all rounded-2xl px-6">
                            <AccordionTrigger className="text-lg font-bold hover:no-underline py-6">{faq.q}</AccordionTrigger>
                            <AccordionContent className="text-muted-foreground font-medium leading-relaxed pb-6">
                                {faq.a}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </Card>
        </div>
    );
}

import { Card } from "@/components/ui/card";
