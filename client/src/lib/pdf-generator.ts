import { jsPDF } from 'jspdf';

export interface CertificateData {
  studentName: string;
  scores: {
    wordGames: number;
    nutrition: number;
    nervousSystem: number;
    eatingDisorders: number;
    cnsDisorders: number;
    biblicalIntegration: number;
  };
  totalScore: number;
  completionDate: string;
}

export const generateCertificatePDF = (data: CertificateData): void => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  // Background color
  doc.setFillColor(240, 248, 255);
  doc.rect(0, 0, pageWidth, pageHeight, 'F');

  // Border
  doc.setDrawColor(25, 118, 210);
  doc.setLineWidth(2);
  doc.rect(10, 10, pageWidth - 20, pageHeight - 20);

  // Inner border
  doc.setDrawColor(100, 181, 246);
  doc.setLineWidth(0.5);
  doc.rect(15, 15, pageWidth - 30, pageHeight - 30);

  // Title
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(32);
  doc.setTextColor(25, 118, 210);
  doc.text('CERTIFICATE OF COMPLETION', pageWidth / 2, 50, { align: 'center' });

  // Subtitle
  doc.setFontSize(14);
  doc.setTextColor(100, 100, 100);
  doc.text('EducaInteractiva: Health & Faith Workshop', pageWidth / 2, 65, { align: 'center' });

  // Student name
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);
  doc.text('This certifies that', pageWidth / 2, 85, { align: 'center' });

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(20);
  doc.setTextColor(25, 118, 210);
  doc.text(data.studentName, pageWidth / 2, 100, { align: 'center' });

  // Achievement text
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);
  doc.text('has successfully completed the', pageWidth / 2, 115, { align: 'center' });
  doc.text('EducaInteractiva Workshop', pageWidth / 2, 122, { align: 'center' });

  // Scores section
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text('Module Scores:', 25, 145);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  const scoreY = 155;
  const lineHeight = 8;

  const modules = [
    { name: 'Word Games', score: data.scores.wordGames },
    { name: 'Nutrition', score: data.scores.nutrition },
    { name: 'Nervous System', score: data.scores.nervousSystem },
    { name: 'Eating Disorders', score: data.scores.eatingDisorders },
    { name: 'CNS Diseases', score: data.scores.cnsDisorders },
    { name: 'Biblical Integration', score: data.scores.biblicalIntegration }
  ];

  modules.forEach((module, index) => {
    const yPos = scoreY + (index * lineHeight);
    doc.text(`${module.name}: ${module.score}%`, 30, yPos);
  });

  // Total score
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(25, 118, 210);
  doc.text(`Total Score: ${data.totalScore}%`, pageWidth / 2, scoreY + (modules.length * lineHeight) + 10, { align: 'center' });

  // Completion date
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  doc.text(`Completed on: ${data.completionDate}`, pageWidth / 2, pageHeight - 50, { align: 'center' });

  // Biblical reflection
  doc.setFontSize(9);
  doc.setTextColor(80, 80, 80);
  const reflection = '"Your body is a temple of the Holy Spirit" - 1 Corinthians 6:19';
  doc.text(reflection, pageWidth / 2, pageHeight - 40, { align: 'center' });

  // Signature line
  doc.setDrawColor(0, 0, 0);
  doc.line(30, pageHeight - 25, 70, pageHeight - 25);
  doc.setFontSize(9);
  doc.text('EducaInteractiva', 50, pageHeight - 20, { align: 'center' });

  // Save PDF
  const filename = `EducaInteractiva_Certificate_${data.studentName.replace(/\s+/g, '_')}_${new Date().getTime()}.pdf`;
  doc.save(filename);
};

export const generateCertificatePDFBlob = (data: CertificateData): Blob => {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  doc.setFillColor(240, 248, 255);
  doc.rect(0, 0, pageWidth, pageHeight, 'F');
  doc.setDrawColor(25, 118, 210);
  doc.setLineWidth(2);
  doc.rect(10, 10, pageWidth - 20, pageHeight - 20);
  doc.setDrawColor(100, 181, 246);
  doc.setLineWidth(0.5);
  doc.rect(15, 15, pageWidth - 30, pageHeight - 30);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(32);
  doc.setTextColor(25, 118, 210);
  doc.text('CERTIFICATE OF COMPLETION', pageWidth / 2, 50, { align: 'center' });
  doc.setFontSize(14);
  doc.setTextColor(100, 100, 100);
  doc.text('EducaInteractiva: Health & Faith Workshop', pageWidth / 2, 65, { align: 'center' });
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);
  doc.text('This certifies that', pageWidth / 2, 85, { align: 'center' });
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(20);
  doc.setTextColor(25, 118, 210);
  doc.text(data.studentName, pageWidth / 2, 100, { align: 'center' });
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);
  doc.text('has successfully completed the', pageWidth / 2, 115, { align: 'center' });
  doc.text('EducaInteractiva Workshop', pageWidth / 2, 122, { align: 'center' });
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text('Module Scores:', 25, 145);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  const scoreY = 155;
  const lineHeight = 8;
  const modules = [
    { name: 'Word Games', score: data.scores.wordGames },
    { name: 'Nutrition', score: data.scores.nutrition },
    { name: 'Nervous System', score: data.scores.nervousSystem },
    { name: 'Eating Disorders', score: data.scores.eatingDisorders },
    { name: 'CNS Diseases', score: data.scores.cnsDisorders },
    { name: 'Biblical Integration', score: data.scores.biblicalIntegration },
  ];
  modules.forEach((module, index) => {
    doc.text(`${module.name}: ${module.score}%`, 30, scoreY + index * lineHeight);
  });
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(25, 118, 210);
  doc.text(`Total Score: ${data.totalScore}%`, pageWidth / 2, scoreY + modules.length * lineHeight + 10, { align: 'center' });
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  doc.text(`Completed on: ${data.completionDate}`, pageWidth / 2, pageHeight - 50, { align: 'center' });
  doc.setFontSize(9);
  doc.setTextColor(80, 80, 80);
  doc.text('"Your body is a temple of the Holy Spirit" - 1 Corinthians 6:19', pageWidth / 2, pageHeight - 40, { align: 'center' });
  doc.setDrawColor(0, 0, 0);
  doc.line(30, pageHeight - 25, 70, pageHeight - 25);
  doc.setFontSize(9);
  doc.text('EducaInteractiva', 50, pageHeight - 20, { align: 'center' });
  // Use arraybuffer + explicit MIME type for Safari/iOS compatibility
  const buffer = doc.output('arraybuffer');
  return new Blob([buffer], { type: 'application/pdf' });
};

export const downloadCertificate = (data: CertificateData): void => {
  const blob = generateCertificatePDFBlob(data);
  const filename = `EducaInteractiva_Certificate_${data.studentName.replace(/\s+/g, '_')}_${new Date().getTime()}.pdf`;
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
};
