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
  whatsapp: "9855017454",
  email: "rajbhandariparishar@gmail.com",
  website: "https://parishar-rajbhandari-profile.vercel.app",

  address: "Chitwan, Nepal",

  instagram: "https://www.instagram.com/parishar_rajbhandari_/?hl=en",
  facebook: "https://www.facebook.com/parishar.rajbhandari.7",
  linkedin:
    "https://www.linkedin.com/in/parishar-rajbhandari-00531541b/",
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
    Existing visiting-card image.
  */
  businessCardImage: "assets/business-cards/business_card.png",

  /*
    Optional photo used inside the vCard.
    If this image cannot be fetched, the vCard
    will still be generated without the photo.
  */
  vcardPhoto: "assets/profile/business_card.jpg"
};


/* =========================================================
   GLOBALS
========================================================= */

const $ = (selector) => document.querySelector(selector);

/*
  This stores the prepared vCard so the Save Contact button
  does not need to perform an async operation after the tap.
*/
let preparedVCard = "";
let preparingVCard = false;


/* =========================================================
   BASIC HELPERS
========================================================= */

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
  if (profile.address) {
    return "https://maps.app.goo.gl/oAwfcawXmEtwf24k6";
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


/* =========================================================
   SOCIALS
========================================================= */

function socialEntries(profile) {
  return [
    {
      key: "instagram",
      label: "Instagram",
      icon: "◎",
      url: profile.instagram
    },
    {
      key: "facebook",
      label: "Facebook",
      icon: "f",
      url: profile.facebook
    },
    {
      key: "linkedin",
      label: "LinkedIn",
      icon: "in",
      url: profile.linkedin
    },
    {
      key: "youtube",
      label: "YouTube",
      icon: "▶",
      url: profile.youtube
    },
    {
      key: "tiktok",
      label: "TikTok",
      icon: "♪",
      url: profile.tiktok
    }
  ].filter((item) => item.url);
}


/* =========================================================
   PROFILE RENDERING
========================================================= */

function renderProfile(profile) {
  document.title = `${profile.name} | ${
    profile.company || "Business Profile"
  }`;

  setText("#name", profile.name);
  setText("#title", profile.title);
  setText("#company", profile.company);
  setText("#tagline", profile.tagline);
  setText("#phoneValue", profile.phone);
  setText("#emailValue", profile.email);

  setText(
    "#websiteValue",
    profile.website
      ? profile.website.replace(/^https?:\/\//, "")
      : ""
  );

  setText("#addressValue", profile.address);
  setText("#locationText", profile.address);
  setText("#description", profile.description);
  setText("#footerCompany", profile.company || profile.name);


  /* ---------------------------------------------------------
     Profile Image
  --------------------------------------------------------- */

  const profileImage = $("#profileImage");

  if (profileImage) {
    profileImage.src = profile.profileImage;
    profileImage.alt = `${profile.name} profile photo`;

    profileImage.onerror = () => {
      profileImage.src =
        "data:image/svg+xml;charset=UTF-8," +
        encodeURIComponent(
          `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600">
            <rect width="100%" height="100%" fill="#202630"/>
            <text x="50%" y="54%"
              dominant-baseline="middle"
              text-anchor="middle"
              fill="#dfe5ec"
              font-size="120"
              font-family="Arial">
              ${(profile.name || "B")[0]}
            </text>
          </svg>`
        );
    };
  }


  /* ---------------------------------------------------------
     Phone
  --------------------------------------------------------- */

  const phoneHref = profile.phone
    ? `tel:${digitsOnly(profile.phone)}`
    : "#";

  const callButton = $("#callButton");
  const phoneCard = $("#phoneCard");
  const ctaCallButton = $("#ctaCallButton");
  const mobileCall = $("#mobileCall");

  if (callButton) callButton.href = phoneHref;
  if (phoneCard) phoneCard.href = phoneHref;
  if (ctaCallButton) ctaCallButton.href = phoneHref;
  if (mobileCall) mobileCall.href = phoneHref;


  /* ---------------------------------------------------------
     WhatsApp
  --------------------------------------------------------- */

  const wa = whatsappNumber(profile.whatsapp);

  const waUrl = wa
    ? `https://wa.me/${wa}?text=${encodeURIComponent(
        profile.whatsappMessage || ""
      )}`
    : "#";

  const whatsappButton = $("#whatsappButton");
  const ctaWhatsAppButton = $("#ctaWhatsAppButton");
  const mobileWhatsApp = $("#mobileWhatsApp");

  if (whatsappButton) whatsappButton.href = waUrl;
  if (ctaWhatsAppButton) ctaWhatsAppButton.href = waUrl;
  if (mobileWhatsApp) mobileWhatsApp.href = waUrl;


  /* ---------------------------------------------------------
     Email
  --------------------------------------------------------- */

  const emailCard = $("#emailCard");

  if (emailCard) {
    emailCard.href = profile.email
      ? `mailto:${profile.email}`
      : "#";
  }


  /* ---------------------------------------------------------
     Website
  --------------------------------------------------------- */

  const websiteCard = $("#websiteCard");

  if (websiteCard) {
    websiteCard.href = profile.website || "#";
  }


  /* ---------------------------------------------------------
     Maps
  --------------------------------------------------------- */

  const mapsButton = $("#mapsButton");

  if (mapsButton) {
    mapsButton.onclick = () => {
      const url = mapsUrl(profile);

      if (url) {
        window.open(
          url,
          "_blank",
          "noopener,noreferrer"
        );
      }
    };
  }

  const locationCard = $("#locationCard");

  if (locationCard && mapsButton) {
    locationCard.onclick = () => mapsButton.click();
  }


  /* ---------------------------------------------------------
     Sections
  --------------------------------------------------------- */

  hideIfEmpty(
    "contactSection",
    profile.phone ||
      profile.email ||
      profile.website
  );

  hideIfEmpty(
    "locationSection",
    profile.address ||
      profile.latitude ||
      profile.longitude
  );


  /* ---------------------------------------------------------
     Dynamic Content
  --------------------------------------------------------- */

  renderServices(profile.services);
  renderSocials(profile);
  renderBusinessCard(profile);


  /* ---------------------------------------------------------
     SEO
  --------------------------------------------------------- */

  const ogImage = $("#ogImage");

  if (ogImage && profile.profileImage) {
    ogImage.setAttribute(
      "content",
      profile.profileImage
    );
  }

  const description = document.querySelector(
    'meta[name="description"]'
  );

  if (description) {
    description.setAttribute(
      "content",
      profile.description ||
        `${profile.name} - ${
          profile.company || "Business Profile"
        }`
    );
  }


  /*
    IMPORTANT:
    Start preparing the vCard immediately when the page loads.
    This happens BEFORE the visitor taps Save Contact.
  */
  prepareVCard();
}


/* =========================================================
   SERVICES
========================================================= */

function renderServices(services = []) {
  const section = $("#servicesSection");
  const grid = $("#servicesGrid");

  if (!section || !grid) return;

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
      <span class="service-number">
        ${String(index + 1).padStart(2, "0")}
      </span>

      <span class="service-name"></span>
    `;

    const serviceName = item.querySelector(
      ".service-name"
    );

    if (serviceName) {
      serviceName.textContent = service;
    }

    grid.appendChild(item);
  });
}


/* =========================================================
   SOCIAL LINKS
========================================================= */

function renderSocials(profile) {
  const section = $("#socialSection");
  const grid = $("#socialGrid");

  if (!section || !grid) return;

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
      <span class="social-icon">
        ${icon}
      </span>

      <span class="social-name"></span>

      <span
        class="arrow"
        style="margin-left:auto"
      >
        ↗
      </span>
    `;

    const name = item.querySelector(".social-name");

    if (name) {
      name.textContent = label;
    }

    grid.appendChild(item);
  });
}


