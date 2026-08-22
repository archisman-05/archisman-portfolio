"use client";
import { usePageTurn } from "../components/PageTurnProvider";
import Image from "next/image";
import Link from "next/link";

const photographyPhotos = [
    {
        src: "/images/hobbies/photography-1.jpg",
        alt: "Photography moment one",
        caption: "A moment worth keeping.",
        rotation: "-rotate-2",
    },
    {
        src: "/images/hobbies/photography-2.jpg",
        alt: "Photography moment two",
        caption: "Some stories need no words.",
        rotation: "rotate-2",
    },
    {
        src: "/images/hobbies/photography-3.jpg",
        alt: "Photography moment three",
        caption: "Paused, permanently.",
        rotation: "-rotate-1",
    },
];

const hobbies = [
    {
        number: "02",
        eyebrow: "AFTER DARK",
        title: "ASTRONOMY",
        subtitle: "LOOKING BEYOND THE WORLD BELOW.",
        description:
            "There is something unreal about pointing a camera toward the night sky and realizing how much exists beyond what we see every day.",
        image: "/images/hobbies/astrophotography.jpg",
        note: "The universe does not sleep.",
        rotate: "-rotate-1",
    },
    {
        number: "03",
        eyebrow: "AFTER HOURS",
        title: "GAMING",
        subtitle: "ONE MORE MATCH.",
        description:
            "Sometimes the best way to switch off from the real world is to get completely immersed in another one.",
        image: "/images/hobbies/gaming.jpg",
        note: "Respawn. Retry. Repeat.",
        rotate: "rotate-1",
    },
    {
        number: "04",
        eyebrow: "TRAINING LOG",
        title: "GYM",
        subtitle: "DISCIPLINE OVER MOOD.",
        description:
            "Building strength is slow and repetitive. Showing up when motivation disappears is where the real work begins.",
        image: "/images/hobbies/gym.jpg",
        note: "Show up anyway.",
        rotate: "-rotate-2",
    },
    {
        number: "05",
        eyebrow: "ON PAPER",
        title: "DRAWING",
        subtitle: "FROM IMAGINATION TO LINES.",
        description:
            "A blank page is a strange kind of freedom. Start with a line and eventually something begins to exist.",
        image: "/images/hobbies/drawing.jpg",
        note: "Just one more detail.",
        rotate: "rotate-1",
    },
    {
        number: "06",
        eyebrow: "THE HIGHER CALL",
        title: "TREKKING",
        subtitle: "UPWARD. ALWAYS.",
        description:
            "There is something about mountains that makes everything else feel smaller. The climb is difficult, but the view changes the meaning of difficult.",
        image: "/images/hobbies/trekking.jpg",
        note: "The summit is not the end.",
        rotate: "-rotate-1",
    },
    {
        number: "07",
        eyebrow: "PERSONAL LAB",
        title: "IoT",
        subtitle: "BUILDING THE THINGS I IMAGINE.",
        description:
            "Sensors, wires, microcontrollers and experiments. I enjoy taking an idea and turning it into something physical that actually responds.",
        image: "/images/hobbies/iot.jpg",
        note: "If it can be built, try.",
        rotate: "rotate-2",
    },
];

