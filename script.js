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

  website:
    "https://parishar-rajbhandari-profile.vercel.app",

  address: "Chitwan, Nepal",

  instagram:
    "https://www.instagram.com/parishar_rajbhandari_/?hl=en",

  facebook:
    "https://www.facebook.com/parishar.rajbhandari.7",

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

  businessCardImage:
    "assets/business-cards/business_card.png",

  vcardPhoto:
    "assets/profile/business_card.jpg",

  /*
    IMPORTANT:
    This is the real hosted contact file.

    This method is much more reliable on mobile
    than generating the VCF through JavaScript.
  */
  contactFile:
    "assets/contacts/parishar-rajbhandari.vcf"
};


/* =========================================================
   BASIC HELPERS
========================================================= */

const $ = (selector) => {
  try {
    return document.querySelector(selector);
  } catch {
    return null;
  }
};


function setText(selector, value) {
  const el = $(selector);

  if (el) {
    el.textContent = value || "";
  }
}


function hideIfEmpty(id, value) {
  const el =
    document.getElementById(id);

  if (!el) {
    return;
  }

  el.hidden = !value;
}


function digitsOnly(value) {
  return String(value || "")
    .replace(/[^\d+]/g, "");
}


function whatsappNumber(value) {
  return String(value || "")
    .replace(/\D/g, "");
}


function mapsUrl(profile) {
  if (profile.address) {
    return "https://maps.app.goo.gl/oAwfcawXmEtwf24k6";
  }

  return "";
}


function safeFilename(name, suffix) {
  const base =
    String(
      name || "business-profile"
    )
      .normalize("NFKD")
      .replace(
        /[^\w\s-]/g,
        ""
      )
      .trim()
      .replace(
        /\s+/g,
        "-"
      )
      .toLowerCase();

  return `${
    base ||
    "business-profile"
  }${suffix}`;
}


/* =========================================================
   SOCIAL
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
  ].filter(
    item => item.url
  );
}


/* =========================================================
   RENDER PROFILE
========================================================= */