/* =========================================================
   BUSINESS CARD
========================================================= */

function renderBusinessCard(profile) {
  const section = $("#businessCardSection");
  const preview = $("#businessCardPreview");

  if (!section || !preview) return;

  if (!profile.businessCardImage) {
    section.hidden = true;
    return;
  }

  section.hidden = false;

  preview.src = profile.businessCardImage;
  preview.alt = `${profile.name} business visiting card`;

  preview.onerror = () => {
    section.hidden = true;

    showToast(
      "Business card image could not be loaded."
    );
  };
}


/* =========================================================
   VCARD
========================================================= */

function buildVCardPhotoField(base64, mimeType) {
  if (!base64) return "";

  const extension =
    (mimeType || "image/jpeg")
      .split("/")[1] || "jpeg";

  return (
    `PHOTO;ENCODING=b;TYPE=${extension.toUpperCase()}:` +
    base64
  );
}


async function imageToBase64Data(imageUrl) {
  try {
    if (!imageUrl) {
      return {
        base64: "",
        mimeType: ""
      };
    }

    const response = await fetch(imageUrl, {
      cache: "no-cache"
    });

    if (!response.ok) {
      throw new Error(
        `Image fetch failed: ${response.status}`
      );
    }

    const blob = await response.blob();

    return await new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        const result = String(
          reader.result || ""
        );

        const comma = result.indexOf(",");

        resolve({
          base64:
            comma >= 0
              ? result.slice(comma + 1)
              : "",
          mimeType:
            blob.type || "image/jpeg"
        });
      };

      reader.onerror = reject;

      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.warn(
      "vCard photo could not be loaded:",
      error
    );

    /*
      Very important:
      Contact creation must NOT fail just because
      the photo could not be fetched.
    */
    return {
      base64: "",
      mimeType: ""
    };
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
    lines.push(
      chars.splice(0, max).join("")
    );
  }

  if (chars.length) {
    lines.push(chars.join(""));
  }

  return lines.join("\r\n ");
}


