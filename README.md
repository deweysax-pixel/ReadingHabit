# 🧭 ReadwiseRoutines (nom provisoire)
**Construis une routine de lecture intelligente, mesurable et motivante** autour du leadership, du coaching, du self-awareness et de la communication — avec suivi de progression, révisions espacées et résumés assistés par IA.

> _“What gets measured gets improved.”_ — Peter Drucker

![Status](https://img.shields.io/badge/status-MVP%20planning-blue)
![Tests](https://img.shields.io/badge/tests-incoming-lightgrey)
![License](https://img.shields.io/badge/license-MIT-green)

---

## 🚀 TL;DR
- Choisis des **thématiques** (Leadership, Coaching, Self-Awareness, Communication, Culture d’équipe, Négociation…)
- L’app te propose un **plan de lecture** (articles, chapitres, vidéos longues, papiers PDF) adapté à ta **disponibilité quotidienne**.
- Tu suis ta **progression** (temps, pages, %), captures des **insights** et revois les points clés grâce à un **spaced repetition** simple.
- L’IA t’aide à **résumer**, **questionner** et **transformer** tes lectures en **actions concrètes**.

---

## 🎯 Objectifs produit
1. **Discipline de lecture** simple et fun (petits objectifs quotidiens).
2. **Apprentissage actif** (notes guidées, flashcards, quiz express).
3. **Transfert au réel** (micro-actions & revues hebdomadaires).
4. **Mesure claire** (tableau de bord + badges de constance).

---

## 📚 Thématiques (starter pack)
- Leadership (vision, décisions, courage managérial, servant leadership)
- Coaching (questions puissantes, posture, feedback, GROW/OSCAR)
- Self-Awareness (forces/faiblesses, triggers, valeurs, biais)
- Communication (storytelling, clarté, non-verbal, écoute)
- Team Dynamics (psychological safety, collaboration, rituals)
- Négociation & Influence (BATNA, ancrage, empathie tactique)
- Productivité & Focus (deep work, priorisation, délégation)
- Change & Culture (change rapide, adoption, rituels d’équipe)

---

## 🧩 Fonctionnalités
### MVP (v1)
- Onboarding ultra court : thèmes + objectif quotidien (ex : 20 min/jour).
- Plan de lecture auto-généré (liste d’items) + **mode session** (timer).
- Progression : % terminé, temps cumulé, séquences de jours (“streaks”).
- Notes guidées (Pourquoi c’est important ? Exemple concret ? Action demain ?)
- **Résumé IA** (100/300 mots) d’un item lu + **3 questions de réflexion**.
- **Révisions espacées** (J+2 / J+7 / J+30) sur les notes/insights clés.
- Tableau de bord : temps/semaine, thèmes les + lus, actions faites.

### Next (v1.1+)
- Import **Readwise/Kindle/Notion/URL/PDF**.
- Flashcards auto à partir des notes.
- Partage “lecture de la semaine” (PDF/PNG export).
- Multi-device & offline first (Expo/React Native).

---

## 🏗️ Architecture suggérée
- **Frontend** : Next.js (App Router), TypeScript, Tailwind.
- **Backend** : Next.js API routes (ou Fastify) + **Supabase** (Postgres & Auth) _ou_ SQLite pour un MVP local.
- **IA** : OpenAI API (résumés, questions, catégorisation).  
- **State** : React Query / Zustand.
- **Tests** : Vitest + Playwright.
- **CI** : GitHub Actions.

