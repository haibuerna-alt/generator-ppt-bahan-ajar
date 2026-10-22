
"use client";

import { useState } from "react";

export default function Home() {
  const [jenjang, setJenjang] = useState("SD");
  const [mapel, setMapel] = useState("IPAS");
  const [topik, setTopik] = useState("");
  const [jumlahSlide, setJumlahSlide] = useState("10");
  const [tema, setTema] = useState("cute");

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 p-6 md:p-12">
      <div className="mx-auto max-w-3xl">
        <header className="mb-8 text-center">
          <p className="mb-3 text-sm font-semibold text-purple-600">
            ✨ AI TEACHING SLIDE GENERATOR
          </p>
          <h1 className="text-3xl font-bold text-gray-800 md:text-4xl">
            Buat PPT Bahan Ajar
          </h1>
          <p className="mt-3 text-gray-600">
            Susun presentasi pembelajaran dengan lebih praktis.
          </p>
        </header>

        <section className="rounded-3xl border border-purple-100 bg-white p-6 shadow-xl md:p-8">
          <div className="space-y-5">
            <div>
              <label className="mb-2 block font-semibold">
                Jenjang Pendidikan
              </label>
              <select
                className="w-full rounded-xl border p-3"
                value={jenjang}
                onChange={(e) => setJenjang(e.target.value)}
              >
                <option>PAUD</option>
                <option>SD</option>
                <option>SMP</option>
                <option>SMA/SMK</option>
                <option>Perguruan Tinggi</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block font-semibold">
                Mata Pelajaran
              </label>
              <input
                className="w-full rounded-xl border p-3"
                value={mapel}
                onChange={(e) => setMapel(e.target.value)}
                placeholder="Contoh: IPAS"
              />
            </div>

            <div>
              <label className="mb-2 block font-semibold">
                Topik Bahan Ajar
              </label>
              <textarea
                className="w-full rounded-xl border p-3"
                rows={3}
                value={topik}
                onChange={(e) => setTopik(e.target.value)}
                placeholder="Contoh: Ekosistem dan rantai makanan"
              />
            </div>

            <div>
              <label className="mb-2 block font-semibold">
                Jumlah Slide
              </label>
              <select
                className="w-full rounded-xl border p-3"
                value={jumlahSlide}
                onChange={(e) => setJumlahSlide(e.target.value)}
              >
                <option value="5">5 slide</option>
                <option value="10">10 slide</option>
                <option value="15">15 slide</option>
                <option value="20">20 slide</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block font-semibold">
                Tema Desain
              </label>
              <select
                className="w-full rounded-xl border p-3"
                value={tema}
                onChange={(e) => setTema(e.target.value)}
              >
                <option value="cute">Cute 3D Pastel</option>
                <option value="modern">Modern Minimalis</option>
                <option value="professional">Profesional Akademik</option>
                <option value="colorful">Colorful Edukatif</option>
              </select>
            </div>

            <button
              type="button"
              onClick={() =>
                alert(
                  `Form siap!\nJenjang: ${jenjang}\nMapel: ${mapel}\nTopik: ${topik}\nSlide: ${jumlahSlide}\nTema: ${tema}`
                )
              }
              className="w-full rounded-xl bg-purple-600 p-4 font-bold text-white transition hover:bg-purple-700"
            >
              ✨ Siapkan Presentasiku
            </button>

            <p className="text-center text-xs text-gray-500">
              Versi awal: formulir siap. Fitur AI dan unduh PPT
              akan kita hubungkan pada tahap berikutnya.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
