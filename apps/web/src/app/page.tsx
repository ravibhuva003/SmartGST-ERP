import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, FileText, PieChart, ShieldCheck, Zap } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950 font-sans selection:bg-indigo-500/30 text-slate-900 dark:text-slate-50">
      
      {/* HEADER */}
      <header className="sticky top-0 z-50 w-full border-b border-slate-200/50 dark:border-slate-800/50 bg-white/70 dark:bg-slate-950/70 backdrop-blur-xl">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="size-8 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-indigo-500/20">
              S
            </div>
            <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-400">
              SmartGST ERP
            </span>
          </div>
          <nav className="hidden md:flex gap-8 text-sm font-medium text-slate-600 dark:text-slate-300">
            <Link href="#features" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Features</Link>
            <Link href="#pricing" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Pricing</Link>
            <Link href="#testimonials" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Testimonials</Link>
            <Link href="#faq" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">FAQ</Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/auth/login" className="text-sm font-medium hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              Log in
            </Link>
            <Link href="/auth/register">
              <Button className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-md hover:shadow-lg transition-all rounded-full px-6">
                Get Started Free
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        
        {/* HERO SECTION */}
        <section className="relative pt-24 pb-32 overflow-hidden">
          {/* Abstract Background Elements */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] max-w-[1200px] bg-gradient-to-b from-indigo-500/10 via-violet-500/5 to-transparent blur-3xl -z-10 rounded-full" />
          
          <div className="container mx-auto px-4 flex flex-col items-center text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/20 text-indigo-700 dark:text-indigo-300 text-sm font-medium mb-8">
              <span className="flex h-2 w-2 rounded-full bg-indigo-600 animate-pulse"></span>
              The #1 Cloud ERP for Indian Businesses
            </div>
            
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight max-w-4xl mb-8 leading-[1.1]">
              Streamline your billing & GST compliance in <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">seconds.</span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mb-10 leading-relaxed">
              Generate professional invoices, manage multi-business inventory, and file GSTR-1/3B automatically. The intelligent ERP built specifically to eliminate compliance headaches.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Link href="/auth/register">
                <Button size="lg" className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white rounded-full h-14 px-8 text-base shadow-xl shadow-indigo-600/20 hover:scale-105 transition-transform duration-300">
                  Start Your Free Trial <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="#features">
                <Button variant="outline" size="lg" className="w-full sm:w-auto rounded-full h-14 px-8 text-base border-slate-300 hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800 transition-colors">
                  See how it works
                </Button>
              </Link>
            </div>
            
            {/* Dashboard Mockup Image */}
            <div className="mt-20 w-full max-w-5xl rounded-2xl border border-slate-200/50 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm shadow-2xl p-2 md:p-4 rotate-x-12 perspective-1000 transform-gpu overflow-hidden">
              <div className="w-full h-[300px] md:h-[600px] bg-slate-100 dark:bg-slate-950 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 flex flex-col relative">
                {/* Mockup Header */}
                <div className="h-12 border-b border-slate-200 dark:border-slate-800 flex items-center px-4 gap-4 bg-white dark:bg-slate-900">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-amber-400" />
                    <div className="w-3 h-3 rounded-full bg-green-400" />
                  </div>
                  <div className="flex-1 max-w-md mx-auto h-6 bg-slate-100 dark:bg-slate-800 rounded-md" />
                </div>
                {/* Mockup Body */}
                <div className="flex flex-1 p-6 gap-6 bg-slate-50 dark:bg-slate-950">
                  {/* Sidebar */}
                  <div className="w-48 hidden md:flex flex-col gap-3">
                    {[1, 2, 3, 4, 5].map(i => (
                      <div key={i} className={`h-8 rounded-md ${i === 2 ? 'bg-indigo-100 dark:bg-indigo-900/30' : 'bg-slate-200 dark:bg-slate-800'}`} />
                    ))}
                  </div>
                  {/* Main Content */}
                  <div className="flex-1 flex flex-col gap-6">
                    <div className="flex justify-between items-center">
                      <div className="h-8 w-48 bg-slate-200 dark:bg-slate-800 rounded-lg" />
                      <div className="h-10 w-32 bg-indigo-500 rounded-lg" />
                    </div>
                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {[1, 2, 3].map(i => (
                        <div key={i} className="h-32 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 flex flex-col justify-between">
                          <div className="h-4 w-24 bg-slate-200 dark:bg-slate-800 rounded" />
                          <div className="h-8 w-32 bg-slate-300 dark:bg-slate-700 rounded" />
                        </div>
                      ))}
                    </div>
                    {/* Table */}
                    <div className="flex-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4">
                      <div className="h-6 w-full bg-slate-100 dark:bg-slate-800/50 rounded mb-4" />
                      {[1, 2, 3, 4].map(i => (
                        <div key={i} className="h-12 w-full border-b border-slate-100 dark:border-slate-800 mb-2 flex items-center gap-4">
                          <div className="h-4 w-1/4 bg-slate-200 dark:bg-slate-800 rounded" />
                          <div className="h-4 w-1/4 bg-slate-200 dark:bg-slate-800 rounded" />
                          <div className="h-4 w-1/4 bg-slate-200 dark:bg-slate-800 rounded" />
                          <div className="h-4 w-1/4 bg-indigo-100 dark:bg-indigo-900/50 rounded" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
          </div>
        </section>

        {/* FEATURES SECTION */}
        <section id="features" className="py-24 bg-white dark:bg-slate-900">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">Everything you need to scale</h2>
              <p className="text-lg text-slate-600 dark:text-slate-400">
                Stop juggling spreadsheets and legacy software. SmartGST ERP provides a unified, highly scalable platform designed exclusively for modern Indian enterprises.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { title: "One-Click GST Returns", desc: "Instantly generate GSTR-1, GSTR-3B, and GSTR-9 reports based on your exact invoice data.", icon: FileText, color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-500/10" },
                { title: "B2B & B2C Invoicing", desc: "Create stunning, professional tax invoices with custom branding, HSN/SAC codes, and QR codes.", icon: Zap, color: "text-amber-500", bg: "bg-amber-50 dark:bg-amber-500/10" },
                { title: "Multi-Business Management", desc: "Manage multiple GSTINs, branches, and companies seamlessly from a single unified dashboard.", icon: PieChart, color: "text-indigo-500", bg: "bg-indigo-50 dark:bg-indigo-500/10" },
                { title: "Intelligent Tax Engine", desc: "Automatically calculates CGST, SGST, and IGST based on intra-state vs inter-state logic.", icon: CheckCircle2, color: "text-emerald-500", bg: "bg-emerald-50 dark:bg-emerald-500/10" },
                { title: "Real-time Inventory", desc: "Track stock levels, set low-stock alerts, and manage SKU variants across multiple warehouses.", icon: PieChart, color: "text-pink-500", bg: "bg-pink-50 dark:bg-pink-500/10" },
                { title: "Bank-Grade Security", desc: "Your financial data is encrypted at rest and in transit, hosted on enterprise AWS infrastructure.", icon: ShieldCheck, color: "text-violet-500", bg: "bg-violet-50 dark:bg-violet-500/10" },
              ].map((feature, i) => (
                <div key={i} className="p-8 rounded-3xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 hover:shadow-xl transition-all duration-300 group">
                  <div className={`w-14 h-14 rounded-2xl ${feature.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <feature.icon className={`h-7 w-7 ${feature.color}`} />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PRICING SECTION */}
        <section id="pricing" className="py-24 bg-slate-50 dark:bg-slate-950">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">Simple, transparent pricing</h2>
              <p className="text-lg text-slate-600 dark:text-slate-400">
                No hidden fees. Start for free and upgrade when your business demands it.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Free Tier */}
              <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-lg">
                <h3 className="text-2xl font-bold mb-2">Starter</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-6">Perfect for freelancers and small shops.</p>
                <div className="mb-8">
                  <span className="text-5xl font-extrabold">₹0</span>
                  <span className="text-slate-500">/month</span>
                </div>
                <ul className="space-y-4 mb-8">
                  {['1 Business Entity', 'Up to 50 Invoices/mo', 'Basic Customer Management', 'Standard Email Support'].map((item, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-indigo-500" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/auth/register">
                  <Button variant="outline" className="w-full h-12 rounded-xl text-base border-indigo-200 dark:border-slate-700 hover:bg-indigo-50 dark:hover:bg-slate-800">
                    Get Started Free
                  </Button>
                </Link>
              </div>

              {/* Pro Tier */}
              <div className="p-8 rounded-3xl bg-indigo-600 text-white shadow-2xl shadow-indigo-600/30 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4">
                  <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-medium backdrop-blur-md">Most Popular</span>
                </div>
                <h3 className="text-2xl font-bold mb-2">Professional</h3>
                <p className="text-indigo-100 mb-6">For growing enterprises requiring scale.</p>
                <div className="mb-8">
                  <span className="text-5xl font-extrabold">₹1,499</span>
                  <span className="text-indigo-200">/month</span>
                </div>
                <ul className="space-y-4 mb-8">
                  {['Unlimited Business Entities', 'Unlimited Invoices', 'Advanced GST Reporting', 'Inventory Management', 'Priority 24/7 Support'].map((item, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-indigo-300" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/auth/register">
                  <Button className="w-full h-12 rounded-xl text-base bg-white text-indigo-600 hover:bg-slate-100">
                    Start 14-Day Free Trial
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section id="testimonials" className="py-24 bg-white dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Trusted by 10,000+ Indian Businesses</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { quote: "SmartGST ERP cut our billing time in half. The automatic GSTR-3B calculation and seamless dashboard is flawless.", author: "Rajesh Kumar", role: "Director, RK Electronics" },
                { quote: "The multi-business feature is a lifesaver. I manage 4 different GSTINs from one single login.", author: "Sneha Patel", role: "CA, Patel & Associates" },
                { quote: "Finally, a cloud ERP that feels modern and fast. The invoice aesthetics impress all our clients.", author: "Amit Sharma", role: "Founder, Sharma Logistics" },
              ].map((t, i) => (
                <div key={i} className="p-8 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800">
                  <div className="flex gap-1 mb-6">
                    {[1,2,3,4,5].map(s => <StarIcon key={s} className="h-5 w-5 fill-amber-400 text-amber-400" />)}
                  </div>
                  <p className="text-lg font-medium mb-6 italic text-slate-700 dark:text-slate-300">"{t.quote}"</p>
                  <div>
                    <div className="font-bold">{t.author}</div>
                    <div className="text-sm text-slate-500">{t.role}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PRICING SECTION */}
        <section id="pricing" className="py-24 bg-slate-50 dark:bg-slate-950">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Simple, Transparent Pricing</h2>
            <p className="text-center text-slate-600 dark:text-slate-400 mb-16 max-w-2xl mx-auto">Choose the perfect plan for your business size.</p>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                { name: "Free", price: "₹0", desc: "Perfect for new businesses", features: ["Up to 50 invoices/month", "1 User", "Basic GST Reports"] },
                { name: "Premium", price: "₹999/mo", desc: "For growing companies", features: ["Unlimited Invoices", "5 Users", "Multi-branch Support", "E-Way Bills"] },
                { name: "Enterprise", price: "Custom", desc: "For large scale operations", features: ["Unlimited Everything", "Dedicated Account Manager", "Custom Integrations", "On-premise deployment"] }
              ].map((plan, i) => (
                <div key={i} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 flex flex-col">
                  <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                  <p className="text-slate-500 mb-6">{plan.desc}</p>
                  <div className="text-4xl font-bold mb-8">{plan.price}</div>
                  <ul className="space-y-4 mb-8 flex-1">
                    {plan.features.map((f, j) => (
                      <li key={j} className="flex items-center gap-3"><CheckCircle2 className="size-5 text-indigo-500" /> {f}</li>
                    ))}
                  </ul>
                  <Button variant={i === 1 ? 'default' : 'outline'} className="w-full">
                    {i === 2 ? 'Contact Sales' : 'Get Started'}
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ SECTION */}
        <section id="faq" className="py-24 bg-white dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Frequently Asked Questions</h2>
            <div className="space-y-8">
              {[
                { q: "Is my data secure?", a: "Yes, we use bank-grade 256-bit encryption. Your data is backed up automatically across multiple data centers." },
                { q: "Can I use SmartGST ERP on my mobile phone?", a: "Absolutely! Our platform is a fully responsive Progressive Web App (PWA) that works beautifully on any device." },
                { q: "Do you support thermal printing for retail?", a: "Yes, we have specialized invoice formats perfectly optimized for 2-inch and 3-inch thermal printers." }
              ].map((faq, i) => (
                <div key={i}>
                  <h4 className="text-xl font-bold mb-2">{faq.q}</h4>
                  <p className="text-slate-600 dark:text-slate-400">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA SECTION */}
        <section className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-indigo-600" />
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 mix-blend-overlay" />
          <div className="container mx-auto px-4 relative z-10 text-center text-white">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6">Ready to modernize your billing?</h2>
            <p className="text-xl text-indigo-100 mb-10 max-w-2xl mx-auto">
              Join thousands of businesses who have made the switch to SmartGST ERP. Get set up in less than 5 minutes.
            </p>
            <Link href="/auth/register">
              <Button size="lg" className="bg-white text-indigo-600 hover:bg-slate-100 rounded-full h-14 px-10 text-lg shadow-2xl hover:scale-105 transition-transform duration-300">
                Create Your Free Account
              </Button>
            </Link>
          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="size-6 rounded-md bg-indigo-600 flex items-center justify-center text-white font-bold text-sm">S</div>
                <span className="text-lg font-bold">SmartGST ERP</span>
              </div>
              <p className="text-slate-500 max-w-sm mb-4">
                The modern standard for Indian billing, inventory, and GST compliance. Built with ❤️ for Bharat.
                <br /><br />
                <a href="mailto:support@smartgst.erp" className="hover:text-indigo-600 block">support@smartgst.erp</a>
                <a href="tel:+919773063667" className="hover:text-indigo-600 block">+91 9773063667</a>
                <a href="https://www.smartgst.erp" target="_blank" rel="noreferrer" className="hover:text-indigo-600 block">www.smartgst.erp</a>
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Product</h4>
              <ul className="space-y-3 text-slate-500">
                <li><Link href="#" className="hover:text-indigo-600">Features</Link></li>
                <li><Link href="#" className="hover:text-indigo-600">Pricing</Link></li>
                <li><Link href="#" className="hover:text-indigo-600">Integrations</Link></li>
                <li><Link href="#" className="hover:text-indigo-600">Changelog</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-3 text-slate-500">
                <li><Link href="#" className="hover:text-indigo-600">About Us</Link></li>
                <li><Link href="#" className="hover:text-indigo-600">Contact Sales</Link></li>
                <li><Link href="#" className="hover:text-indigo-600">Privacy Policy</Link></li>
                <li><Link href="#" className="hover:text-indigo-600">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-slate-200 dark:border-slate-800 text-center text-slate-500 text-sm">
            © {new Date().getFullYear()} SmartGST ERP. All rights reserved.
          </div>
        </div>
      </footer>

    </div>
  );
}

function StarIcon(props: any) {
  return (
    <svg viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}