/* =========================================================
   GENERATE VCARD
========================================================= */

async function generateVCard(profile) {
  const photo = await imageToBase64Data(
    profile.vcardPhoto || profile.profileImage
  );

  const socialLines = [
    profile.instagram &&
      `item1.URL:${escapeVCard(
        profile.instagram
      )}\r\nitem1.X-ABLabel:Instagram`,

    profile.facebook &&
      `item2.URL:${escapeVCard(
        profile.facebook
      )}\r\nitem2.X-ABLabel:Facebook`,

    profile.linkedin &&
      `item3.URL:${escapeVCard(
        profile.linkedin
      )}\r\nitem3.X-ABLabel:LinkedIn`,

    profile.website &&
      `item4.URL:${escapeVCard(
        profile.website
      )}\r\nitem4.X-ABLabel:Website`
  ].filter(Boolean);

  const photoLine = buildVCardPhotoField(
    photo.base64,
    photo.mimeType
  );

  const raw = [
    "BEGIN:VCARD",
    "VERSION:3.0",

    `FN:${escapeVCard(profile.name)}`,

    `N:${escapeVCard(profile.name)};;;`,

    profile.company &&
      `ORG:${escapeVCard(profile.company)}`,

    profile.title &&
      `TITLE:${escapeVCard(profile.title)}`,

    profile.phone &&
      `TEL;TYPE=CELL,VOICE:${escapeVCard(
        profile.phone
      )}`,

    profile.whatsapp &&
      `TEL;TYPE=WORK,VOICE:${escapeVCard(
        profile.whatsapp
      )}`,

    profile.email &&
      `EMAIL;TYPE=INTERNET:${escapeVCard(
        profile.email
      )}`,

    profile.address &&
      `ADR;TYPE=WORK:;;${escapeVCard(
        profile.address
      )};;;`,

    profile.website &&
      `URL:${escapeVCard(profile.website)}`,

    profile.description &&
      `NOTE:${escapeVCard(
        profile.description
      )}`,

    ...socialLines,

    photoLine,

    "END:VCARD"
  ]
    .filter(Boolean)
    .join("\r\n");

  return raw
    .split("\r\n")
    .map(foldVCardLine)
    .join("\r\n");
}


/* =========================================================
   PREPARE VCARD IN BACKGROUND
========================================================= */

async function prepareVCard() {
  if (preparingVCard) {
    return;
  }

  /*
    Don't prepare repeatedly.
  */
  if (preparedVCard) {
    return;
  }

  preparingVCard = true;

  try {
    preparedVCard = await generateVCard(
      businessProfile
    );

    console.log(
      "vCard prepared successfully."
    );
  } catch (error) {
    console.error(
      "Could not prepare vCard:",
      error
    );

    /*
      Generate a minimal vCard without photo as
      an emergency fallback.
    */
    preparedVCard = [
      "BEGIN:VCARD",
      "VERSION:3.0",
      `FN:${escapeVCard(
        businessProfile.name
      )}`,
      businessProfile.company
        ? `ORG:${escapeVCard(
            businessProfile.company
          )}`
        : "",
      businessProfile.title
        ? `TITLE:${escapeVCard(
            businessProfile.title
          )}`
        : "",
      businessProfile.phone
        ? `TEL;TYPE=CELL,VOICE:${escapeVCard(
            businessProfile.phone
          )}`
        : "",
      businessProfile.email
        ? `EMAIL;TYPE=INTERNET:${escapeVCard(
            businessProfile.email
          )}`
        : "",
      businessProfile.website
        ? `URL:${escapeVCard(
            businessProfile.website
          )}`
        : "",
      "END:VCARD"
    ]
      .filter(Boolean)
      .join("\r\n");
  } finally {
    preparingVCard = false;
  }
}


