"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function ContactSection() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setFormState({ name: "", email: "", message: "" });
  };

  return (
    <section id="contact" className="py-40 relative">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-16"
            >
              <span className="text-[#ff6b00] font-bold tracking-[0.4em] uppercase text-sm block mb-6">
                05 — Connection
              </span>
              <h2 className="text-6xl md:text-8xl font-black tracking-tighter leading-none mb-12">
                LET&apos;S<br/><span className="text-white/20">TALK</span>
              </h2>
              <p className="text-xl text-white/60 leading-relaxed max-w-md">
                Interested in collaboration, research opportunities, or have a question? 
                Feel free to reach out.
              </p>
            </motion.div>

            <div className="space-y-12">
              <div>
                <span className="text-white/30 text-xs font-bold tracking-widest uppercase mb-4 block">Email Me</span>
                <a href="mailto:asadshahzad0017@gmail.com" className="text-3xl font-bold hover:text-[#ff6b00] transition-colors break-all">
                  asadshahzad0017@gmail.com
                </a>
              </div>
              
              <div>
                <span className="text-white/30 text-xs font-bold tracking-widest uppercase mb-4 block">Based In</span>
                <p className="text-3xl font-bold">Narowal, Pakistan</p>
              </div>

              <div>
                <span className="text-white/30 text-xs font-bold tracking-widest uppercase mb-4 block">Socials</span>
                <div className="flex gap-8">
                  <button 
                    onClick={() => window.parent.postMessage({ type: "OPEN_EXTERNAL_URL", data: { url: "http://www.linkedin.com/in/asad-shahzad" } }, "*")}
                    className="text-xl font-bold hover:text-[#ff6b00] transition-colors uppercase tracking-widest"
                  >
                    LinkedIn
                  </button>
                  <button className="text-xl font-bold hover:text-[#ff6b00] transition-colors uppercase tracking-widest opacity-20 cursor-not-allowed">
                    Twitter
                  </button>
                </div>
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="p-12 bg-white/5 border border-white/10"
          >
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-2">
                <label className="text-xs font-bold tracking-[0.2em] uppercase text-white/40">Full Name</label>
                <input
                  type="text"
                  required
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  className="w-full bg-transparent border-b border-white/20 py-4 text-xl focus:border-[#ff6b00] focus:outline-none transition-colors placeholder:text-white/10"
                  placeholder="Type your name..."
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold tracking-[0.2em] uppercase text-white/40">Email Address</label>
                <input
                  type="email"
                  required
                  value={formState.email}
                  onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  className="w-full bg-transparent border-b border-white/20 py-4 text-xl focus:border-[#ff6b00] focus:outline-none transition-colors placeholder:text-white/10"
                  placeholder="Type your email..."
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold tracking-[0.2em] uppercase text-white/40">Message</label>
                <textarea
                  required
                  rows={4}
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  className="w-full bg-transparent border-b border-white/20 py-4 text-xl focus:border-[#ff6b00] focus:outline-none transition-colors placeholder:text-white/10 resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>

<button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-6 bg-white text-black font-black text-lg tracking-[0.3em] uppercase hover:bg-[#ff6b00] hover:text-white transition-all disabled:opacity-50"
                  style={{
                    clipPath: 'polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px)',
                  }}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="py-20 border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-white/40 text-sm tracking-widest uppercase">
            © 2024 Asad Shahzad. All Rights Reserved.
          </p>
          <div className="flex items-center gap-8">
             <span className="w-1.5 h-1.5 rounded-full bg-[#ff6b00]" />
             <p className="text-white font-bold tracking-widest uppercase text-sm">
               Computational Mathematics Researcher
             </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
