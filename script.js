/*
  NFC DIGITAL BUSINESS PROFILE
  ---------------------------------------
  Edit only the `businessProfile` object
  to create a new professional profile.
*/

const businessProfile = {
  slug: "parishar-rajbhandari",

  name: "Parishar Rajbhandari",
  title: "Manager",
  company: "Hamro Trading Concern Pvt. Ltd.",

  profileImage: "assets/profile/parishar.jpeg",
  logo: "assets/logos/company_logo.png",

  tagline: "Decor your space.",

  description:
    "We provide premium range of Curtains, carpets, vinyl parquets, laminate parquets, mattress, rugs etc to decorate your home and office.",

  phone: "+977 9855017454",
  whatsapp: "+977 98855017454",
  email: "rajbhandariparishar@gmail.com",
  website: "https://example.com",

  address: "Chitwan, Nepal",
  

  instagram: "https://www.instagram.com/parishar_rajbhandari_/?hl=en",
  facebook: "https://www.facebook.com/parishar.rajbhandari.7",
  linkedin: "https://www.linkedin.com/in/parishar-rajbhandari-00531541b/",
  youtube: "",
  tiktok: "",

  whatsappMessage:
    "Hello, I found your business profile through your NFC card and would like to know more about your services.",

  services: [
    "Premium Curtains",
    "Carpets and Parquets",
    "Installation Services",
    "Stitching Service"
  ],

  /*
    IMPORTANT:
    This is the EXISTING visiting-card image.
    The app downloads/shares this exact file.
    It does NOT generate or redraw a card.
  */
  businessCardImage: "assets/business-cards/business_card.png",

  /*
    Optional: used for vCard PHOTO.
    Keep this as a same-origin/local image when possible.
  */
  vcardPhoto: "assets/profile/business_card.jpg"
};

const $ = (selector) => document.querySelector(selector);

function setText(selector, value) {
  const el = $(selector);
  if (el) el.textContent = value || "";
}

function hideIfEmpty(id, value) {
  const el = document.getElementById(id);
  if (!el) return;
  el.hidden = !value;
}

function digitsOnly(value) {
  return String(value || "").replace(/[^\d+]/g, "");
}

function whatsappNumber(value) {
  return String(value || "").replace(/\D/g, "");
}

function mapsUrl(profile) {
  if (profile.addresslink) {
    return `https://maps.app.goo.gl/oAwfcawXmEtwf24k6`;
  }
  return "";
}

function safeFilename(name, suffix) {
  const base = String(name || "business-profile")
    .normalize("NFKD")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .toLowerCase();

  return `${base || "business-profile"}${suffix}`;
}

function socialEntries(profile) {
  return [
    { key: "instagram", label: "Instagram", icon: "◎", url: profile.instagram },
    { key: "facebook", label: "Facebook", icon: "f", url: profile.facebook },
    { key: "linkedin", label: "LinkedIn", icon: "in", url: profile.linkedin },
    { key: "youtube", label: "YouTube", icon: "▶", url: profile.youtube },
    { key: "tiktok", label: "TikTok", icon: "♪", url: profile.tiktok }
  ].filter(item => item.url);
}

