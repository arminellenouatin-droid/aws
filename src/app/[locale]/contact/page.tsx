"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import {
  MessageSquare,
  Sparkles,
  Phone,
  Mail,
  MapPin,
  Send,
  CheckCircle2,
  Lock,
} from "lucide-react";

export default function ContactPage() {
  const t = useTranslations("contact");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API submission
    await new Promise((r) => setTimeout(r, 1200));
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  return (
    <>
      <Navbar />

      <main className="flex-1">
        {/* HEADER */}
        <section className="relative overflow-hidden pt-12 pb-16 md:pt-16 md:pb-20 border-b border-gold-500/15">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-gold-500/10 via-cosmos-800/20 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Breadcrumbs items={[{ label: "Contact" }]} />

            <div className="max-w-3xl space-y-4">
              <Badge variant="default" className="gap-1.5 py-1.5 px-4 text-xs">
                <Sparkles className="h-3.5 w-3.5 text-gold-400" />
                <span>Sanctuaire d&apos;Écoute</span>
              </Badge>

              <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-foreground leading-[1.15]">
                Une oreille attentive pour{" "}
                <span className="text-gold-gradient">vous accompagner</span>
              </h1>

              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed font-sans">
                {t("subtitle")}
              </p>
            </div>
          </div>
        </section>

        {/* CONTENT & FORM */}
        <section className="py-14 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              {/* Form Column */}
              <div className="lg:col-span-7">
                <div className="glass-panel rounded-3xl p-8 border border-gold-500/25 bg-cosmos-900/80 shadow-2xl">
                  {isSubmitted ? (
                    <div className="text-center py-12 space-y-4">
                      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emeraldSacred-500/20 border border-emeraldSacred-500/40 text-emeraldSacred-400">
                        <CheckCircle2 className="h-8 w-8" />
                      </div>
                      <h2 className="font-serif text-2xl font-bold text-foreground">
                        Message Transmis
                      </h2>
                      <p className="text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
                        {t("success")}
                      </p>
                      <Button
                        variant="secondary"
                        onClick={() => {
                          setIsSubmitted(false);
                          setFormData({
                            name: "",
                            email: "",
                            phone: "",
                            subject: "",
                            message: "",
                          });
                        }}
                      >
                        Envoyer un autre message
                      </Button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="space-y-1">
                        <h2 className="font-serif text-xl font-bold text-gold-300">
                          Formulaire Confidentiel
                        </h2>
                        <p className="text-xs text-muted-foreground">
                          Vos données restent protégées et ne sont jamais partagées à des tiers.
                        </p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold text-foreground">
                            {t("formName")} *
                          </label>
                          <input
                            required
                            type="text"
                            value={formData.name}
                            onChange={(e) =>
                              setFormData({ ...formData, name: e.target.value })
                            }
                            className="w-full rounded-xl border border-gold-500/30 bg-cosmos-950/80 px-4 py-2.5 text-xs text-foreground placeholder:text-muted-foreground/60 focus:border-gold-400 focus:outline-none focus:ring-1 focus:ring-gold-400"
                            placeholder="Ex : Koffi Mensah"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold text-foreground">
                            {t("formEmail")} *
                          </label>
                          <input
                            required
                            type="email"
                            value={formData.email}
                            onChange={(e) =>
                              setFormData({ ...formData, email: e.target.value })
                            }
                            className="w-full rounded-xl border border-gold-500/30 bg-cosmos-950/80 px-4 py-2.5 text-xs text-foreground placeholder:text-muted-foreground/60 focus:border-gold-400 focus:outline-none focus:ring-1 focus:ring-gold-400"
                            placeholder="koffi@exemple.com"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold text-foreground">
                            {t("formPhone")}
                          </label>
                          <input
                            type="tel"
                            value={formData.phone}
                            onChange={(e) =>
                              setFormData({ ...formData, phone: e.target.value })
                            }
                            className="w-full rounded-xl border border-gold-500/30 bg-cosmos-950/80 px-4 py-2.5 text-xs text-foreground placeholder:text-muted-foreground/60 focus:border-gold-400 focus:outline-none focus:ring-1 focus:ring-gold-400"
                            placeholder="+229 97 00 00 00"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold text-foreground">
                            {t("formSubject")} *
                          </label>
                          <input
                            required
                            type="text"
                            value={formData.subject}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                subject: e.target.value,
                              })
                            }
                            className="w-full rounded-xl border border-gold-500/30 bg-cosmos-950/80 px-4 py-2.5 text-xs text-foreground placeholder:text-muted-foreground/60 focus:border-gold-400 focus:outline-none focus:ring-1 focus:ring-gold-400"
                            placeholder="Question sur une séance, rituel..."
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-foreground">
                          {t("formMessage")} *
                        </label>
                        <textarea
                          required
                          rows={5}
                          value={formData.message}
                          onChange={(e) =>
                            setFormData({ ...formData, message: e.target.value })
                          }
                          className="w-full rounded-xl border border-gold-500/30 bg-cosmos-950/80 px-4 py-2.5 text-xs text-foreground placeholder:text-muted-foreground/60 focus:border-gold-400 focus:outline-none focus:ring-1 focus:ring-gold-400"
                          placeholder="Expliquez-nous votre situation avec franchise et sérénité..."
                        />
                      </div>

                      <Button
                        type="submit"
                        isLoading={isSubmitting}
                        className="w-full text-xs font-bold uppercase tracking-wider"
                      >
                        <Send className="h-3.5 w-3.5 mr-1" />
                        <span>{t("submit")}</span>
                      </Button>
                    </form>
                  )}
                </div>
              </div>

              {/* Sidebar Channels */}
              <div className="lg:col-span-5 space-y-6">
                {/* WhatsApp Direct */}
                <div className="p-6 rounded-3xl border border-emeraldSacred-500/30 bg-gradient-to-br from-cosmos-900 to-emeraldSacred-950/20 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emeraldSacred-500/20 text-emeraldSacred-400 border border-emeraldSacred-500/40">
                      <Phone className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-serif text-lg font-bold text-foreground">
                        {t("whatsappDirect")}
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        Réponse sous 2 à 4 heures
                      </p>
                    </div>
                  </div>

                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {t("whatsappText")}
                  </p>

                  <a
                    href="https://wa.me/22997000000"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emeraldSacred-600 px-5 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-emeraldSacred-600/25 hover:bg-emeraldSacred-500 transition-all"
                  >
                    <span>Écrire sur WhatsApp</span>
                  </a>
                </div>

                {/* Headquarters Info */}
                <div className="p-6 rounded-3xl border border-gold-500/20 bg-cosmos-900/60 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gold-500/15 text-gold-400 border border-gold-500/30">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-serif text-lg font-bold text-foreground">
                        {t("locationTitle")}
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        Siège administratif & légal
                      </p>
                    </div>
                  </div>

                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {t("locationText")}
                  </p>

                  <div className="pt-3 border-t border-gold-500/10 space-y-2 text-xs text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Mail className="h-3.5 w-3.5 text-gold-400" />
                      <span>contact@africaworldsaving.com</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Lock className="h-3.5 w-3.5 text-emeraldSacred-400" />
                      <span>Conforme APDP Bénin & RGPD</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
