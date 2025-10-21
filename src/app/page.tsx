"use client"

import Navigation from "@/components/nouveau/Navigation"
import HeroV2 from "@/components/nouveau/HeroV2"
import RentabiliteSection from "@/components/nouveau/RentabiliteSection"
import InternetSection from "@/components/nouveau/InternetSection"
import ProspectsSection from "@/components/nouveau/ProspectsSection"
import QuiSuisJeSection from "@/components/nouveau/QuiSuisJeSection"
import TemoignagesClients from "@/components/perso/temoignages/TemoignagesClients"
import Footer from "@/components/perso/footer/Footer"
import FloatingCTA from "@/components/nouveau/FloatingCTA"

export default function Home() {
    return (
        <div>
            <Navigation />
            <section id="hero">
                <HeroV2 />
            </section>
            <section id="comment-ca-marche">
                <RentabiliteSection />
                <InternetSection />
                <ProspectsSection />
            </section>
            <section id="qui-suis-je">
                <QuiSuisJeSection />
            </section>
            <section id="temoignages">
                <TemoignagesClients variant="light" />
            </section>
            <Footer />
            <FloatingCTA />
        </div>
    )
}