function renderProfile(profile) {
  document.title = `${profile.name} | ${profile.company || "Business Profile"}`;

  setText("#name", profile.name);
  setText("#title", profile.title);
  setText("#company", profile.company);
  setText("#tagline", profile.tagline);
  setText("#phoneValue", profile.phone);
  setText("#emailValue", profile.email);
  setText("#websiteValue", profile.website.replace(/^https?:\/\//, ""));
  setText("#addressValue", profile.address);
  setText("#locationText", profile.address);
  setText("#description", profile.description);
  setText("#footerCompany", profile.company || profile.name);

  const profileImage = $("#profileImage");
  profileImage.src = profile.profileImage;
  profileImage.alt = `${profile.name} profile photo`;
  profileImage.onerror = () => {
    profileImage.src =
      "data:image/svg+xml;charset=UTF-8," +
      encodeURIComponent(
        `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600">
          <rect width="100%" height="100%" fill="#202630"/>
          <text x="50%" y="54%" dominant-baseline="middle" text-anchor="middle"
            fill="#dfe5ec" font-size="120" font-family="Arial">${(profile.name || "B")[0]}</text>
        </svg>`
      );
  };

  $("#callButton").href = `tel:${digitsOnly(profile.phone)}`;
  $("#phoneCard").href = `tel:${digitsOnly(profile.phone)}`;
  $("#ctaCallButton").href = `tel:${digitsOnly(profile.phone)}`;
  $("#mobileCall").href = `tel:${digitsOnly(profile.phone)}`;

  const wa = whatsappNumber(profile.whatsapp);
  const waUrl = wa
    ? `https://wa.me/${wa}?text=${encodeURIComponent(profile.whatsappMessage || "")}`
    : "";

  $("#whatsappButton").href = waUrl || "#";
  $("#ctaWhatsAppButton").href = waUrl || "#";
  $("#mobileWhatsApp").href = waUrl || "#";

  $("#emailCard").href = profile.email ? `mailto:${profile.email}` : "#";

  $("#websiteCard").href = profile.website || "#";
  $("#mapsButton").onclick = () => {
    const url = mapsUrl(profile);
    if (url) window.open(url, "_blank", "noopener,noreferrer");
  };
  $("#locationCard").onclick = () => $("#mapsButton").click();

  hideIfEmpty("contactSection", profile.phone || profile.email || profile.website);
  hideIfEmpty("locationSection", profile.address || profile.latitude || profile.longitude);

  renderServices(profile.services);
  renderSocials(profile);
  renderBusinessCard(profile);

  const ogImage = $("#ogImage");
  if (ogImage && profile.profileImage) ogImage.setAttribute("content", profile.profileImage);

  const description = document.querySelector('meta[name="description"]');
  if (description) {
    description.setAttribute(
      "content",
      profile.description || `${profile.name} - ${profile.company || "Business Profile"}`
    );
  }
}

function renderServices(services = []) {
  const section = $("#servicesSection");
  const grid = $("#servicesGrid");
  grid.innerHTML = "";

  if (!services.length) {
    section.hidden = true;
    return;
  }

  section.hidden = false;

  services.forEach((service, index) => {
    const item = document.createElement("div");
    item.className = "service-item";
    item.innerHTML = `
      <span class="service-number">${String(index + 1).padStart(2, "0")}</span>
      <span class="service-name"></span>
    `;
    item.querySelector(".service-name").textContent = service;
    grid.appendChild(item);
  });
}

function renderSocials(profile) {
  const section = $("#socialSection");
  const grid = $("#socialGrid");
  grid.innerHTML = "";

  const entries = socialEntries(profile);

  if (!entries.length) {
    section.hidden = true;
    return;
  }

  section.hidden = false;

  entries.forEach(({ label, icon, url }) => {
    const item = document.createElement("a");
    item.className = "social-item";
    item.href = url;
    item.target = "_blank";
    item.rel = "noopener noreferrer";
    item.innerHTML = `
      <span class="social-icon">${icon}</span>
      <span class="social-name"></span>
      <span class="arrow" style="margin-left:auto">↗</span>
    `;
    item.querySelector(".social-name").textContent = label;
    grid.appendChild(item);
  });
}

function renderBusinessCard(profile) {
  const section = $("#businessCardSection");
  const preview = $("#businessCardPreview");

  if (!profile.businessCardImage) {
    section.hidden = true;
    return;
  }

  section.hidden = false;
  preview.src = profile.businessCardImage;
  preview.alt = `${profile.name} business visiting card`;
  preview.onerror = () => {
    section.hidden = true;
    showToast("Business card image could not be loaded.");
  };
}

function buildVCardPhotoField(base64, mimeType) {
  if (!base64) return "";
  const extension = (mimeType || "image/jpeg").split("/")[1] || "jpeg";
  return `PHOTO;ENCODING=b;TYPE=${extension.toUpperCase()}:${base64}`;
}

async function imageToBase64Data(imageUrl) {
  try {
    const response = await fetch(imageUrl, { cache: "no-cache" });
    if (!response.ok) throw new Error("Image fetch failed");
    const blob = await response.blob();

    return await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = String(reader.result || "");
        const comma = result.indexOf(",");
        resolve({
          base64: comma >= 0 ? result.slice(comma + 1) : "",
          mimeType: blob.type || "image/jpeg"
        });
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch {
    return { base64: "", mimeType: "" };
  }
}

function escapeVCard(value) {
  return String(value || "")
    .replace(/\\/g, "\\\\")
    .replace(/\n/g, "\\n")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,");
}

function foldVCardLine(line) {
  const max = 72;
  const chars = Array.from(line);
  const lines = [];
  while (chars.length > max) {
    lines.push(chars.splice(0, max).join(""));
  }
  if (chars.length) lines.push(chars.join(""));
  return lines.join("\r\n ");
}

async function generateVCard(profile) {
  const photo = await imageToBase64Data(profile.vcardPhoto || profile.profileImage);

  const socialLines = [
    profile.instagram && `item1.URL:${escapeVCard(profile.instagram)}\r\nitem1.X-ABLabel:Instagram`,
    profile.facebook && `item2.URL:${escapeVCard(profile.facebook)}\r\nitem2.X-ABLabel:Facebook`,
    profile.linkedin && `item3.URL:${escapeVCard(profile.linkedin)}\r\nitem3.X-ABLabel:LinkedIn`,
    profile.website && `item4.URL:${escapeVCard(profile.website)}\r\nitem4.X-ABLabel:Website`
  ].filter(Boolean);

  const photoLine = buildVCardPhotoField(photo.base64, photo.mimeType);

  const raw = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `FN:${escapeVCard(profile.name)}`,
    `N:${escapeVCard(profile.name)};;;`,
    profile.company && `ORG:${escapeVCard(profile.company)}`,
    profile.title && `TITLE:${escapeVCard(profile.title)}`,
    profile.phone && `TEL;TYPE=CELL,VOICE:${escapeVCard(profile.phone)}`,
    profile.whatsapp && `TEL;TYPE=WORK,VOICE:${escapeVCard(profile.whatsapp)}`,
    profile.email && `EMAIL;TYPE=INTERNET:${escapeVCard(profile.email)}`,
    profile.address && `ADR;TYPE=WORK:;;${escapeVCard(profile.address)};;;`,
    profile.website && `URL:${escapeVCard(profile.website)}`,
    profile.description && `NOTE:${escapeVCard(profile.description)}`,
    ...socialLines,
    photoLine,
    "END:VCARD"
  ].filter(Boolean).join("\r\n");

  return raw.split("\r\n").map(foldVCardLine).join("\r\n");
}

function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.rel = "noopener";
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1500);
}