export default function HobbiesPage() {
    const { navigateWithPageTurn } = usePageTurn();
    return (
        <main className="min-h-screen overflow-x-hidden bg-[var(--paper)] text-[var(--ink)]">
            {/* TOP BAR */}
            <header className="border-b border-[var(--ink)]">
                <div className="mx-auto flex max-w-[1300px] items-center justify-between px-5 py-4 sm:px-8">
                    <div className="font-mono text-[9px] font-semibold uppercase tracking-[0.22em] sm:text-[10px]">
                        The Archisman Daily
                    </div>

                    <button
                        type="button"
                        onClick={() => navigateWithPageTurn("/")}
                        className="YOUR EXISTING CLASSES HERE"
                    >
                        ← FRONT PAGE
                    </button>
                </div>
            </header>

            {/* HERO */}
            <section className="relative border-b border-[var(--ink)] px-5 py-12 sm:px-8 md:py-16">
                <div className="mx-auto max-w-[1300px]">
                    <div className="mb-5 flex items-center gap-3">
                        <span className="h-px w-10 bg-[var(--ink)]" />

                        <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.22em] sm:text-[10px]">
                            Issue 02 / The Life Beyond Work
                        </p>
                    </div>

                    <h1 className="font-[family-name:var(--font-bodoni)] text-[clamp(4rem,11vw,9rem)] font-bold uppercase leading-[0.76] tracking-[-0.06em]">
                        Hobbies
                    </h1>

                    <div className="mt-8 grid gap-6 border-t border-[var(--ink)] pt-5 md:grid-cols-[1.15fr_0.85fr]">
                        <p className="max-w-2xl font-[family-name:var(--font-playfair)] text-lg leading-relaxed sm:text-xl md:text-3xl">
                            The things that remind me I am more than the work I do.
                        </p>

                        <p className="font-mono text-[9px] uppercase leading-relaxed tracking-[0.16em] opacity-70 sm:text-[10px] md:pt-2">
                            Photographs, stars, mountains,
                            <br />
                            machines, sketches and
                            <br />
                            everything in between.
                        </p>
                    </div>
                </div>

                <div className="absolute right-8 top-8 hidden rotate-12 border-2 border-[var(--ink)] px-3 py-2 font-mono text-[8px] font-bold uppercase tracking-[0.18em] opacity-60 md:block">
                    Personal Archive
                </div>
            </section>

            {/* PHOTOGRAPHY FEATURE */}
            <section className="border-b border-[var(--ink)] px-5 py-12 sm:px-8 md:py-16">
                <div className="mx-auto max-w-[1300px]">
                    <div className="mb-8 grid gap-5 border-b border-[var(--ink)] pb-6 md:grid-cols-[0.65fr_1.35fr] md:items-end">
                        <p className="font-mono text-[9px] font-bold uppercase tracking-[0.24em]">
                            01 / Through The Lens
                        </p>

                        <div>
                            <h2 className="font-[family-name:var(--font-bodoni)] text-5xl font-bold uppercase leading-[0.82] tracking-[-0.05em] sm:text-6xl md:text-8xl">
                                Photography
                            </h2>

                            <p className="mt-4 max-w-xl font-[family-name:var(--font-playfair)] text-base leading-relaxed sm:text-lg md:text-xl">
                                Some moments disappear. Some are worth trying to keep.
                            </p>
                        </div>
                    </div>

                    <div className="grid gap-6 md:grid-cols-3 md:items-center">
                        {photographyPhotos.map((photo, index) => (
                            <article
                                key={photo.src}
                                className={`group relative ${photo.rotation} ${index === 1
                                    ? "md:-translate-y-5"
                                    : index === 2
                                        ? "md:translate-y-3"
                                        : ""
                                    }`}
                            >
                                <div className="relative border border-[var(--ink)] bg-[#e9dfc8] p-2.5 shadow-[5px_6px_0px_rgba(28,25,20,0.14)] transition-all duration-300 ease-out group-hover:-translate-y-2 group-hover:scale-[1.04] group-hover:shadow-[10px_14px_0px_rgba(28,25,20,0.2)]">
                                    <div className="absolute left-1/2 top-0 z-10 h-6 w-20 -translate-x-1/2 -translate-y-1/2 rotate-[-3deg] bg-[rgba(210,190,130,0.6)]" />

                                    <div className="relative aspect-[4/5] overflow-hidden border border-[var(--ink)]">
                                        <Image
                                            src={photo.src}
                                            alt={photo.alt}
                                            fill
                                            sizes="(max-width: 768px) 100vw, 33vw"
                                            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                                        />
                                    </div>

                                    <div className="min-h-[3.5rem] px-1 pt-3">
                                        <p className="font-[family-name:var(--font-playfair)] text-sm italic sm:text-base">
                                            {photo.caption}
                                        </p>

                                        <p className="mt-1.5 font-mono text-[7px] uppercase tracking-[0.16em] opacity-60">
                                            Photo Archive / 2026
                                        </p>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            {/* OTHER HOBBIES */}
            <section className="px-5 py-12 sm:px-8 md:py-16">
                <div className="mx-auto max-w-[1300px]">
                    <div className="mb-12 flex items-end justify-between border-b border-[var(--ink)] pb-5">
                        <h2 className="font-[family-name:var(--font-bodoni)] text-5xl font-bold uppercase leading-none tracking-[-0.04em] sm:text-6xl md:text-7xl">
                            The Rest
                        </h2>

                        <p className="hidden font-mono text-[8px] uppercase tracking-[0.2em] opacity-60 md:block">
                            Six More Chapters
                        </p>
                    </div>

                    <div className="grid gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
                        {hobbies.map((hobby) => (
                            <article
                                key={hobby.number}
                                className={`group relative ${hobby.rotate}`}
                            >
                                <div className="mb-3 flex items-center gap-3">
                                    <span className="font-mono text-[10px] font-bold tracking-[0.18em]">
                                        {hobby.number}
                                    </span>

                                    <span className="h-px flex-1 bg-[var(--ink)]" />
                                </div>

                                <div className="relative border border-[var(--ink)] bg-[#e9dfc8] p-2.5 shadow-[5px_6px_0px_rgba(28,25,20,0.14)] transition-all duration-300 ease-out group-hover:-translate-y-2 group-hover:scale-[1.035] group-hover:shadow-[10px_14px_0px_rgba(28,25,20,0.2)]">
                                    <div className="absolute right-5 top-0 z-10 h-5 w-16 -translate-y-1/2 rotate-3 bg-[rgba(210,190,130,0.6)]" />

                                    <div className="relative aspect-[4/5] overflow-hidden border border-[var(--ink)]">
                                        <Image
                                            src={hobby.image}
                                            alt={hobby.title}
                                            fill
                                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                                        />
                                    </div>

                                    <div className="flex min-h-[3.5rem] items-end justify-between gap-3 px-1 pt-3">
                                        <span className="font-mono text-[7px] uppercase tracking-[0.16em] opacity-60">
                                            Archive / {hobby.number}
                                        </span>

                                        <span className="text-right font-[family-name:var(--font-playfair)] text-xs italic sm:text-sm">
                                            {hobby.note}
                                        </span>
                                    </div>
                                </div>

                                <div className="mt-6">
                                    <p className="font-mono text-[8px] font-bold uppercase tracking-[0.2em] opacity-70">
                                        {hobby.eyebrow}
                                    </p>

                                    <h3 className="mt-2 font-[family-name:var(--font-bodoni)] text-4xl font-bold uppercase leading-[0.88] tracking-[-0.04em] sm:text-5xl">
                                        {hobby.title}
                                    </h3>

                                    <p className="mt-2 font-mono text-[8px] uppercase tracking-[0.14em] opacity-60">
                                        {hobby.subtitle}
                                    </p>

                                    <div className="my-4 h-px bg-[var(--ink)]" />

                                    <p className="font-[family-name:var(--font-playfair)] text-sm leading-relaxed sm:text-base">
                                        {hobby.description}
                                    </p>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            {/* EDITOR'S NOTE */}
            <section className="border-y border-[var(--ink)] px-5 py-12 sm:px-8 md:py-16">
                <div className="mx-auto grid max-w-[1300px] gap-8 md:grid-cols-[0.8fr_1.2fr] md:items-end">
                    <div>
                        <p className="font-mono text-[9px] font-bold uppercase tracking-[0.22em]">
                            Editor&apos;s Note
                        </p>

                        <div className="mt-4 h-px bg-[var(--ink)]" />

                        <p className="mt-5 font-[family-name:var(--font-playfair)] text-lg italic leading-relaxed sm:text-xl">
                            “Not everything needs to be productive to be meaningful.”
                        </p>
                    </div>

                    <div>
                        <h2 className="font-[family-name:var(--font-bodoni)] text-5xl font-bold uppercase leading-[0.84] tracking-[-0.05em] sm:text-6xl md:text-8xl">
                            A life
                            <br />
                            beyond
                            <br />
                            the screen.
                        </h2>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <div className="mt-8 border-t-2 border-[var(--ink)] pt-5 sm:mt-10 sm:pt-6">
                <div className="grid grid-cols-1 items-center gap-4 text-center md:grid-cols-3 md:gap-6">

                    {/* Left footnote */}
                    <div className="md:text-left">
                        <p className="text-[8px] font-bold uppercase tracking-[0.22em] text-[var(--ink)]/70 sm:text-[9px]">
                            © 2026 Archisman Kundu · Background Music: “Pirate Tavern (Full Version!)”
                            by Magiksolo · Used under the Pixabay Content License
                        </p>
                    </div>

                    {/* CENTER TITLE */}
                    <div className="flex justify-center">
                        <p className="whitespace-nowrap font-serif text-xl font-black leading-none text-[var(--ink)] sm:text-2xl">
                            The Archisman Daily
                        </p>
                    </div>

                    {/* Right footnote */}
                    <div className="md:text-right">
                        <p className="text-[8px] font-bold uppercase tracking-[0.3em] text-[var(--ink)]/70 sm:text-[9px]">
                            Est. 2005 · No Final Edition Yet.
                        </p>
                    </div>

                </div>
            </div>
        </main>
    );
}