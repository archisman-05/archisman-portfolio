"use client";

import { ChangeEvent, useRef, useState } from "react";

export default function WantedPosterBuilder() {
    const [name, setName] = useState("CAPTAIN");
    const [crime, setCrime] = useState("STEALING HEARTS");
    const [reward, setReward] = useState("10,000,000");
    const [photo, setPhoto] = useState<string | null>(null);
    const [isDownloading, setIsDownloading] = useState(false);

    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        if (!file) return;

        if (!file.type.startsWith("image/")) {
            alert("Please upload a valid image file.");
            return;
        }

        const reader = new FileReader();

        reader.onload = () => {
            setPhoto(reader.result as string);
        };

        reader.readAsDataURL(file);
    };

    const loadImage = (src: string) => {
        return new Promise<HTMLImageElement>((resolve, reject) => {
            const image = new Image();

            image.onload = async () => {
                try {
                    if ("decode" in image) {
                        await image.decode();
                    }
                } catch {
                    // Some browsers may reject decode even though the image is usable.
                }

                resolve(image);
            };

            image.onerror = reject;
            image.src = src;
        });
    };

    const drawCoverImage = (
        ctx: CanvasRenderingContext2D,
        image: HTMLImageElement,
        x: number,
        y: number,
        width: number,
        height: number
    ) => {
        const imageRatio = image.width / image.height;
        const containerRatio = width / height;

        let sourceX = 0;
        let sourceY = 0;
        let sourceWidth = image.width;
        let sourceHeight = image.height;

        if (imageRatio > containerRatio) {
            sourceWidth = image.height * containerRatio;
            sourceX = (image.width - sourceWidth) / 2;
        } else {
            sourceHeight = image.width / containerRatio;
            sourceY = (image.height - sourceHeight) / 2;
        }

        ctx.drawImage(
            image,
            sourceX,
            sourceY,
            sourceWidth,
            sourceHeight,
            x,
            y,
            width,
            height
        );
    };

    const downloadPoster = async () => {
        try {
            setIsDownloading(true);

            const canvas = document.createElement("canvas");

            // High resolution poster
            canvas.width = 1400;
            canvas.height = 2000;

            const ctx = canvas.getContext("2d");

            if (!ctx) {
                alert("Your browser does not support poster generation.");
                return;
            }

            const W = canvas.width;
            const H = canvas.height;

            // =====================================================
            // BACKGROUND
            // =====================================================

            ctx.fillStyle = "#d8c39a";
            ctx.fillRect(0, 0, W, H);

            // Paper texture
            for (let i = 0; i < 45000; i++) {
                const x = Math.random() * W;
                const y = Math.random() * H;
                const alpha = Math.random() * 0.06;

                ctx.fillStyle = `rgba(65, 43, 20, ${alpha})`;
                ctx.fillRect(x, y, 1.5, 1.5);
            }

            // =====================================================
            // OUTER BORDER
            // =====================================================

            ctx.strokeStyle = "#2b1b10";
            ctx.lineWidth = 18;
            ctx.strokeRect(45, 45, W - 90, H - 90);

            ctx.strokeStyle = "#2b1b10";
            ctx.lineWidth = 4;
            ctx.strokeRect(75, 75, W - 150, H - 150);

            // =====================================================
            // TOP DECORATION
            // =====================================================

            ctx.fillStyle = "#2b1b10";
            ctx.textAlign = "center";

            ctx.font = "bold 42px Georgia";
            ctx.fillText("☠", W / 2, 155);

            ctx.font = "bold 145px Georgia";
            ctx.fillText("WANTED", W / 2, 330);

            ctx.font = "bold 42px Georgia";
            ctx.fillText("DEAD OR ALIVE", W / 2, 405);

            // Decorative lines
            ctx.beginPath();
            ctx.moveTo(150, 455);
            ctx.lineTo(W - 150, 455);
            ctx.strokeStyle = "#2b1b10";
            ctx.lineWidth = 6;
            ctx.stroke();

            // =====================================================
            // PHOTO FRAME
            // =====================================================

            const photoX = 160;
            const photoY = 530;
            const photoWidth = W - 320;
            const photoHeight = 760;

            ctx.fillStyle = "#382416";
            ctx.fillRect(
                photoX - 18,
                photoY - 18,
                photoWidth + 36,
                photoHeight + 36
            );

            ctx.fillStyle = "#f0dfb6";
            ctx.fillRect(photoX, photoY, photoWidth, photoHeight);

            if (photo) {
                const uploadedImage = await loadImage(photo);

                drawCoverImage(
                    ctx,
                    uploadedImage,
                    photoX,
                    photoY,
                    photoWidth,
                    photoHeight
                );
            } else {
                ctx.fillStyle = "#a99167";
                ctx.fillRect(photoX, photoY, photoWidth, photoHeight);

                ctx.fillStyle = "#382416";
                ctx.textAlign = "center";

                ctx.font = "bold 60px Georgia";
                ctx.fillText(
                    "YOUR FACE HERE",
                    W / 2,
                    photoY + photoHeight / 2 - 20
                );

                ctx.font = "32px Georgia";
                ctx.fillText(
                    "Upload a picture to complete the bounty",
                    W / 2,
                    photoY + photoHeight / 2 + 50
                );
            }

            // =====================================================
            // NAME
            // =====================================================

            ctx.fillStyle = "#2b1b10";
            ctx.textAlign = "center";

            ctx.font = "bold 88px Georgia";

            const upperName = name.trim().toUpperCase() || "UNKNOWN";

            // Reduce font size if name is too long
            let nameSize = 88;

            while (
                ctx.measureText(upperName).width > W - 220 &&
                nameSize > 40
            ) {
                nameSize -= 4;
                ctx.font = `bold ${nameSize}px Georgia`;
            }

            ctx.fillText(upperName, W / 2, 1450);

            // =====================================================
            // CRIME
            // =====================================================

            ctx.font = "bold 26px Arial";
            ctx.fillText("WANTED FOR", W / 2, 1525);

            ctx.font = "bold 42px Georgia";

            const crimeText = crime.trim().toUpperCase() || "UNKNOWN CRIMES";

            ctx.fillText(crimeText, W / 2, 1585);

            // =====================================================
            // REWARD
            // =====================================================

            ctx.beginPath();
            ctx.moveTo(180, 1660);
            ctx.lineTo(W - 180, 1660);
            ctx.strokeStyle = "#2b1b10";
            ctx.lineWidth = 5;
            ctx.stroke();

            ctx.font = "bold 28px Arial";
            ctx.fillText("REWARD", W / 2, 1735);

            ctx.font = "bold 82px Georgia";

            const rewardText =
                reward.trim().replace(/[^0-9,]/g, "") || "0";

            ctx.fillText(`฿ ${rewardText}`, W / 2, 1840);

            // =====================================================
            // BOTTOM TEXT
            // =====================================================

            ctx.font = "bold 24px Arial";
            ctx.fillText(
                "BRING THIS PERSON TO THE GRAND LINE",
                W / 2,
                1910
            );

            ctx.font = "20px Georgia";
            ctx.fillText(
                "THE ARCHISMAN DAILY • SPECIAL PIRATE EDITION",
                W / 2,
                1950
            );

            // =====================================================
            // DOWNLOAD
            // =====================================================

            const link = document.createElement("a");

            link.download = `wanted-${upperName
                .toLowerCase()
                .replace(/\s+/g, "-")}.png`;

            link.href = canvas.toDataURL("image/png", 1);

            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error("Poster generation failed:", error);
            alert(
                "The poster could not be generated. Try uploading the image again."
            );
        } finally {
            setIsDownloading(false);
        }
    };

    return (
        <main className="min-h-screen bg-[#d8c39a] px-4 py-10 text-[#2b1b10] md:px-10">
            <button
                type="button"
                onClick={() => window.history.back()}
                className="mb-6 inline-flex items-center gap-2 border border-[#2b1b10] px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#2b1b10] transition hover:bg-[#2b1b10] hover:text-[#ead8ac]"
            >
                ← Back to The Daily
            </button>
            <section className="mx-auto max-w-7xl">
                {/* HEADER */}

                <div className="border-y-2 border-[#2b1b10] py-8 text-center">
                    <p className="text-xs font-bold uppercase tracking-[0.4em]">
                        Interactive Pirate Activity
                    </p>

                    <h1 className="mt-4 font-serif text-5xl font-black uppercase leading-none md:text-8xl">
                        Build Your Own
                        <br />
                        <span className="text-red-800">Wanted Poster</span>
                    </h1>

                    <p className="mx-auto mt-5 max-w-2xl font-serif text-lg">
                        Upload your face. Choose your crimes. Set your bounty.
                        Then download your very own pirate wanted poster.
                    </p>
                </div>

                <div className="mt-10 grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
                    {/* CONTROLS */}

                    <div className="border-2 border-[#2b1b10] bg-[#ead8ac] p-6 md:p-10">
                        <p className="text-xs font-bold uppercase tracking-[0.35em]">
                            Case File / Customize
                        </p>

                        <h2 className="mt-4 font-serif text-4xl font-black">
                            Build Your Bounty.
                        </h2>

                        {/* PHOTO */}

                        <div className="mt-8">
                            <label className="text-xs font-bold uppercase tracking-[0.25em]">
                                01 / Upload Mugshot
                            </label>

                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                className="hidden"
                            />

                            <button
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                className="mt-3 w-full border-2 border-dashed border-[#2b1b10] bg-transparent px-5 py-8 text-sm font-bold uppercase tracking-[0.2em] transition hover:bg-[#2b1b10] hover:text-[#ead8ac]"
                            >
                                {photo ? "Replace Photo" : "Choose Your Photo"}
                            </button>

                            {photo && (
                                <button
                                    type="button"
                                    onClick={() => {
                                        setPhoto(null);

                                        if (fileInputRef.current) {
                                            fileInputRef.current.value = "";
                                        }
                                    }}
                                    className="mt-3 text-xs font-bold uppercase tracking-[0.2em] underline"
                                >
                                    Remove Photo
                                </button>
                            )}
                        </div>

                        {/* NAME */}

                        <div className="mt-8">
                            <label className="text-xs font-bold uppercase tracking-[0.25em]">
                                02 / Pirate Name
                            </label>

                            <input
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                                maxLength={24}
                                placeholder="Enter your name"
                                className="mt-3 w-full border-2 border-[#2b1b10] bg-transparent px-4 py-4 font-serif text-xl font-bold outline-none"
                            />
                        </div>

                        {/* CRIME */}

                        <div className="mt-8">
                            <label className="text-xs font-bold uppercase tracking-[0.25em]">
                                03 / Wanted For
                            </label>

                            <input
                                value={crime}
                                onChange={(event) => setCrime(event.target.value)}
                                maxLength={38}
                                placeholder="Your greatest crime"
                                className="mt-3 w-full border-2 border-[#2b1b10] bg-transparent px-4 py-4 font-serif text-xl font-bold outline-none"
                            />
                        </div>

                        {/* REWARD */}

                        <div className="mt-8">
                            <label className="text-xs font-bold uppercase tracking-[0.25em]">
                                04 / Bounty
                            </label>

                            <input
                                value={reward}
                                onChange={(event) => setReward(event.target.value)}
                                inputMode="numeric"
                                maxLength={14}
                                placeholder="1000000"
                                className="mt-3 w-full border-2 border-[#2b1b10] bg-transparent px-4 py-4 font-serif text-xl font-bold outline-none"
                            />
                        </div>

                        {/* DOWNLOAD */}

                        <button
                            type="button"
                            onClick={downloadPoster}
                            disabled={isDownloading}
                            className="mt-10 w-full border-2 border-[#2b1b10] bg-[#2b1b10] px-6 py-5 text-xs font-black uppercase tracking-[0.3em] text-[#ead8ac] transition hover:bg-transparent hover:text-[#2b1b10] disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {isDownloading
                                ? "Printing Poster..."
                                : "Download Wanted Poster"}
                        </button>

                        <p className="mt-4 text-center text-[10px] font-bold uppercase tracking-[0.18em] opacity-70">
                            No image is uploaded to any server.
                        </p>
                    </div>

                    {/* LIVE PREVIEW */}

                    <div className="flex items-center justify-center">
                        <div className="w-full max-w-[620px] bg-[#d8c39a] p-4 shadow-2xl">
                            <div className="border-[10px] border-[#2b1b10] p-4">
                                <div className="border-2 border-[#2b1b10] p-6 text-center md:p-10">
                                    <div className="text-4xl">☠</div>

                                    <h2 className="mt-3 font-serif text-6xl font-black uppercase md:text-8xl">
                                        Wanted
                                    </h2>

                                    <p className="mt-2 font-serif text-lg font-bold tracking-[0.2em]">
                                        DEAD OR ALIVE
                                    </p>

                                    <div className="my-6 border-t-2 border-[#2b1b10]" />

                                    <div className="h-[380px] overflow-hidden border-[6px] border-[#2b1b10] bg-[#a99167] md:h-[500px]">
                                        {photo ? (
                                            <img
                                                src={photo}
                                                alt="Wanted poster preview"
                                                className="h-full w-full object-cover"
                                            />
                                        ) : (
                                            <div className="flex h-full flex-col items-center justify-center px-6">
                                                <p className="font-serif text-3xl font-black">
                                                    YOUR FACE HERE
                                                </p>

                                                <p className="mt-3 text-xs font-bold uppercase tracking-[0.2em]">
                                                    Upload a picture
                                                </p>
                                            </div>
                                        )}
                                    </div>

                                    <h3 className="mt-8 break-words font-serif text-4xl font-black uppercase md:text-6xl">
                                        {name.trim() || "UNKNOWN"}
                                    </h3>

                                    <p className="mt-5 text-[10px] font-bold uppercase tracking-[0.3em]">
                                        Wanted For
                                    </p>

                                    <p className="mt-2 break-words font-serif text-xl font-bold uppercase md:text-2xl">
                                        {crime.trim() || "UNKNOWN CRIMES"}
                                    </p>

                                    <div className="my-7 border-t-2 border-[#2b1b10]" />

                                    <p className="text-xs font-bold uppercase tracking-[0.35em]">
                                        Reward
                                    </p>

                                    <p className="mt-2 font-serif text-5xl font-black md:text-7xl">
                                        ฿ {reward.trim() || "0"}
                                    </p>

                                    <p className="mt-8 text-[9px] font-bold uppercase tracking-[0.2em]">
                                        The Archisman Daily • Pirate Edition
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* FOOTER */}

                <div className="mt-10 border-t-2 border-[#2b1b10] py-6 text-center">
                    <p className="text-[10px] font-bold uppercase tracking-[0.25em]">
                        Create your bounty. Download it. Share your pirate identity.
                    </p>
                </div>
            </section>
        </main>
    );
}