function renderProfile(profile) {

  document.title =
    `${profile.name} | ${
      profile.company ||
      "Business Profile"
    }`;


  /* -----------------------------------------
     Text
  ----------------------------------------- */

  setText(
    "#name",
    profile.name
  );

  setText(
    "#title",
    profile.title
  );

  setText(
    "#company",
    profile.company
  );

  setText(
    "#tagline",
    profile.tagline
  );

  setText(
    "#phoneValue",
    profile.phone
  );

  setText(
    "#emailValue",
    profile.email
  );

  setText(
    "#websiteValue",
    profile.website
      ? profile.website.replace(
          /^https?:\/\//,
          ""
        )
      : ""
  );

  setText(
    "#addressValue",
    profile.address
  );

  setText(
    "#locationText",
    profile.address
  );

  setText(
    "#description",
    profile.description
  );

  setText(
    "#footerCompany",
    profile.company ||
      profile.name
  );


  /* -----------------------------------------
     Profile Image
  ----------------------------------------- */

  const profileImage =
    $("#profileImage");

  if (profileImage) {

    profileImage.src =
      profile.profileImage;

    profileImage.alt =
      `${profile.name} profile photo`;

    profileImage.onerror =
      () => {

        profileImage.src =
          "data:image/svg+xml;charset=UTF-8," +
          encodeURIComponent(
            `<svg xmlns="http://www.w3.org/2000/svg"
              width="600"
              height="600">

              <rect
                width="100%"
                height="100%"
                fill="#202630"
              />

              <text
                x="50%"
                y="54%"
                dominant-baseline="middle"
                text-anchor="middle"
                fill="#dfe5ec"
                font-size="120"
                font-family="Arial"
              >
                ${(profile.name || "B")[0]}
              </text>

            </svg>`
          );
      };
  }


  /* -----------------------------------------
     Phone
  ----------------------------------------- */

  const phoneHref =
    profile.phone
      ? `tel:${digitsOnly(
          profile.phone
        )}`
      : "#";

  const callButton =
    $("#callButton");

  const phoneCard =
    $("#phoneCard");

  const ctaCallButton =
    $("#ctaCallButton");

  const mobileCall =
    $("#mobileCall");

  if (callButton) {
    callButton.href =
      phoneHref;
  }

  if (phoneCard) {
    phoneCard.href =
      phoneHref;
  }

  if (ctaCallButton) {
    ctaCallButton.href =
      phoneHref;
  }

  if (mobileCall) {
    mobileCall.href =
      phoneHref;
  }


  /* -----------------------------------------
     WhatsApp
  ----------------------------------------- */

  const wa =
    whatsappNumber(
      profile.whatsapp
    );

  const waUrl =
    wa
      ? `https://wa.me/${wa}?text=${encodeURIComponent(
          profile.whatsappMessage ||
            ""
        )}`
      : "#";

  const whatsappButton =
    $("#whatsappButton");

  const ctaWhatsAppButton =
    $("#ctaWhatsAppButton");

  const mobileWhatsApp =
    $("#mobileWhatsApp");

  if (whatsappButton) {
    whatsappButton.href =
      waUrl;
  }

  if (ctaWhatsAppButton) {
    ctaWhatsAppButton.href =
      waUrl;
  }

  if (mobileWhatsApp) {
    mobileWhatsApp.href =
      waUrl;
  }


  /* -----------------------------------------
     Email
  ----------------------------------------- */

  const emailCard =
    $("#emailCard");

  if (emailCard) {

    emailCard.href =
      profile.email
        ? `mailto:${profile.email}`
        : "#";
  }


  /* -----------------------------------------
     Website
  ----------------------------------------- */

  const websiteCard =
    $("#websiteCard");

  if (websiteCard) {
    websiteCard.href =
      profile.website || "#";
  }


  /* -----------------------------------------
     Maps
  ----------------------------------------- */

  const mapsButton =
    $("#mapsButton");

  if (mapsButton) {

    mapsButton.onclick =
      () => {

        const url =
          mapsUrl(profile);

        if (url) {

          window.open(
            url,
            "_blank",
            "noopener,noreferrer"
          );
        }
      };
  }


  const locationCard =
    $("#locationCard");

  if (
    locationCard &&
    mapsButton
  ) {

    locationCard.onclick =
      () => {
        mapsButton.click();
      };
  }


  /* -----------------------------------------
     Sections
  ----------------------------------------- */

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


  /* -----------------------------------------
     Render
  ----------------------------------------- */

  renderServices(
    profile.services
  );

  renderSocials(
    profile
  );

  renderBusinessCard(
    profile
  );


  /* -----------------------------------------
     Open Graph
  ----------------------------------------- */

  const ogImage =
    $("#ogImage");

  if (
    ogImage &&
    profile.profileImage
  ) {

    ogImage.setAttribute(
      "content",
      profile.profileImage
    );
  }


  /* -----------------------------------------
     Meta Description
  ----------------------------------------- */

  const description =
    document.querySelector(
      'meta[name="description"]'
    );

  if (description) {

    description.setAttribute(
      "content",
      profile.description ||
        `${profile.name} - ${
          profile.company ||
          "Business Profile"
        }`
    );
  }
}


/* =========================================================
   SERVICES
========================================================= */

function renderServices(
  services = []
) {

  const section =
    $("#servicesSection");

  const grid =
    $("#servicesGrid");

  if (
    !section ||
    !grid
  ) {
    return;
  }

  grid.innerHTML = "";

  if (!services.length) {
    section.hidden = true;
    return;
  }

  section.hidden =
    false;

  services.forEach(
    (service, index) => {

      const item =
        document.createElement(
          "div"
        );

      item.className =
        "service-item";

      item.innerHTML = `
        <span class="service-number">
          ${String(index + 1).padStart(
            2,
            "0"
          )}
        </span>

        <span class="service-name"></span>
      `;

      const serviceName =
        item.querySelector(
          ".service-name"
        );

      if (serviceName) {
        serviceName.textContent =
          service;
      }

      grid.appendChild(
        item
      );
    }
  );
}


/* =========================================================
   SOCIALS
========================================================= */