/* =========================================================
   DOWNLOAD
========================================================= */

function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");

  a.href = url;
  a.download = filename;
  a.rel = "noopener";

  document.body.appendChild(a);

  a.click();

  a.remove();

  /*
    Do not revoke immediately.
    Some mobile browsers need a little time.
  */
  setTimeout(() => {
    URL.revokeObjectURL(url);
  }, 3000);
}


/* =========================================================
   SAVE CONTACT
========================================================= */

async function saveContact() {

  /*
    IMPORTANT:
    If the vCard has already been prepared in the background,
    we can immediately use it from the user's tap.

    This preserves the browser's user interaction permission.
  */
  if (preparedVCard) {
    await savePreparedContact(preparedVCard);
    return;
  }


  /*
    Emergency fallback.

    This creates a contact WITHOUT waiting for a photo.
    Therefore the save function still works even when:
    - the photo fetch fails
    - the connection is slow
    - the site is opened from another app
    - the browser blocks delayed downloads
  */
  const fallbackVCard = buildFallbackVCard();

  await savePreparedContact(fallbackVCard);


  /*
    Continue preparing the full version in the background
    for the next tap.
  */
  prepareVCard();
}


/* =========================================================
   FALLBACK VCARD WITHOUT PHOTO
========================================================= */

function buildFallbackVCard() {
  const socialLines = [
    businessProfile.instagram &&
      `item1.URL:${escapeVCard(
        businessProfile.instagram
      )}\r\nitem1.X-ABLabel:Instagram`,

    businessProfile.facebook &&
      `item2.URL:${escapeVCard(
        businessProfile.facebook
      )}\r\nitem2.X-ABLabel:Facebook`,

    businessProfile.linkedin &&
      `item3.URL:${escapeVCard(
        businessProfile.linkedin
      )}\r\nitem3.X-ABLabel:LinkedIn`,

    businessProfile.website &&
      `item4.URL:${escapeVCard(
        businessProfile.website
      )}\r\nitem4.X-ABLabel:Website`
  ].filter(Boolean);

  const raw = [
    "BEGIN:VCARD",
    "VERSION:3.0",

    `FN:${escapeVCard(
      businessProfile.name
    )}`,

    `N:${escapeVCard(
      businessProfile.name
    )};;;`,

    businessProfile.company &&
      `ORG:${escapeVCard(
        businessProfile.company
      )}`,

    businessProfile.title &&
      `TITLE:${escapeVCard(
        businessProfile.title
      )}`,

    businessProfile.phone &&
      `TEL;TYPE=CELL,VOICE:${escapeVCard(
        businessProfile.phone
      )}`,

    businessProfile.whatsapp &&
      `TEL;TYPE=WORK,VOICE:${escapeVCard(
        businessProfile.whatsapp
      )}`,

    businessProfile.email &&
      `EMAIL;TYPE=INTERNET:${escapeVCard(
        businessProfile.email
      )}`,

    businessProfile.address &&
      `ADR;TYPE=WORK:;;${escapeVCard(
        businessProfile.address
      )};;;`,

    businessProfile.website &&
      `URL:${escapeVCard(
        businessProfile.website
      )}`,

    businessProfile.description &&
      `NOTE:${escapeVCard(
        businessProfile.description
      )}`,

    ...socialLines,

    "END:VCARD"
  ]
    .filter(Boolean)
    .join("\r\n");

  return raw
    .split("\r\n")
    .map(foldVCardLine)
    .join("\r\n");
}


/* =========================================================
   MOBILE SAVE / SHARE CONTACT
========================================================= */

