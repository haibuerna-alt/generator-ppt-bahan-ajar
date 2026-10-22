import { NextRequest, NextResponse } from "next/server";
import PptxGenJS from "pptxgenjs";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const mapel = String(body.mapel || "Umum");
    const jenjang = String(body.jenjang || "SD");
    const kelas = String(body.kelas || "1");
    const topik = String(body.topik || "").trim();
    const jumlah = Math.min(
      15,
      Math.max(6, Number(body.jumlah) || 10)
    );
    const tema = body.tema === "professional" ? "professional" : "cute";

    if (!topik) {
      return NextResponse.json(
        { error: "Topik pembelajaran wajib diisi." },
        { status: 400 }
      );
    }

    const pptx = new PptxGenJS();
    pptx.layout = "LAYOUT_WIDE";
    pptx.author = "PPT Pintar AI";
    pptx.subject = `Bahan ajar ${mapel}: ${topik}`;
    pptx.title = `Bahan Ajar - ${topik}`;
    pptx.lang = "id-ID";

    const colors =
      tema === "cute"
        ? {
            bg: "FFF4FA",
            primary: "8757C7",
            secondary: "F5A9C8",
            text: "352747",
            card: "FFFFFF",
          }
        : {
            bg: "F3F6FA",
            primary: "174A7E",
            secondary: "4C91C6",
            text: "203044",
            card: "FFFFFF",
          };

    const isiSlide = [
      {
        judul: topik,
        isi: [
          `Mata pelajaran: ${mapel}`,
          `Jenjang: ${jenjang}, kelas ${kelas}`,
          "Bahan ajar untuk mendukung kegiatan pembelajaran",
        ],
      },
      {
        judul: "Tujuan Pembelajaran",
        isi: [
          `Memahami konsep utama tentang ${topik}`,
          "Mengidentifikasi informasi penting",
          "Menerapkan pemahaman melalui kegiatan belajar",
        ],
      },
      {
        judul: "Apa yang Akan Kita Pelajari?",
        isi: [
          `Pengertian dan konsep dasar ${topik}`,
          "Ciri-ciri atau unsur penting",
          "Contoh penerapan dalam kehidupan sehari-hari",
        ],
      },
      {
        judul: "Mengenal Konsep Utama",
        isi: [
          `Pelajari konsep utama yang berkaitan dengan ${topik}`,
          "Amati informasi dan contoh yang diberikan guru",
          "Catat istilah penting yang baru kamu temui",
        ],
      },
      {
        judul: "Contoh dalam Kehidupan",
        isi: [
          `Temukan contoh ${topik} di lingkungan sekitar`,
          "Hubungkan contoh dengan konsep yang dipelajari",
          "Diskusikan hasil pengamatan bersama teman",
        ],
      },
      {
        judul: "Ayo Berdiskusi!",
        isi: [
          `Apa yang sudah kamu ketahui tentang ${topik}?`,
          "Informasi baru apa yang kamu temukan?",
          "Berikan satu contoh dan jelaskan alasannya",
        ],
      },
      {
        judul: "Aktivitas Pembelajaran",
        isi: [
          "Amati contoh atau ilustrasi yang disediakan guru",
          "Tuliskan hasil pengamatan secara berkelompok",
          "Presentasikan hasil diskusi di depan kelas",
        ],
      },
      {
        judul: "Latihan Pemahaman",
        isi: [
          `Jelaskan pengertian ${topik} dengan bahasamu sendiri`,
          "Sebutkan dua informasi penting yang kamu pelajari",
          "Berikan satu contoh yang sesuai dengan topik",
        ],
      },
      {
        judul: "Refleksi",
        isi: [
          "Apa hal paling menarik yang kamu pelajari?",
          "Bagian mana yang masih perlu kamu pahami?",
          "Bagaimana kamu menerapkan pengetahuan ini?",
        ],
      },
      {
        judul: "Kesimpulan",
        isi: [
          `Hari ini kita mempelajari ${topik}`,
          "Pahami kembali konsep dan contoh yang dibahas",
          "Teruslah bertanya, mengamati, dan belajar",
        ],
      },
      {
        judul: "Tantangan Tambahan",
        isi: [
          `Cari satu contoh lain yang berkaitan dengan ${topik}`,
          "Tuliskan informasi yang kamu temukan",
          "Bagikan hasilnya pada pertemuan berikutnya",
        ],
      },
      {
        judul: "Kuis Singkat",
        isi: [
          `1. Apa yang kamu pahami tentang ${topik}?`,
          "2. Sebutkan satu contoh yang sesuai",
          "3. Jelaskan alasanmu secara singkat",
        ],
      },
      {
        judul: "Kunci Diskusi",
        isi: [
          "Periksa jawaban berdasarkan materi yang dipelajari",
          "Pastikan contoh sesuai dengan konsep",
          "Diskusikan jawaban yang berbeda dengan guru",
        ],
      },
      {
        judul: "Tindak Lanjut",
        isi: [
          "Baca kembali catatan pembelajaran",
          "Cari informasi tambahan dari sumber tepercaya",
          "Siapkan pertanyaan untuk pertemuan berikutnya",
        ],
      },
      {
        judul: "Terima Kasih!",
        isi: [
          "Tetap semangat belajar",
          "Berani bertanya dan mencoba hal baru",
          "Sampai jumpa pada pembelajaran berikutnya!",
        ],
      },
    ];

    for (let i = 0; i < jumlah; i++) {
      const data = isiSlide[i % isiSlide.length];
      const slide = pptx.addSlide();

      slide.background = { color: colors.bg };

      slide.addShape(pptx.ShapeType.rect, {
        x: 0,
        y: 0,
        w: 13.333,
        h: 0.28,
        line: { color: colors.primary, transparency: 100 },
        fill: { color: colors.primary },
      });

      slide.addText("PPT PINTAR AI", {
        x: 0.6,
        y: 0.45,
        w: 5,
        h: 0.3,
        fontFace: "Aptos",
        fontSize: 10,
        bold: true,
        color: colors.primary,
        margin: 0,
      });

      slide.addText(data.judul, {
        x: 0.7,
        y: 1.15,
        w: 11.9,
        h: 1.15,
        fontFace: "Aptos Display",
        fontSize: i === 0 ? 30 : 27,
        bold: true,
        color: colors.primary,
        breakLine: false,
        valign: "mid",
        margin: 0.05,
        fit: "shrink",
      });

      slide.addShape(pptx.ShapeType.roundRect, {
        x: 0.7,
        y: 2.65,
        w: 11.9,
        h: 3.65,
        rectRadius: 0.15,
        line: { color: colors.secondary, transparency: 35 },
        fill: { color: colors.card },
        radius: 0.15,
      });

      const poin = data.isi
        .map((item) => ({ text: item, options: { bullet: { indent: 18 }, hanging: 4, breakLine: true } }));

      slide.addText(poin, {
        x: 1.1,
        y: 3.05,
        w: 11,
        h: 2.9,
        fontFace: "Aptos",
        fontSize: 20,
        color: colors.text,
        paraSpaceAfterPt: 18,
        breakLine: false,
        valign: "mid",
        fit: "shrink",
        margin: 0.1,
      });

      slide.addShape(pptx.ShapeType.line, {
        x: 0.7,
        y: 6.85,
        w: 11.9,
        h: 0,
        line: { color: colors.secondary, transparency: 25, width: 1 },
      });

      slide.addText(`${mapel} • ${jenjang} kelas ${kelas}`, {
        x: 0.7,
        y: 7.0,
        w: 10,
        h: 0.2,
        fontFace: "Aptos",
        fontSize: 9,
        color: colors.text,
        margin: 0,
      });

      slide.addText(`${i + 1}`, {
        x: 12,
        y: 6.98,
        w: 0.5,
        h: 0.25,
        fontSize: 10,
        color: colors.primary,
        align: "right",
        margin: 0,
      });
    }

    const buffer = await pptx.write({ outputType: "nodebuffer" });

    return new NextResponse(buffer as BodyInit, {
      status: 200,
      headers: {
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.presentationml.presentation",
        "Content-Disposition": 'attachment; filename="bahan-ajar-pintar-ai.pptx"',
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error("Generate PPT error:", error);

    return NextResponse.json(
      { error: "PowerPoint gagal dibuat. Periksa konfigurasi aplikasi." },
      { status: 500 }
    );
  }
}