function renderSocials(
  profile
) {

  const section =
    $("#socialSection");

  const grid =
    $("#socialGrid");

  if (
    !section ||
    !grid
  ) {
    return;
  }

  grid.innerHTML = "";

  const entries =
    socialEntries(
      profile
    );

  if (!entries.length) {
    section.hidden = true;
    return;
  }

  section.hidden =
    false;

  entries.forEach(
    ({
      label,
      icon,
      url
    }) => {

      const item =
        document.createElement(
          "a"
        );

      item.className =
        "social-item";

      item.href =
        url;

      item.target =
        "_blank";

      item.rel =
        "noopener noreferrer";

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

      const name =
        item.querySelector(
          ".social-name"
        );

      if (name) {
        name.textContent =
          label;
      }

      grid.appendChild(
        item
      );
    }
  );
}


/* =========================================================
   BUSINESS CARD
========================================================= */

function renderBusinessCard(
  profile
) {

  const section =
    $("#businessCardSection");

  const preview =
    $("#businessCardPreview");

  if (
    !section ||
    !preview
  ) {
    return;
  }

  if (
    !profile.businessCardImage
  ) {

    section.hidden =
      true;

    return;
  }

  section.hidden =
    false;

  preview.src =
    profile.businessCardImage;

  preview.alt =
    `${profile.name} business visiting card`;

  preview.onerror =
    () => {

      section.hidden =
        true;

      showToast(
        "Business card image could not be loaded."
      );
    };
}


/* =========================================================
   SAVE CONTACT
========================================================= */

/*
  IMPORTANT:

  There is intentionally NO:
    fetch()
    async
    await
    Blob
    FileReader
    navigator.share()

  in this function.

  The browser is simply told to open the real
  .vcf file hosted on your website.
*/

function saveContact() {

  const contactUrl =
    businessProfile.contactFile;

  if (!contactUrl) {

    showToast(
      "Contact file is not configured."
    );

    return;
  }


  /*
    Convert relative URL into an absolute URL.
  */
  const absoluteUrl =
    new URL(
      contactUrl,
      window.location.href
    ).href;


  /*
    Direct browser navigation.

    This is the most reliable approach for
    an actual .vcf contact file.
  */
  window.location.href =
    absoluteUrl;
}


/* =========================================================
   BUSINESS CARD FILE NAME
========================================================= */

function getImageFileName(
  profile
) {

  const path =
    profile.businessCardImage
      .split("/")
      .pop() || "";

  const extensionMatch =
    path.match(
      /\.[a-z0-9]+$/i
    );

  const ext =
    extensionMatch
      ? extensionMatch[0].toLowerCase()
      : ".png";

  return safeFilename(
    profile.name,
    `-business-card${ext}`
  );
}


/* =========================================================
   GENERIC DOWNLOAD BLOB
========================================================= */

function downloadBlob(
  blob,
  filename
) {

  const url =
    URL.createObjectURL(
      blob
    );

  const a =
    document.createElement(
      "a"
    );

  a.href =
    url;

  a.download =
    filename;

  a.rel =
    "noopener";

  document.body.appendChild(
    a
  );

  a.click();

  a.remove();

  setTimeout(
    () => {
      URL.revokeObjectURL(
        url
      );
    },
    3000
  );
}


/* =========================================================
   BUSINESS CARD DOWNLOAD
========================================================= */