async function saveContact() {
  const vcard = await generateVCard(businessProfile);
  const blob = new Blob([vcard], { type: "text/vcard;charset=utf-8" });
  downloadBlob(blob, safeFilename(businessProfile.name, ".vcf"));
  showToast("Contact file created. Open it to save the contact.");
}

function getImageFileName(profile) {
  const path = profile.businessCardImage.split("/").pop() || "";
  const extensionMatch = path.match(/\.[a-z0-9]+$/i);
  const ext = extensionMatch ? extensionMatch[0].toLowerCase() : ".png";
  return safeFilename(profile.name, `-business-card${ext}`);
}

async function downloadExistingBusinessCard() {
  if (!businessProfile.businessCardImage) return;

  try {
    const response = await fetch(businessProfile.businessCardImage, { cache: "no-cache" });
    if (!response.ok) throw new Error("Download failed");
    const blob = await response.blob();
    downloadBlob(blob, getImageFileName(businessProfile));
    showToast("Business card image downloaded.");
  } catch {
    // Direct navigation is a useful same-origin fallback.
    const a = document.createElement("a");
    a.href = businessProfile.businessCardImage;
    a.download = getImageFileName(businessProfile);
    a.target = "_blank";
    a.rel = "noopener";
    document.body.appendChild(a);
    a.click();
    a.remove();
    showToast("Opening the original business card image.");
  }
}

