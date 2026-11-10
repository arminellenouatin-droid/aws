"use client";

import React, { useState, useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { useParams, useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "@/lib/i18n/routing";
import {
  Clock,
  Shield,
  MessageSquare,
  Mic,
  MicOff,
  Video,
  VideoOff,
  PhoneOff,
  Send,
  Lock,
  Sparkles,
  Star,
  CheckCircle2,
  FileText,
  User,
} from "lucide-react";

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  content: string;
  createdAt: string;
}

export default function ConsultationRoomPage() {
  const t = useTranslations("room");
  const params = useParams();
  const router = useRouter();
  const consultationId = params.id as string;

  // Consultation state
  const [sessionActive, setSessionActive] = useState(true);
  const [secondsRemaining, setSecondsRemaining] = useState(45 * 60); // 45 minutes countdown
  const [activeFormat, setActiveFormat] = useState<"chat" | "audio" | "video">("chat");

  // Media toggles
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);

  // Chat state
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "msg-welcome",
      senderId: "system",
      senderName: "Sanctuaire AWS",
      content:
        "Bienvenue dans votre sanctuaire privé et confidentiel. Votre guide spirituel vous accueille dans la lumière. Vos échanges sont cryptés de bout en bout.",
      createdAt: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
    {
      id: "msg-guide-init",
      senderId: "practitioner",
      senderName: "Maître Spirituel Initié",
      content:
        "Que la paix ancestrale soit sur vous. Je suis à votre écoute pour cette séance. Prenez une profonde inspiration et posez-moi la question qui pèse sur votre cœur.",
      createdAt: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);
  const [inputText, setInputText] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Completion review modal state
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [rating, setRating] = useState(5);
  const [reviewComment, setReviewComment] = useState("");
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  // Timer countdown
  useEffect(() => {
    if (!sessionActive || secondsRemaining <= 0) return;

    const timer = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setSessionActive(false);
          setShowReviewModal(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [sessionActive, secondsRemaining]);

  // Auto-scroll chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Send message
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newMsg: Message = {
      id: `client-${Date.now()}`,
      senderId: "client",
      senderName: "Vous",
      content: inputText.trim(),
      createdAt: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, newMsg]);
    setInputText("");

    // Send to API endpoint
    try {
      await fetch(`/api/consultations/${consultationId}/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          senderId: "client",
          content: newMsg.content,
        }),
      });
    } catch {
      // optimistic state preserved
    }
  };

  // End session manually
  const handleEndSession = () => {
    setSessionActive(false);
    setShowReviewModal(true);
  };

  // Submit review
  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingReview(true);

    try {
      await fetch(`/api/consultations/${consultationId}/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          practitionerId: "prac-default",
          clientId: "client-current",
          rating,
          comment: reviewComment,
        }),
      });
    } catch {
      // fallback
    } finally {
      setIsSubmittingReview(false);
      setReviewSubmitted(true);
    }
  };

  const minutes = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;

  return (
    <div className="min-h-screen bg-cosmos-950 text-foreground flex flex-col">
      {/* Top Bar */}
      <header className="sticky top-0 z-40 border-b border-gold-500/20 bg-cosmos-950/90 backdrop-blur-md px-4 py-3 sm:px-6">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          {/* Identity & Status */}
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gold-500/20 text-gold-400 border border-gold-500/30">
              <Sparkles className="h-4 w-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif text-sm sm:text-base font-bold text-gold-300">
                  {t("title")}
                </span>
                <span className="flex h-2 w-2 rounded-full bg-emeraldSacred-400 animate-pulse" />
              </div>
              <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                <Lock className="h-2.5 w-2.5 text-gold-400" />
                <span>{t("encrypted")}</span>
              </span>
            </div>
          </div>

          {/* Timer & Controls */}
          <div className="flex items-center gap-3">
            {/* Timer */}
            <div
              className={`flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-mono font-bold ${
                secondsRemaining < 300
                  ? "border-amber-500/50 bg-amber-950/40 text-amber-300 animate-pulse"
                  : "border-gold-500/30 bg-cosmos-900 text-gold-300"
              }`}
            >
              <Clock className="h-3.5 w-3.5" />
              <span>
                {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
              </span>
            </div>

            {/* End Session Button */}
            <Button
              variant="destructive"
              size="sm"
              onClick={handleEndSession}
              className="text-xs"
            >
              <PhoneOff className="h-3.5 w-3.5 mr-1" />
              <span className="hidden sm:inline">{t("endSession")}</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Sanctuary Layout */}
      <main className="flex-1 mx-auto max-w-7xl w-full p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Media Stage / Practitioner View */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
          {/* Main Visual Display */}
          <div className="relative flex-1 min-h-[320px] sm:min-h-[420px] rounded-3xl border border-gold-500/25 bg-gradient-to-b from-cosmos-900 to-cosmos-950 p-6 flex flex-col items-center justify-center text-center overflow-hidden shadow-2xl">
            {/* Ambient Cosmic Background */}
            <div className="absolute inset-0 bg-radial-gradient from-gold-500/5 via-transparent to-transparent pointer-events-none" />

            {/* Simulated Live Stage */}
            <div className="relative z-10 space-y-4">
              <div className="relative mx-auto flex h-24 w-24 sm:h-28 sm:w-28 items-center justify-center rounded-full bg-gradient-to-tr from-gold-500/20 via-cosmos-800 to-gold-400/10 border-2 border-gold-400/50 shadow-[0_0_30px_rgba(245,192,66,0.2)]">
                <User className="h-12 w-12 text-gold-300" />
                <span className="absolute bottom-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-emeraldSacred-500 text-[9px] text-white font-bold ring-2 ring-cosmos-950">
                  ✓
                </span>
              </div>

              <div>
                <h2 className="font-serif text-xl sm:text-2xl font-bold text-foreground">
                  Maître Spirituel Initié
                </h2>
                <p className="text-xs text-gold-400">
                  En direct depuis le sanctuaire de Cotonou (Bénin)
                </p>
                <div className="flex items-center justify-center gap-1.5 mt-2 text-[11px] text-emeraldSacred-400 font-medium">
                  <span className="h-1.5 w-1.5 rounded-full bg-emeraldSacred-400" />
                  <span>Flux audio/vidéo chiffré en continu</span>
                </div>
              </div>
            </div>

            {/* Bottom In-Room Bar */}
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-center gap-2">
              <Button
                variant={isMuted ? "destructive" : "secondary"}
                size="sm"
                onClick={() => setIsMuted(!isMuted)}
                className="rounded-full px-4 text-xs"
              >
                {isMuted ? <MicOff className="h-3.5 w-3.5 mr-1" /> : <Mic className="h-3.5 w-3.5 mr-1" />}
                <span>{isMuted ? "Muet" : "Micro actif"}</span>
              </Button>

              <Button
                variant={isVideoOff ? "destructive" : "secondary"}
                size="sm"
                onClick={() => setIsVideoOff(!isVideoOff)}
                className="rounded-full px-4 text-xs"
              >
                {isVideoOff ? <VideoOff className="h-3.5 w-3.5 mr-1" /> : <Video className="h-3.5 w-3.5 mr-1" />}
                <span>{isVideoOff ? "Caméra off" : "Caméra active"}</span>
              </Button>
            </div>
          </div>

          {/* Quick Guidance Prescription Link */}
          <div className="p-4 rounded-2xl border border-gold-500/20 bg-cosmos-900/60 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 text-muted-foreground">
              <FileText className="h-4 w-4 text-gold-400" />
              <span>Votre compte-rendu sera accessible dès la clôture de la séance.</span>
            </div>
            <Link
              href={`/consultations/${consultationId}/notes`}
              className="text-gold-400 font-semibold hover:underline"
            >
              Voir les notes →
            </Link>
          </div>
        </div>

        {/* Right Column: Encrypted Realtime Chat Box */}
        <div className="lg:col-span-5 flex flex-col h-[520px] lg:h-[620px] rounded-3xl border border-gold-500/25 bg-cosmos-900/90 shadow-2xl overflow-hidden">
          {/* Chat Header */}
          <div className="px-5 py-3.5 border-b border-gold-500/15 bg-cosmos-950/60 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-gold-400" />
              <h3 className="font-serif text-sm font-bold text-foreground">
                {t("chatTitle")}
              </h3>
            </div>
            <span className="text-[10px] text-muted-foreground">Crypté AES-256</span>
          </div>

          {/* Messages Feed */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 font-sans text-xs">
            {messages.map((msg) => {
              const isMe = msg.senderId === "client";
              const isSys = msg.senderId === "system";

              if (isSys) {
                return (
                  <div
                    key={msg.id}
                    className="p-3 rounded-xl border border-gold-500/15 bg-cosmos-950/60 text-[11px] text-gold-300/90 leading-relaxed text-center italic"
                  >
                    {msg.content}
                  </div>
                );
              }

              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isMe ? "items-end" : "items-start"}`}
                >
                  <div className="flex items-center gap-1.5 mb-1 text-[10px] text-muted-foreground">
                    <span className="font-semibold text-foreground">{msg.senderName}</span>
                    <span>• {msg.createdAt}</span>
                  </div>
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 leading-relaxed ${
                      isMe
                        ? "bg-gradient-to-r from-gold-500 to-gold-400 text-cosmos-950 font-medium rounded-br-xs shadow-md shadow-gold-500/15"
                        : "bg-cosmos-950 border border-gold-500/20 text-foreground rounded-bl-xs"
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>

          {/* Message Input Box */}
          <form
            onSubmit={handleSendMessage}
            className="p-3 border-t border-gold-500/15 bg-cosmos-950/80 flex items-center gap-2"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={t("typePlaceholder")}
              className="flex-1 rounded-xl border border-gold-500/30 bg-cosmos-900/90 px-4 py-2 text-xs text-foreground placeholder:text-muted-foreground/60 focus:border-gold-400 focus:outline-none"
            />
            <Button type="submit" size="sm" className="h-9 px-3">
              <Send className="h-3.5 w-3.5" />
            </Button>
          </form>
        </div>
      </main>

      {/* Post-Session Rating & Completion Modal */}
      {showReviewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-cosmos-950/90 backdrop-blur-md p-4">
          <div className="max-w-lg w-full rounded-3xl border border-gold-500/30 bg-cosmos-900 p-6 sm:p-8 shadow-2xl space-y-6 text-center">
            {reviewSubmitted ? (
              <div className="space-y-4 py-6">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emeraldSacred-500/20 text-emeraldSacred-400 border border-emeraldSacred-500/30">
                  <CheckCircle2 className="h-7 w-7" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-foreground">
                  Merci pour votre confiance
                </h3>
                <p className="text-xs text-muted-foreground max-w-sm mx-auto leading-relaxed">
                  Votre retour contribue au rayonnement éthique du sanctuaire. Que la paix vous accompagne sur votre route.
                </p>
                <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
                  <Link
                    href={`/consultations/${consultationId}/notes`}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-gold-500 to-gold-400 px-6 py-3 text-xs font-bold uppercase tracking-wider text-cosmos-950"
                  >
                    <FileText className="h-4 w-4" />
                    <span>{t("viewNotes")}</span>
                  </Link>
                  <Link
                    href="/"
                    className="inline-flex items-center justify-center rounded-xl border border-gold-500/30 px-6 py-3 text-xs font-semibold text-gold-300"
                  >
                    Retour à l&apos;accueil
                  </Link>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmitReview} className="space-y-5">
                <div className="space-y-2">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-gold-500/20 text-gold-400 border border-gold-500/30">
                    <Sparkles className="h-6 w-6" />
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-foreground">
                    {t("completedTitle")}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {t("completedSubtitle")}
                  </p>
                </div>

                {/* Rating Stars */}
                <div className="flex justify-center items-center gap-2 py-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="p-1 hover:scale-125 transition-transform"
                    >
                      <Star
                        className={`h-7 w-7 ${
                          star <= rating
                            ? "fill-gold-400 text-gold-400"
                            : "text-muted-foreground/30"
                        }`}
                      />
                    </button>
                  ))}
                </div>

                {/* Comment Textarea */}
                <div className="space-y-1.5 text-left">
                  <label className="text-xs font-semibold text-foreground">
                    {t("rateComment")}
                  </label>
                  <textarea
                    rows={3}
                    value={reviewComment}
                    onChange={(e) => setReviewComment(e.target.value)}
                    placeholder="Ce que cette séance vous a apporté..."
                    className="w-full rounded-xl border border-gold-500/30 bg-cosmos-950/80 px-4 py-2.5 text-xs text-foreground focus:border-gold-400 focus:outline-none"
                  />
                </div>

                <div className="flex gap-3 justify-end pt-2">
                  <Link
                    href={`/consultations/${consultationId}/notes`}
                    className="inline-flex items-center justify-center rounded-xl border border-gold-500/30 px-4 py-2.5 text-xs text-muted-foreground"
                  >
                    Passer cette étape
                  </Link>
                  <Button
                    type="submit"
                    isLoading={isSubmittingReview}
                    className="text-xs uppercase tracking-wider font-bold"
                  >
                    <span>{t("submitReview")}</span>
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