async function downloadExistingBusinessCard() {

  if (
    !businessProfile.businessCardImage
  ) {
    return;
  }

  try {

    const response =
      await fetch(
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

    const blob =
      await response.blob();

    downloadBlob(
      blob,
      getImageFileName(
        businessProfile
      )
    );

    showToast(
      "Business card image downloaded."
    );

  } catch {

    const a =
      document.createElement(
        "a"
      );

    a.href =
      businessProfile.businessCardImage;

    a.download =
      getImageFileName(
        businessProfile
      );

    a.target =
      "_blank";

    a.rel =
      "noopener";

    document.body.appendChild(
      a
    );

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

    const response =
      await fetch(
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

    const blob =
      await response.blob();

    const file =
      new File(
        [blob],
        getImageFileName(
          businessProfile
        ),
        {
          type:
            blob.type ||
            "image/png"
        }
      );


    if (
      navigator.canShare &&
      navigator.canShare({
        files: [file]
      })
    ) {

      await navigator.share({

        title:
          `${businessProfile.name} - Business Card`,

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


    if (
      navigator.share
    ) {

      await navigator.share({

        title:
          `${businessProfile.name} - Business Card`,

        text:
          `${businessProfile.name}` +
          (
            businessProfile.company
              ? ` - ${businessProfile.company}`
              : ""
          ),

        url:
          window.location.href
      });

      return;
    }


    await downloadExistingBusinessCard();

  } catch (error) {

    if (
      error?.name ===
      "AbortError"
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

    if (
      navigator.share
    ) {

      await navigator.share(
        data
      );

      return;
    }


    if (
      navigator.clipboard
    ) {

      await navigator.clipboard.writeText(
        window.location.href
      );

      showToast(
        "Profile link copied."
      );

      return;
    }


    showToast(
      "Could not share the profile."
    );

  } catch (error) {

    if (
      error?.name !==
      "AbortError"
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

function showToast(
  message
) {

  const toast =
    $("#toast");

  if (!toast) {
    return;
  }

  toast.textContent =
    message;

  toast.classList.add(
    "show"
  );

  clearTimeout(
    showToast.timer
  );

  showToast.timer =
    setTimeout(
      () => {

        toast.classList.remove(
          "show"
        );

      },
      3000
    );
}


/* =========================================================
   COPY TEXT
========================================================= */

async function copyText(
  value
) {

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
   SETUP INTERACTIONS
========================================================= */

function setupInteractions() {


  /* -----------------------------------------
     Save Contact
  ----------------------------------------- */

  const saveContactButton =
    $("#saveContactButton");

  const mobileSaveContact =
    $("#mobileSaveContact");


  if (
    saveContactButton
  ) {

    saveContactButton.addEventListener(
      "click",
      function (event) {

        event.preventDefault();
        event.stopPropagation();

        saveContact();
      }
    );
  }


  if (
    mobileSaveContact
  ) {

    mobileSaveContact.addEventListener(
      "click",
      function (event) {

        event.preventDefault();
        event.stopPropagation();

        saveContact();
      }
    );
  }


  /* -----------------------------------------
     Business Card Download
  ----------------------------------------- */

  const downloadCardButton =
    $("#downloadCardButton");

  if (
    downloadCardButton
  ) {

    downloadCardButton.addEventListener(
      "click",
      function (event) {

        event.preventDefault();

        downloadExistingBusinessCard();
      }
    );
  }


  /* -----------------------------------------
     Business Card Share
  ----------------------------------------- */

  const shareCardButton =
    $("#shareCardButton");

  if (
    shareCardButton
  ) {

    shareCardButton.addEventListener(
      "click",
      function (event) {

        event.preventDefault();

        shareExistingBusinessCard();
      }
    );
  }


  /* -----------------------------------------
     Profile Share
  ----------------------------------------- */

  const shareProfileButton =
    $("#shareProfileButton");

  if (
    shareProfileButton
  ) {

    shareProfileButton.addEventListener(
      "click",
      function (event) {

        event.preventDefault();

        shareProfile();
      }
    );
  }


  /* -----------------------------------------
     Copy Buttons
  ----------------------------------------- */

  document
    .querySelectorAll(
      "[data-copy-target]"
    )
    .forEach(
      (btn) => {

        btn.addEventListener(
          "click",
          async function (event) {

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
      }
    );


  /* -----------------------------------------
     Read More
  ----------------------------------------- */

  const aboutCard =
    document.querySelector(
      ".about-card"
    );

  const readMore =
    $("#readMoreButton");


  if (
    aboutCard &&
    readMore
  ) {

    requestAnimationFrame(
      () => {

        const p =
          $("#description");

        if (
          p &&
          p.scrollHeight >
            p.clientHeight + 8
        ) {

          readMore.hidden =
            false;
        }
      }
    );


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
}


/* =========================================================
   INITIALIZE
========================================================= */

renderProfile(
  businessProfile
);

setupInteractions();