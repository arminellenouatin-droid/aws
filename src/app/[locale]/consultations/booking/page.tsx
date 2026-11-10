"use client";

import React, { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { Link } from "@/lib/i18n/routing";
import {
  DEFAULT_CONSULTATION_TYPES,
  DEFAULT_PRACTITIONERS,
  SUPPORTED_TIMEZONES,
  type TimeSlot,
} from "@/lib/constants/consultations";
import {
  Calendar,
  Clock,
  Sparkles,
  Shield,
  MessageSquare,
  Phone,
  Video,
  CheckCircle2,
  AlertCircle,
  Globe,
  User,
  ArrowRight,
  ArrowLeft,
  Lock,
} from "lucide-react";

function BookingWizardContent() {
  const t = useTranslations("booking");
  const tc = useTranslations("common");
  const searchParams = useSearchParams();

  // Query parameters pre-selection
  const initialTypeSlug = searchParams.get("type") || DEFAULT_CONSULTATION_TYPES[0].slug;
  const initialPractitionerSlug = searchParams.get("practitioner") || "";

  // Step state (1: Type, 2: Guide, 3: Format, 4: Slot, 5: Info, 6: Success)
  const [step, setStep] = useState(1);

  // Form state
  const [selectedTypeSlug, setSelectedTypeSlug] = useState(initialTypeSlug);
  const [selectedPractitionerSlug, setSelectedPractitionerSlug] = useState(initialPractitionerSlug);
  const [selectedFormat, setSelectedFormat] = useState<"chat" | "audio" | "video">("chat");
  const [selectedTimezone, setSelectedTimezone] = useState("Africa/Porto-Novo");
  
  // Date and slot selection
  const [selectedDate, setSelectedDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split("T")[0];
  });
  const [slots, setSlots] = useState<TimeSlot[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [isLoadingSlots, setIsLoadingSlots] = useState(false);

  // Client info state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [spiritualIntentions, setSpiritualIntentions] = useState("");

  // Submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [confirmedBooking, setConfirmedBooking] = useState<any>(null);

  // Current selections
  const currentType =
    DEFAULT_CONSULTATION_TYPES.find((t) => t.slug === selectedTypeSlug) ||
    DEFAULT_CONSULTATION_TYPES[0];
  const isFree = currentType.isFreeIntro || currentType.priceXof === 0;

  // Fetch slots whenever date, timezone, or practitioner changes
  useEffect(() => {
    async function fetchSlots() {
      setIsLoadingSlots(true);
      try {
        const prac = DEFAULT_PRACTITIONERS.find((p) => p.slug === selectedPractitionerSlug);
        const res = await fetch(
          `/api/consultations/availability?date=${selectedDate}&timezone=${selectedTimezone}&duration=${currentType.durationMinutes}${
            prac ? `&practitionerId=${prac.id}` : ""
          }`
        );
        const data = await res.json();
        setSlots(data.slots || []);
        setSelectedSlot(null);
      } catch {
        setSlots([]);
      } finally {
        setIsLoadingSlots(false);
      }
    }

    fetchSlots();
  }, [selectedDate, selectedTimezone, selectedPractitionerSlug, currentType.durationMinutes]);

  // Handle Booking Submission
  const handleConfirmBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSlot) return;

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const res = await fetch("/api/consultations/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          typeSlug: currentType.slug,
          practitionerSlug: selectedPractitionerSlug || undefined,
          format: selectedFormat,
          scheduledAt: selectedSlot.utcTimestamp,
          timezone: selectedTimezone,
          name,
          email,
          phone,
          spiritualIntentions,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.error === "FREE_INTRO_ALREADY_USED") {
          setErrorMessage(
            "Une consultation découverte gratuite a déjà été effectuée avec ce numéro ou cette adresse. Veuillez sélectionner une consultation complète."
          );
        } else {
          setErrorMessage(data.message || "Une erreur est survenue lors de la réservation.");
        }
        setIsSubmitting(false);
        return;
      }

      setConfirmedBooking(data.booking);
      setStep(6);
    } catch {
      setErrorMessage("Impossible de joindre le serveur. Veuillez vérifier votre connexion.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />

      <main className="flex-1 py-10 md:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { label: "Consultations", href: "/consultations" },
              { label: "Réservation" },
            ]}
          />

          {/* Stepper Progress */}
          {step < 6 && (
            <div className="mb-10">
              <div className="flex items-center justify-between text-xs text-muted-foreground font-semibold mb-3">
                <span className={step >= 1 ? "text-gold-400" : ""}>{t("step1")}</span>
                <span className={step >= 2 ? "text-gold-400" : ""}>{t("step2")}</span>
                <span className={step >= 3 ? "text-gold-400" : ""}>{t("step3")}</span>
                <span className={step >= 4 ? "text-gold-400" : ""}>{t("step4")}</span>
                <span className={step >= 5 ? "text-gold-400" : ""}>{t("step5")}</span>
              </div>
              <div className="h-1.5 w-full bg-cosmos-900 rounded-full overflow-hidden border border-gold-500/20">
                <div
                  className="h-full bg-gradient-to-r from-gold-500 to-gold-400 transition-all duration-300"
                  style={{ width: `${(step / 5) * 100}%` }}
                />
              </div>
            </div>
          )}

          {/* STEP 1: CHOOSE CONSULTATION TYPE */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <Badge variant="default" className="mb-2">Étape 1 sur 5</Badge>
                <h1 className="font-serif text-2xl sm:text-3xl font-bold text-foreground">
                  Choisissez la guidance adaptée à votre situation
                </h1>
                <p className="text-xs text-muted-foreground">
                  Sélectionnez le type d&apos;accompagnement souhaité.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {DEFAULT_CONSULTATION_TYPES.map((item) => {
                  const isSelected = item.slug === selectedTypeSlug;
                  const itemIsFree = item.isFreeIntro || item.priceXof === 0;

                  return (
                    <div
                      key={item.slug}
                      onClick={() => setSelectedTypeSlug(item.slug)}
                      className={`cursor-pointer rounded-2xl p-5 border transition-all ${
                        isSelected
                          ? "border-gold-400 bg-cosmos-900/90 shadow-lg shadow-gold-500/10 ring-1 ring-gold-400"
                          : "border-gold-500/20 bg-cosmos-950/60 hover:border-gold-500/40"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        {itemIsFree ? (
                          <Badge variant="emerald" className="text-[10px]">Séance Offerte</Badge>
                        ) : (
                          <Badge variant="default" className="text-[10px]">Guidance</Badge>
                        )}
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Clock className="h-3 w-3 text-gold-400" />
                          <span>{item.durationMinutes} min</span>
                        </span>
                      </div>

                      <h3 className="font-serif text-lg font-bold text-gold-300 mb-1">
                        {item.title}
                      </h3>
                      <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2 mb-4">
                        {item.description}
                      </p>

                      <div className="flex items-center justify-between pt-3 border-t border-gold-500/10 text-xs">
                        <span className="font-serif text-base font-bold text-foreground">
                          {itemIsFree ? "Gratuit" : `${item.priceXof.toLocaleString("fr-FR")} FCFA`}
                        </span>
                        <span className="text-gold-400 font-semibold">
                          {isSelected ? "✓ Sélectionné" : "Choisir"}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex justify-end pt-4">
                <Button
                  onClick={() => setStep(2)}
                  className="text-xs uppercase tracking-wider font-bold"
                >
                  <span>Continuer</span>
                  <ArrowRight className="h-3.5 w-3.5 ml-1" />
                </Button>
              </div>
            </div>
          )}

          {/* STEP 2: CHOOSE PRACTITIONER */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <Badge variant="default" className="mb-2">Étape 2 sur 5</Badge>
                <h1 className="font-serif text-2xl sm:text-3xl font-bold text-foreground">
                  Sélectionnez votre guide ou laissez le sanctuaire choisir
                </h1>
                <p className="text-xs text-muted-foreground">
                  Tous nos initiés sont certifiés par le conseil traditionnel d&apos;Africa World Saving.
                </p>
              </div>

              <div className="space-y-3">
                {/* Option: Any practitioner */}
                <div
                  onClick={() => setSelectedPractitionerSlug("")}
                  className={`cursor-pointer rounded-2xl p-4 border transition-all ${
                    selectedPractitionerSlug === ""
                      ? "border-gold-400 bg-cosmos-900/90 shadow-md ring-1 ring-gold-400"
                      : "border-gold-500/20 bg-cosmos-950/60 hover:border-gold-500/40"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold-500/20 text-gold-400">
                        <Sparkles className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-serif text-base font-bold text-foreground">
                          {t("anyPractitioner")}
                        </h3>
                        <p className="text-xs text-muted-foreground">
                          Attribution optimisée selon vos intentions et les disponibilités immédiates.
                        </p>
                      </div>
                    </div>
                    <span className="text-xs text-gold-400 font-semibold">
                      {selectedPractitionerSlug === "" ? "✓ Sélectionné" : "Choisir"}
                    </span>
                  </div>
                </div>

                {/* Individual Practitioners */}
                {DEFAULT_PRACTITIONERS.map((prac) => {
                  const isSelected = selectedPractitionerSlug === prac.slug;
                  return (
                    <div
                      key={prac.slug}
                      onClick={() => setSelectedPractitionerSlug(prac.slug)}
                      className={`cursor-pointer rounded-2xl p-4 border transition-all ${
                        isSelected
                          ? "border-gold-400 bg-cosmos-900/90 shadow-md ring-1 ring-gold-400"
                          : "border-gold-500/20 bg-cosmos-950/60 hover:border-gold-500/40"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold-500/10 text-gold-400 border border-gold-500/30">
                            <User className="h-5 w-5" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-serif text-base font-bold text-foreground">
                                {prac.name}
                              </h3>
                              <Badge variant="emerald" className="text-[9px] py-0 px-1.5">
                                Certifié
                              </Badge>
                            </div>
                            <p className="text-xs text-gold-400/90">{prac.title}</p>
                            <p className="text-[11px] text-muted-foreground mt-0.5">
                              {prac.experienceYears} ans d&apos;exercice • {prac.languages.join(", ")}
                            </p>
                          </div>
                        </div>

                        <span className="text-xs text-gold-400 font-semibold">
                          {isSelected ? "✓ Sélectionné" : "Choisir"}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex justify-between pt-4">
                <Button variant="ghost" onClick={() => setStep(1)} className="text-xs">
                  <ArrowLeft className="h-3.5 w-3.5 mr-1" />
                  <span>Retour</span>
                </Button>
                <Button onClick={() => setStep(3)} className="text-xs uppercase tracking-wider font-bold">
                  <span>Continuer</span>
                  <ArrowRight className="h-3.5 w-3.5 ml-1" />
                </Button>
              </div>
            </div>
          )}

          {/* STEP 3: CHOOSE FORMAT */}
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <Badge variant="default" className="mb-2">Étape 3 sur 5</Badge>
                <h1 className="font-serif text-2xl sm:text-3xl font-bold text-foreground">
                  Choisissez le format de votre consultation
                </h1>
                <p className="text-xs text-muted-foreground">
                  Toutes les séances se déroulent directement dans votre navigateur sur PC ou mobile.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {currentType.allowedFormats.includes("chat") && (
                  <div
                    onClick={() => setSelectedFormat("chat")}
                    className={`cursor-pointer rounded-2xl p-6 border transition-all ${
                      selectedFormat === "chat"
                        ? "border-gold-400 bg-cosmos-900/90 shadow-md ring-1 ring-gold-400"
                        : "border-gold-500/20 bg-cosmos-950/60 hover:border-gold-500/40"
                    }`}
                  >
                    <MessageSquare className="h-8 w-8 text-gold-400 mb-3" />
                    <h3 className="font-serif text-lg font-bold text-foreground mb-1">
                      Chat Écrit Crypté
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Échange par messagerie sécurisée. Conservez l&apos;intégralité de vos conseils écrits.
                    </p>
                  </div>
                )}

                {currentType.allowedFormats.includes("audio") && (
                  <div
                    onClick={() => setSelectedFormat("audio")}
                    className={`cursor-pointer rounded-2xl p-6 border transition-all ${
                      selectedFormat === "audio"
                        ? "border-gold-400 bg-cosmos-900/90 shadow-md ring-1 ring-gold-400"
                        : "border-gold-500/20 bg-cosmos-950/60 hover:border-gold-500/40"
                    }`}
                  >
                    <Phone className="h-8 w-8 text-gold-400 mb-3" />
                    <h3 className="font-serif text-lg font-bold text-foreground mb-1">
                      Appel Vocal Chiffré
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      La chaleur de la voix en direct. Fonctionne même avec une connexion mobile 3G instable.
                    </p>
                  </div>
                )}

                {currentType.allowedFormats.includes("video") && (
                  <div
                    onClick={() => setSelectedFormat("video")}
                    className={`cursor-pointer rounded-2xl p-6 border transition-all ${
                      selectedFormat === "video"
                        ? "border-gold-400 bg-cosmos-900/90 shadow-md ring-1 ring-gold-400"
                        : "border-gold-500/20 bg-cosmos-950/60 hover:border-gold-500/40"
                    }`}
                  >
                    <Video className="h-8 w-8 text-gold-400 mb-3" />
                    <h3 className="font-serif text-lg font-bold text-foreground mb-1">
                      Visioconférence Sacrée
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Face-à-face vidéo en temps réel pour observer les éléments sacrés et le tirage du Fâ.
                    </p>
                  </div>
                )}
              </div>

              <div className="flex justify-between pt-4">
                <Button variant="ghost" onClick={() => setStep(2)} className="text-xs">
                  <ArrowLeft className="h-3.5 w-3.5 mr-1" />
                  <span>Retour</span>
                </Button>
                <Button onClick={() => setStep(4)} className="text-xs uppercase tracking-wider font-bold">
                  <span>Continuer</span>
                  <ArrowRight className="h-3.5 w-3.5 ml-1" />
                </Button>
              </div>
            </div>
          )}

          {/* STEP 4: DATE, TIMEZONE & TIME SLOT */}
          {step === 4 && (
            <div className="space-y-6">
              <div>
                <Badge variant="default" className="mb-2">Étape 4 sur 5</Badge>
                <h1 className="font-serif text-2xl sm:text-3xl font-bold text-foreground">
                  Choisissez la date et votre créneau horaire
                </h1>
                <p className="text-xs text-muted-foreground">
                  Les heures s&apos;adaptent automatiquement à votre fuseau horaire de résidence.
                </p>
              </div>

              {/* Timezone Selector */}
              <div className="p-4 rounded-2xl border border-gold-500/20 bg-cosmos-900/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-xs font-semibold text-foreground">
                  <Globe className="h-4 w-4 text-gold-400" />
                  <span>{t("timezone")} :</span>
                </div>
                <select
                  value={selectedTimezone}
                  onChange={(e) => setSelectedTimezone(e.target.value)}
                  className="rounded-xl border border-gold-500/30 bg-cosmos-950 px-3 py-1.5 text-xs text-foreground focus:border-gold-400 focus:outline-none"
                >
                  {SUPPORTED_TIMEZONES.map((tz) => (
                    <option key={tz.value} value={tz.value}>
                      {tz.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Date Input */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                  <Calendar className="h-4 w-4 text-gold-400" />
                  <span>{t("selectDate")} :</span>
                </label>
                <input
                  type="date"
                  value={selectedDate}
                  min={new Date().toISOString().split("T")[0]}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full sm:w-64 rounded-xl border border-gold-500/30 bg-cosmos-950/80 px-4 py-2.5 text-xs text-foreground focus:border-gold-400 focus:outline-none"
                />
              </div>

              {/* Slots Grid */}
              <div className="space-y-3">
                <h3 className="text-xs uppercase tracking-wider font-semibold text-gold-400">
                  {t("availableSlots")}
                </h3>

                {isLoadingSlots ? (
                  <div className="py-8 text-center text-xs text-muted-foreground">
                    Chargement des créneaux en cours...
                  </div>
                ) : slots.length === 0 ? (
                  <p className="text-xs text-muted-foreground italic">
                    {t("noSlots")}
                  </p>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2.5">
                    {slots.map((slot) => {
                      const isSelected = selectedSlot?.utcTimestamp === slot.utcTimestamp;

                      return (
                        <button
                          key={slot.utcTimestamp}
                          type="button"
                          disabled={!slot.isAvailable}
                          onClick={() => setSelectedSlot(slot)}
                          className={`rounded-xl py-2.5 px-3 text-xs font-semibold transition-all ${
                            !slot.isAvailable
                              ? "opacity-30 border border-cosmos-800 bg-cosmos-950 text-muted-foreground cursor-not-allowed"
                              : isSelected
                              ? "bg-gradient-to-r from-gold-500 to-gold-400 text-cosmos-950 font-bold shadow-md shadow-gold-500/20"
                              : "border border-gold-500/25 bg-cosmos-900/60 text-gold-200 hover:border-gold-400 hover:bg-gold-500/10"
                          }`}
                        >
                          {slot.timeStr}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              <div className="flex justify-between pt-4">
                <Button variant="ghost" onClick={() => setStep(3)} className="text-xs">
                  <ArrowLeft className="h-3.5 w-3.5 mr-1" />
                  <span>Retour</span>
                </Button>
                <Button
                  disabled={!selectedSlot}
                  onClick={() => setStep(5)}
                  className="text-xs uppercase tracking-wider font-bold"
                >
                  <span>Continuer</span>
                  <ArrowRight className="h-3.5 w-3.5 ml-1" />
                </Button>
              </div>
            </div>
          )}

          {/* STEP 5: CONTACT DETAILS & INTENTIONS */}
          {step === 5 && (
            <form onSubmit={handleConfirmBooking} className="space-y-6">
              <div>
                <Badge variant="default" className="mb-2">Étape 5 sur 5</Badge>
                <h1 className="font-serif text-2xl sm:text-3xl font-bold text-foreground">
                  Vos coordonnées & intentions de guidance
                </h1>
                <p className="text-xs text-muted-foreground">
                  Ces informations sont cryptées et exclusivement transmises à votre guide.
                </p>
              </div>

              {errorMessage && (
                <div className="p-4 rounded-xl border border-red-500/30 bg-red-950/40 text-xs text-red-200 flex items-start gap-2.5">
                  <AlertCircle className="h-4 w-4 text-red-400 shrink-0 mt-0.5" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <div className="glass-panel rounded-2xl p-6 border border-gold-500/25 bg-cosmos-900/70 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-foreground">
                      {t("name")} *
                    </label>
                    <input
                      required
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Ex : Aminata Touré"
                      className="w-full rounded-xl border border-gold-500/30 bg-cosmos-950/80 px-4 py-2.5 text-xs text-foreground focus:border-gold-400 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-foreground">
                      {t("email")} *
                    </label>
                    <input
                      required
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="aminata@exemple.com"
                      className="w-full rounded-xl border border-gold-500/30 bg-cosmos-950/80 px-4 py-2.5 text-xs text-foreground focus:border-gold-400 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-foreground">
                    {t("phone")} *
                  </label>
                  <input
                    required
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+229 97 00 00 00 (Numéro WhatsApp ou Mobile Money)"
                    className="w-full rounded-xl border border-gold-500/30 bg-cosmos-950/80 px-4 py-2.5 text-xs text-foreground focus:border-gold-400 focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-foreground">
                    {t("spiritualIntentions")}
                  </label>
                  <textarea
                    rows={4}
                    value={spiritualIntentions}
                    onChange={(e) => setSpiritualIntentions(e.target.value)}
                    placeholder={t("intentionsPlaceholder")}
                    className="w-full rounded-xl border border-gold-500/30 bg-cosmos-950/80 px-4 py-2.5 text-xs text-foreground focus:border-gold-400 focus:outline-none"
                  />
                </div>
              </div>

              {/* Summary Recap Box */}
              <div className="p-4 rounded-xl border border-gold-500/20 bg-cosmos-950/60 flex items-center justify-between text-xs">
                <div>
                  <span className="text-muted-foreground block">Récapitulatif :</span>
                  <span className="font-semibold text-foreground">
                    {currentType.title} • {selectedSlot?.timeStr} ({selectedTimezone})
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-muted-foreground block">Total :</span>
                  <span className="font-serif text-base font-bold text-gold-300">
                    {isFree ? "Offert (0 FCFA)" : `${currentType.priceXof.toLocaleString("fr-FR")} FCFA`}
                  </span>
                </div>
              </div>

              <div className="flex justify-between pt-4">
                <Button variant="ghost" onClick={() => setStep(4)} className="text-xs">
                  <ArrowLeft className="h-3.5 w-3.5 mr-1" />
                  <span>Retour</span>
                </Button>
                <Button
                  type="submit"
                  isLoading={isSubmitting}
                  className="text-xs uppercase tracking-wider font-bold"
                >
                  <CheckCircle2 className="h-3.5 w-3.5 mr-1" />
                  <span>{t("confirmBooking")}</span>
                </Button>
              </div>
            </form>
          )}

          {/* STEP 6: CONFIRMATION SUCCESS */}
          {step === 6 && confirmedBooking && (
            <div className="glass-panel rounded-3xl p-8 border border-gold-500/30 bg-cosmos-900/90 shadow-2xl text-center space-y-6">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emeraldSacred-500/20 border border-emeraldSacred-500/40 text-emeraldSacred-400">
                <CheckCircle2 className="h-8 w-8" />
              </div>

              <div className="space-y-2">
                <Badge variant="emerald">{t("successTitle")}</Badge>
                <h1 className="font-serif text-3xl font-bold text-foreground">
                  Votre sanctuaire est prêt
                </h1>
                <p className="text-xs sm:text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
                  {t("successSubtitle")}
                </p>
              </div>

              {/* Booking Voucher Details */}
              <div className="max-w-md mx-auto p-5 rounded-2xl border border-gold-500/20 bg-cosmos-950/80 text-xs text-left space-y-2.5">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Numéro de session :</span>
                  <span className="font-mono text-gold-300">{confirmedBooking.meetRoomId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Séance :</span>
                  <span className="font-semibold text-foreground">{confirmedBooking.consultationTitle}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Guide :</span>
                  <span className="font-semibold text-gold-400">{confirmedBooking.practitionerName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Format :</span>
                  <span className="uppercase text-foreground">{confirmedBooking.format}</span>
                </div>
                <div className="flex justify-between border-t border-gold-500/10 pt-2">
                  <span className="text-muted-foreground">Statut :</span>
                  <span className="text-emeraldSacred-400 font-bold uppercase">
                    {confirmedBooking.status === "confirmed" ? "Confirmé" : "En attente de règlement"}
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
                <Link
                  href={`/consultations/${confirmedBooking.id}/room`}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-gold-500 to-gold-400 px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-cosmos-950 shadow-lg shadow-gold-500/25 hover:from-gold-400 hover:to-gold-300 transition-all"
                >
                  <Lock className="h-4 w-4" />
                  <span>{t("enterRoom")}</span>
                </Link>

                <Link
                  href="/consultations"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-gold-500/30 bg-cosmos-950 px-6 py-3.5 text-xs font-semibold text-gold-300 hover:bg-gold-500/10 transition-all"
                >
                  <span>Retour aux consultations</span>
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}

export default function BookingWizardPage() {
  return (
    <React.Suspense
      fallback={
        <div className="min-h-screen bg-cosmos-950 flex items-center justify-center text-gold-400">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gold-400" />
        </div>
      }
    >
      <BookingWizardContent />
    </React.Suspense>
  );
}