async function savePreparedContact(vcard) {
  if (!vcard) {
    showToast(
      "Could not create the contact file."
    );
    return;
  }

  const filename = safeFilename(
    businessProfile.name,
    ".vcf"
  );

  const blob = new Blob(
    [vcard],
    {
      type: "text/vcard;charset=utf-8"
    }
  );


  /*
    FIRST CHOICE:
    Use native Web Share when the browser supports
    sharing files.

    This is particularly useful on mobile browsers
    where direct Blob downloads are unreliable.
  */
  try {
    if (
      navigator.share &&
      navigator.canShare
    ) {
      const file = new File(
        [blob],
        filename,
        {
          type: "text/vcard"
        }
      );

      if (
        navigator.canShare({
          files: [file]
        })
      ) {
        await navigator.share({
          title: `${businessProfile.name} Contact`,
          text: businessProfile.company
            ? `${businessProfile.name} - ${businessProfile.company}`
            : businessProfile.name,
          files: [file]
        });

        showToast(
          "Contact file ready to save."
        );

        return;
      }
    }
  } catch (error) {

    /*
      User cancelled the share sheet.
      Do not show an error in this case.
    */
    if (
      error &&
      error.name === "AbortError"
    ) {
      return;
    }

    console.warn(
      "Native contact sharing failed:",
      error
    );
  }


  /*
    SECOND CHOICE:
    Normal .vcf download.

    This works on Chrome/Android and desktop browsers.
  */
  try {
    downloadBlob(
      blob,
      filename
    );

    showToast(
      "Contact file created. Open it to save the contact."
    );

    return;

  } catch (error) {
    console.warn(
      "Blob download failed:",
      error
    );
  }


  /*
    THIRD CHOICE:
    Open the vCard directly.

    This gives browsers such as some iOS configurations
    another way to handle the contact file.
  */
  try {
    const url = URL.createObjectURL(blob);

    window.location.href = url;

    setTimeout(() => {
      URL.revokeObjectURL(url);
    }, 5000);

    showToast(
      "Opening contact file..."
    );

  } catch (error) {
    console.error(
      "Unable to open vCard:",
      error
    );

    showToast(
      "Could not create the contact file."
    );
  }
}


/* =========================================================
   BUSINESS CARD DOWNLOAD
========================================================= */

function getImageFileName(profile) {
  const path =
    profile.businessCardImage
      .split("/")
      .pop() || "";

  const extensionMatch =
    path.match(/\.[a-z0-9]+$/i);

  const ext = extensionMatch
    ? extensionMatch[0].toLowerCase()
    : ".png";

  return safeFilename(
    profile.name,
    `-business-card${ext}`
  );
}


async function downloadExistingBusinessCard() {
  if (!businessProfile.businessCardImage) {
    return;
  }

  try {
    const response = await fetch(
      businessProfile.businessCardImage,
      {
        cache: "no-cache"
      }
    );

    if (!response.ok) {
      throw new Error(
        "Download failed"
      );
    }

    const blob = await response.blob();

    downloadBlob(
      blob,
      getImageFileName(businessProfile)
    );

    showToast(
      "Business card image downloaded."
    );

  } catch {
    const a = document.createElement("a");

    a.href =
      businessProfile.businessCardImage;

    a.download =
      getImageFileName(businessProfile);

    a.target = "_blank";
    a.rel = "noopener";

    document.body.appendChild(a);

    a.click();

    a.remove();

    showToast(
      "Opening the original business card image."
    );
  }
}


/* =========================================================
   SHARE BUSINESS CARD
========================================================= */

async function shareExistingBusinessCard() {
  const imageUrl =
    businessProfile.businessCardImage;

  if (!imageUrl) {
    return;
  }

  try {
    const response = await fetch(
      imageUrl,
      {
        cache: "no-cache"
      }
    );

    if (!response.ok) {
      throw new Error(
        "Image fetch failed"
      );
    }

    const blob = await response.blob();

    const file = new File(
      [blob],
      getImageFileName(
        businessProfile
      ),
      {
        type:
          blob.type || "image/png"
      }
    );


    if (
      navigator.canShare &&
      navigator.canShare({
        files: [file]
      })
    ) {
      await navigator.share({
        title: `${businessProfile.name} - Business Card`,

        text:
          `${businessProfile.name}` +
          (
            businessProfile.company
              ? ` - ${businessProfile.company}`
              : ""
          ),

        files: [file]
      });

      return;
    }


    if (navigator.share) {
      await navigator.share({
        title: `${businessProfile.name} - Business Card`,

        text:
          `${businessProfile.name}` +
          (
            businessProfile.company
              ? ` - ${businessProfile.company}`
              : ""
          ),

        url: window.location.href
      });

      return;
    }


    await downloadExistingBusinessCard();

  } catch (error) {

    if (
      error &&
      error.name === "AbortError"
    ) {
      return;
    }

    await downloadExistingBusinessCard();
  }
}


