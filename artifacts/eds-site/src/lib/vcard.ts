export interface VCardData {
  firstName: string;
  lastName: string;
  title: string;
  organization: string;
  phone: string;
  email: string;
  url: string;
  photoUrl?: string;
  address?: {
    street: string;
    city: string;
    region: string;
    postalCode: string;
    country: string;
  };
}

function escape(value: string): string {
  return value.replace(/\\/g, "\\\\").replace(/,/g, "\\,").replace(/;/g, "\\;").replace(/\n/g, "\\n");
}

export function buildVCard(d: VCardData): string {
  const lines = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `N:${escape(d.lastName)};${escape(d.firstName)};;;`,
    `FN:${escape(`${d.firstName} ${d.lastName}`)}`,
    `ORG:${escape(d.organization)}`,
    `TITLE:${escape(d.title)}`,
    `TEL;TYPE=CELL,VOICE:${d.phone.replace(/\s+/g, "")}`,
    `EMAIL;TYPE=INTERNET,WORK:${d.email}`,
    `URL:${d.url}`,
  ];
  if (d.photoUrl) lines.push(`PHOTO;VALUE=URI:${d.photoUrl}`);
  if (d.address) {
    const a = d.address;
    lines.push(
      `ADR;TYPE=WORK:;;${escape(a.street)};${escape(a.city)};${escape(a.region)};${escape(a.postalCode)};${escape(a.country)}`,
    );
  }
  lines.push("END:VCARD");
  return lines.join("\r\n");
}

export function downloadVCard(data: VCardData, filename: string): void {
  const blob = new Blob([buildVCard(data)], { type: "text/vcard;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename.endsWith(".vcf") ? filename : `${filename}.vcf`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