async function shareExistingBusinessCard() {
  const imageUrl = businessProfile.businessCardImage;
  if (!imageUrl) return;

  try {
    const response = await fetch(imageUrl, { cache: "no-cache" });
    if (!response.ok) throw new Error("Image fetch failed");
    const blob = await response.blob();

    const file = new File([blob], getImageFileName(businessProfile), {
      type: blob.type || "image/png"
    });

    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      await navigator.share({
        title: `${businessProfile.name} - Business Card`,
        text: `${businessProfile.name}${businessProfile.company ? " - " + businessProfile.company : ""}`,
        files: [file]
      });
      return;
    }

    if (navigator.share) {
      await navigator.share({
        title: `${businessProfile.name} - Business Card`,
        text: `${businessProfile.name}${businessProfile.company ? " - " + businessProfile.company : ""}`,
        url: window.location.href
      });
      return;
    }

    await downloadExistingBusinessCard();
  } catch (error) {
    if (error?.name === "AbortError") return;
    await downloadExistingBusinessCard();
  }
}

async function shareProfile() {
  const data = {
    title: `${businessProfile.name}${businessProfile.company ? " - " + businessProfile.company : ""}`,
    text: businessProfile.tagline || `Business profile for ${businessProfile.name}`,
    url: window.location.href
  };

  try {
    if (navigator.share) {
      await navigator.share(data);
      return;
    }
    await navigator.clipboard.writeText(window.location.href);
    showToast("Profile link copied.");
  } catch (error) {
    if (error?.name !== "AbortError") {
      showToast("Could not share the profile.");
    }
  }
}

function showToast(message) {
  const toast = $("#toast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove("show"), 2500);
}

async function copyText(value) {
  try {
    await navigator.clipboard.writeText(value);
    showToast("Copied to clipboard.");
  } catch {
    showToast("Copy is not available in this browser.");
  }
}

function setupInteractions() {
  $("#saveContactButton").addEventListener("click", saveContact);
  $("#mobileSaveContact").addEventListener("click", saveContact);
  $("#downloadCardButton").addEventListener("click", downloadExistingBusinessCard);
  $("#shareCardButton").addEventListener("click", shareExistingBusinessCard);
  $("#shareProfileButton").addEventListener("click", shareProfile);

  document.querySelectorAll("[data-copy-target]").forEach((btn) => {
    btn.addEventListener("click", async (event) => {
      event.preventDefault();
      event.stopPropagation();
      const target = document.getElementById(btn.dataset.copyTarget);
      if (target?.textContent) await copyText(target.textContent);
    });
  });

  const aboutCard = document.querySelector(".about-card");
  const readMore = $("#readMoreButton");

  // Show Read More only when the description is longer than the collapsed area.
  requestAnimationFrame(() => {
    const p = $("#description");
    if (p.scrollHeight > p.clientHeight + 8) {
      readMore.hidden = false;
    }
  });

  readMore.addEventListener("click", () => {
    const expanded = aboutCard.classList.toggle("expanded");
    readMore.textContent = expanded ? "Show Less" : "Read More";
  });

  // Respect native mobile navigation for external/social links.
  document.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      if (link.href === "#" || !link.href) return;
    });
  });
}

renderProfile(businessProfile);
setupInteractions();
