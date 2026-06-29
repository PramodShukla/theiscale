const { PDFDocument, rgb } = require("pdf-lib");
const fontkit = require("@pdf-lib/fontkit");
const fs = require("fs");
const path = require("path");

// Unique ID Generate
const generateUniqueCertNo = async (EnrollmentModel) => {
  const now = new Date();
  const yy = String(now.getFullYear()).slice(-2);
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const prefix = `${yy}${mm}`;
  const latestCert = await EnrollmentModel.findOne({
    certificate_no: { $regex: `^${prefix}` },
  }).sort({ certificate_no: -1 });
  let sequence = 115;
  if (latestCert && latestCert.certificate_no)
    sequence = parseInt(latestCert.certificate_no.slice(-4)) + 1;
  return `${prefix}${String(sequence).padStart(4, "0")}`;
};

const generateCertificatePDF = async (
  userName,
  courseTitle,
  categoryName,
  certNo,
) => {
  try {
    const cat = String(categoryName || "bootcamp").toLowerCase();

    // डेट तैयार करना
    const now = new Date();
    const monthYear = now.toLocaleString("default", {
      month: "long",
      year: "numeric",
    }); // "May 2026"
    const fullDate = `${String(now.getDate()).padStart(2, "0")} ${monthYear}`; // "04 May 2026"

    let config = {};

    // --- CONFIGURATION ---
    if (cat.includes("data science")) {
      config = {
        nameSize: 80,
        nameY: 750,
        nameColor: rgb(0, 0, 0),
        courseSize: 40,
        courseX: 400,
        courseY: 320,
        courseColor: rgb(0.2, 0.2, 0.2), 
        // Date "On May 2026" के लिए
        dateY: 350,
        datePart1: "On ",
        color1: rgb(0, 0, 0),
        color2: rgb(0.5, 0, 0), // "On" Black, "Date" Dark Red
        certNoSize: 30,
        certNoX: 80,
        certNoY: 70,
        certNoColor: rgb(0, 0, 0.8),
      };
    } else if (cat.includes("data analyst")) {
      config = {
        nameSize: 70,
        nameY: 890,
        nameColor: rgb(0, 0, 0),
        courseSize: 30,
        courseX: 400,
        courseY: 700,
        courseColor: rgb(0.2, 0.2, 0.2),
        // Date "On May 2026" के लिए
        dateY: 550,
        datePart1: "On ",
        color1: rgb(0, 0, 0),
        color2: rgb(0.5, 0, 0), // "On" Black, "Date" Dark Red
        certNoSize: 30,
        certNoX: 80,
        certNoY: 400,
        certNoColor: rgb(0, 0, 0.8),
      };
    } else {
      // Bootcamp Style (Conducted By ...)
      config = {
        nameSize: 70,
        nameY: 450,
        nameColor: rgb(0, 0, 0),
        courseSize: 30,
        courseX: 300,
        courseY: 320,
        courseColor: rgb(0, 0, 0),
        conductedText: " Conducted By The iScale.",
        // Date "Date: 04 May 2026" के लिए
        dateY: 280,
        dateLabel: "Date: ",
        dateValue: fullDate,
        dateColor: rgb(0, 0, 0.5),
        certNoSize: 22,
        certNoX: 80,
        certNoY: 60,
        certNoColor: rgb(0, 0, 0),
      };
    }

    const assetsDir = path.join(__dirname, "../../assets");
    const templateName = cat.includes("data science")
      ? "ds_bg.jpeg"
      : cat.includes("data analyst")
        ? "da_bg.jpeg"
        : "bootcamp_bg.jpeg";

    const pdfDoc = await PDFDocument.create();
    pdfDoc.registerFontkit(fontkit);

    const image = await pdfDoc.embedJpg(
      fs.readFileSync(path.join(assetsDir, "templates", templateName)),
    );
    const nameFont = await pdfDoc.embedFont(
      fs.readFileSync(
        path.join(assetsDir, "fonts", "GoodVibrations-Script-400.ttf"),
      ),
    );
    const secFont = await pdfDoc.embedFont(
      fs.readFileSync(path.join(assetsDir, "fonts", "calibri-italic.ttf")),
    );

    const page = pdfDoc.addPage([image.width, image.height]);
    page.drawImage(image, {
      x: 0,
      y: 0,
      width: image.width,
      height: image.height,
    });

    // 1. Name
    page.drawText(userName, {
      x:
        image.width / 2 -
        nameFont.widthOfTextAtSize(userName, config.nameSize) / 2,
      y: config.nameY,
      size: config.nameSize,
      font: nameFont,
      color: config.nameColor,
    });

    // 2. Course & Conducted Text
    const fullCourseText = cat.includes("data")
      ? courseTitle
      : courseTitle + config.conductedText;
    page.drawText(fullCourseText, {
      x: config.courseX,
      y: config.courseY,
      size: config.courseSize,
      font: secFont,
      color: config.courseColor,
    });

    // 3. Dynamic Date Logic
    if (cat.includes("data")) {
      // "On May 2026"
      const w1 = secFont.widthOfTextAtSize(config.datePart1, config.courseSize);
      page.drawText(config.datePart1, {
        x: 400,
        y: config.dateY,
        size: config.courseSize,
        font: secFont,
        color: config.color1,
      });
      page.drawText(monthYear, {
        x: 400 + w1,
        y: config.dateY,
        size: config.courseSize,
        font: secFont,
        color: config.color2,
      });
    } else {
      // "Date: 04 May 2026"
      page.drawText(`${config.dateLabel}${config.dateValue}`, {
        x: config.courseX,
        y: config.dateY,
        size: config.courseSize,
        font: secFont,
        color: config.dateColor,
      });
    }

    // 4. Cert No
    page.drawText(certNo, {
      x: config.certNoX,
      y: config.certNoY,
      size: config.certNoSize,
      font: secFont,
      color: config.certNoColor,
    });

    const pdfBytes = await pdfDoc.save();
    fs.writeFileSync(
      path.join(assetsDir, "certificates", `Cert_${certNo}.pdf`),
      pdfBytes,
    );
    return `assets/certificates/Cert_${certNo}.pdf`;
  } catch (error) {
    throw error;
  }
};

module.exports = { generateCertificatePDF, generateUniqueCertNo };