/* =========================================================
   SHARE PROFILE
========================================================= */

async function shareProfile() {
  const data = {
    title:
      `${businessProfile.name}` +
      (
        businessProfile.company
          ? ` - ${businessProfile.company}`
          : ""
      ),

    text:
      businessProfile.tagline ||
      `Business profile for ${businessProfile.name}`,

    url:
      window.location.href
  };

  try {

    if (navigator.share) {
      await navigator.share(data);
      return;
    }

    await navigator.clipboard.writeText(
      window.location.href
    );

    showToast(
      "Profile link copied."
    );

  } catch (error) {

    if (
      error?.name !== "AbortError"
    ) {
      showToast(
        "Could not share the profile."
      );
    }
  }
}


/* =========================================================
   TOAST
========================================================= */

function showToast(message) {
  const toast = $("#toast");

  if (!toast) return;

  toast.textContent = message;

  toast.classList.add("show");

  clearTimeout(
    showToast.timer
  );

  showToast.timer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2500);
}


/* =========================================================
   COPY
========================================================= */

async function copyText(value) {
  try {
    await navigator.clipboard.writeText(
      value
    );

    showToast(
      "Copied to clipboard."
    );

  } catch {
    showToast(
      "Copy is not available in this browser."
    );
  }
}


/* =========================================================
   INTERACTIONS
========================================================= */

function setupInteractions() {

  const saveContactButton =
    $("#saveContactButton");

  const mobileSaveContact =
    $("#mobileSaveContact");

  const downloadCardButton =
    $("#downloadCardButton");

  const shareCardButton =
    $("#shareCardButton");

  const shareProfileButton =
    $("#shareProfileButton");


  /*
    IMPORTANT:
    Do NOT make these event handlers wait for
    image fetching before initiating the action.
  */

  if (saveContactButton) {
    saveContactButton.addEventListener(
      "click",
      () => {
        saveContact();
      }
    );
  }

  if (mobileSaveContact) {
    mobileSaveContact.addEventListener(
      "click",
      () => {
        saveContact();
      }
    );
  }

  if (downloadCardButton) {
    downloadCardButton.addEventListener(
      "click",
      () => {
        downloadExistingBusinessCard();
      }
    );
  }

  if (shareCardButton) {
    shareCardButton.addEventListener(
      "click",
      () => {
        shareExistingBusinessCard();
      }
    );
  }

  if (shareProfileButton) {
    shareProfileButton.addEventListener(
      "click",
      () => {
        shareProfile();
      }
    );
  }


  /* ---------------------------------------------------------
     Copy buttons
  --------------------------------------------------------- */

  document
    .querySelectorAll("[data-copy-target]")
    .forEach((btn) => {

      btn.addEventListener(
        "click",
        async (event) => {

          event.preventDefault();
          event.stopPropagation();

          const target =
            document.getElementById(
              btn.dataset.copyTarget
            );

          if (
            target &&
            target.textContent
          ) {
            await copyText(
              target.textContent
            );
          }
        }
      );
    });


  /* ---------------------------------------------------------
     Read More
  --------------------------------------------------------- */

  const aboutCard =
    document.querySelector(
      ".about-card"
    );

  const readMore =
    $("#readMoreButton");


  if (aboutCard && readMore) {

    requestAnimationFrame(() => {

      const p =
        $("#description");

      if (
        p &&
        p.scrollHeight >
          p.clientHeight + 8
      ) {
        readMore.hidden = false;
      }
    });


    readMore.addEventListener(
      "click",
      () => {

        const expanded =
          aboutCard.classList.toggle(
            "expanded"
          );

        readMore.textContent =
          expanded
            ? "Show Less"
            : "Read More";
      }
    );
  }


  /* ---------------------------------------------------------
     External links
  --------------------------------------------------------- */

  document
    .querySelectorAll("a")
    .forEach((link) => {

      link.addEventListener(
        "click",
        () => {

          if (
            link.href === "#" ||
            !link.href
          ) {
            return;
          }

        }
      );
    });
}


/* =========================================================
   INITIALIZE
========================================================= */

renderProfile(
  businessProfile
);

setupInteractions();