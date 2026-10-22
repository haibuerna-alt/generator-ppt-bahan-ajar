
"use client";

import { useState } from "react";

export default function Home() {
  const [mapel, setMapel] = useState("IPAS");
  const [jenjang, setJenjang] = useState("SD");
  const [kelas, setKelas] = useState("5");
  const [topik, setTopik] = useState("");
  const [jumlah, setJumlah] = useState("10");
  const [tema, setTema] = useState("cute");
  const [loading, setLoading] = useState(false);

  async function buatPPT() {
    if (!topik.trim()) {
      alert("Isi topik bahan ajar terlebih dahulu, ya!");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mapel,
          jenjang,
          kelas,
          topik,
          jumlah: Number(jumlah),
          tema,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Gagal membuat PowerPoint.");
      }

      const file = await response.blob();
      const url = URL.createObjectURL(file);
      const link = document.createElement("a");
      link.href = url;
      link.download = "bahan-ajar-pintar-ai.pptx";
      link.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      alert(
        error instanceof Error
          ? error.message
          : "Terjadi kesalahan. Coba lagi."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-800">
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <div>
            <p className="text-2xl font-black text-violet-700">
              PPT Pintar AI
            </p>
            <p className="text-sm text-slate-500">
              Bahan ajar lebih mudah, kreatif, dan menarik
            </p>
          </div>
          <span className="rounded-full bg-violet-100 px-4 py-2 text-sm font-semibold text-violet-700">
            AI Presentation Maker
          </span>
        </div>
      </header>

      <section className="mx-auto grid max-w-6xl gap-10 px-6 py-12 md:grid-cols-2 md:items-center">
        <div>
          <p className="mb-4 inline-block rounded-full bg-pink-100 px-4 py-2 text-sm font-semibold text-pink-700">
            ✨ Teman kreatif para pendidik
          </p>
          <h1 className="text-4xl font-black leading-tight md:text-5xl">
            Ubah ide mengajar menjadi{" "}
            <span className="text-violet-700">PowerPoint menarik.</span>
          </h1>
          <p className="mt-5 max-w-lg leading-7 text-slate-600">
            Masukkan topik pembelajaran, pilih gaya desain, dan siapkan
            presentasi bahan ajar yang bisa kamu edit kembali.
          </p>

          <div className="mt-8 grid grid-cols-2 gap-3">
            <div className="rounded-2xl border border-pink-200 bg-pink-50 p-4">
              <p className="text-2xl">🧸</p>
              <p className="mt-2 font-bold">Cute 3D</p>
              <p className="mt-1 text-sm text-slate-600">
                Ceria dan ramah anak
              </p>
            </div>
            <div className="rounded-2xl border border-blue-200 bg-blue-50 p-4">
              <p className="text-2xl">📊</p>
              <p className="mt-2 font-bold">Profesional</p>
              <p className="mt-1 text-sm text-slate-600">
                Bersih dan informatif
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-violet-100/60 md:p-8">
          <h2 className="text-2xl font-extrabold">Buat bahan ajar</h2>
          <p className="mt-2 text-sm text-slate-500">
            Lengkapi informasi berikut untuk memulai.
          </p>

          <form
            className="mt-6 space-y-5"
            onSubmit={(event) => {
              event.preventDefault();
              void buatPPT();
            }}
          >
            <div>
              <label className="mb-2 block text-sm font-semibold">
                Topik pembelajaran
              </label>
              <input
                value={topik}
                onChange={(event) => setTopik(event.target.value)}
                placeholder="Contoh: Ekosistem dan rantai makanan"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Mata pelajaran
                </label>
                <select
                  value={mapel}
                  onChange={(event) => setMapel(event.target.value)}
                  className="w-full rounded-xl border border-slate-300 bg-white px-3 py-3"
                >
                  {["IPAS", "IPA", "Matematika", "Bahasa Indonesia", "Bahasa Inggris", "IPS", "Pendidikan Pancasila", "Lainnya"].map((item) => (
                    <option key={item}>{item}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Jenjang
                </label>
                <select
                  value={jenjang}
                  onChange={(event) => setJenjang(event.target.value)}
                  className="w-full rounded-xl border border-slate-300 bg-white px-3 py-3"
                >
                  {["PAUD", "TK", "SD", "SMP", "SMA", "SMK", "Perguruan Tinggi"].map((item) => (
                    <option key={item}>{item}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Kelas
                </label>
                <input
                  value={kelas}
                  onChange={(event) => setKelas(event.target.value)}
                  placeholder="Contoh: 5"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Jumlah slide
                </label>
                <select
                  value={jumlah}
                  onChange={(event) => setJumlah(event.target.value)}
                  className="w-full rounded-xl border border-slate-300 bg-white px-3 py-3"
                >
                  {["6", "8", "10", "12", "15"].map((item) => (
                    <option key={item} value={item}>
                      {item} slide
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold">
                Gaya desain
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setTema("cute")}
                  className={`rounded-xl border p-3 text-sm font-bold ${
                    tema === "cute"
                      ? "border-pink-400 bg-pink-50 text-pink-700"
                      : "border-slate-200"
                  }`}
                >
                  🧸 Cute 3D
                </button>
                <button
                  type="button"
                  onClick={() => setTema("professional")}
                  className={`rounded-xl border p-3 text-sm font-bold ${
                    tema === "professional"
                      ? "border-blue-400 bg-blue-50 text-blue-700"
                      : "border-slate-200"
                  }`}
                >
                  📊 Profesional
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-violet-700 px-5 py-4 font-bold text-white transition hover:bg-violet-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Sedang membuat..." : "✨ Generate PowerPoint"}
            </button>
            <p className="text-center text-xs text-slate-500">
              Periksa kembali akurasi materi sebelum digunakan di kelas.
            </p>
          </form>
        </div>
      </section>

      <footer className="border-t bg-white px-6 py-6 text-center text-sm text-slate-500">
        PPT Pintar AI · Dibuat untuk mendukung kreativitas pendidik
      </footer>
    </main>
  );
}
