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

  /*
    Existing visiting-card image.
    This is used only for the business-card
    download/share feature.
  */
  businessCardImage:
    "assets/business-cards/business_card.png",

  /*
    This property is kept in your profile data
    but is NOT fetched during Save Contact.

    This is intentional.

    Fetching the image can introduce an asynchronous
    operation that interferes with mobile browser
    user-gesture restrictions.
  */
  vcardPhoto:
    "assets/profile/business_card.jpg"
};


/* =========================================================
   BASIC HELPER
========================================================= */

const $ = (selector) => {
  try {
    return document.querySelector(selector);
  } catch {
    return null;
  }
};


/* =========================================================
   SAFE TEXT
========================================================= */

function setText(selector, value) {
  const el = $(selector);

  if (el) {
    el.textContent = value || "";
  }
}


/* =========================================================
   HIDE ELEMENT
========================================================= */

function hideIfEmpty(id, value) {
  const el =
    document.getElementById(id);

  if (!el) {
    return;
  }

  el.hidden = !value;
}


/* =========================================================
   PHONE
========================================================= */

function digitsOnly(value) {
  return String(value || "")
    .replace(/[^\d+]/g, "");
}


/* =========================================================
   WHATSAPP NUMBER
========================================================= */

function whatsappNumber(value) {
  return String(value || "")
    .replace(/\D/g, "");
}


/* =========================================================
   MAPS
========================================================= */

function mapsUrl(profile) {
  if (profile.address) {
    return "https://maps.app.goo.gl/oAwfcawXmEtwf24k6";
  }

  return "";
}


/* =========================================================
   SAFE FILE NAME
========================================================= */

function safeFilename(name, suffix) {
  const base = String(
    name || "business-profile"
  )
    .normalize("NFKD")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .toLowerCase();

  return (
    `${base || "business-profile"}${suffix}`
  );
}


/* =========================================================
   SOCIAL ENTRIES
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
    (item) => item.url
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
            `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600">
              <rect width="100%" height="100%" fill="#202630"/>
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
     Phone links
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

  const waUrl = wa
    ? `https://wa.me/${wa}?text=${encodeURIComponent(
        profile.whatsappMessage || ""
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
     Dynamic sections
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
     Meta description
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

  if (!section || !grid) {
    return;
  }

  grid.innerHTML = "";

  if (!services.length) {
    section.hidden = true;
    return;
  }

  section.hidden = false;

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
          ${String(index + 1).padStart(2, "0")}
        </span>

        <span class="service-name"></span>
      `;

      const name =
        item.querySelector(
          ".service-name"
        );

      if (name) {
        name.textContent =
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

function renderSocials(profile) {

  const section =
    $("#socialSection");

  const grid =
    $("#socialGrid");

  if (!section || !grid) {
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

  section.hidden = false;

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

      item.href = url;

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

      const socialName =
        item.querySelector(
          ".social-name"
        );

      if (socialName) {
        socialName.textContent =
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

  if (!profile.businessCardImage) {

    section.hidden = true;

    return;
  }

  section.hidden = false;

  preview.src =
    profile.businessCardImage;

  preview.alt =
    `${profile.name} business visiting card`;

  preview.onerror =
    () => {

      section.hidden = true;

      showToast(
        "Business card image could not be loaded."
      );
    };
}


/* =========================================================
   VCARD ESCAPING
========================================================= */

function escapeVCard(value) {

  return String(
    value || ""
  )

    .replace(
      /\\/g,
      "\\\\"
    )

    .replace(
      /\n/g,
      "\\n"
    )

    .replace(
      /;/g,
      "\\;"
    )

    .replace(
      /,/g,
      "\\,"
    );
}


/* =========================================================
   VCARD LINE FOLDING
========================================================= */

function foldVCardLine(line) {

  const max =
    72;

  const chars =
    Array.from(line);

  const lines =
    [];

  while (
    chars.length > max
  ) {

    lines.push(
      chars
        .splice(
          0,
          max
        )
        .join("")
    );
  }

  if (chars.length) {

    lines.push(
      chars.join("")
    );
  }

  return lines.join(
    "\r\n "
  );
}


/* =========================================================
   SYNCHRONOUS VCARD GENERATION
========================================================= */

/*
  IMPORTANT

  This function must stay synchronous.

  Do NOT add:
    async
    await
    fetch()
    FileReader
    image loading

  to this function.

  It needs to run directly from the
  Save Contact button's click event.
*/

function generateVCard(
  profile
) {

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


  const raw = [

    "BEGIN:VCARD",

    "VERSION:3.0",

    `FN:${escapeVCard(
      profile.name
    )}`,

    `N:${escapeVCard(
      profile.name
    )};;;`,

    profile.company &&
      `ORG:${escapeVCard(
        profile.company
      )}`,

    profile.title &&
      `TITLE:${escapeVCard(
        profile.title
      )}`,

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
      `URL:${escapeVCard(
        profile.website
      )}`,

    profile.description &&
      `NOTE:${escapeVCard(
        profile.description
      )}`,

    ...socialLines,

    "END:VCARD"

  ]
    .filter(Boolean)
    .join("\r\n");


  return raw
    .split("\r\n")
    .map(
      foldVCardLine
    )
    .join("\r\n");
}


/* =========================================================
   VCARD DOWNLOAD
========================================================= */

/*
  This function uses the Blob URL download method.

  It is synchronous and can be called directly
  from a user gesture.
*/

function downloadVCard(
  blob,
  filename
) {

  try {

    const url =
      URL.createObjectURL(
        blob
      );

    const link =
      document.createElement(
        "a"
      );

    link.href =
      url;

    link.download =
      filename;

    link.setAttribute(
      "download",
      filename
    );

    link.style.display =
      "none";

    document.body.appendChild(
      link
    );

    /*
      IMPORTANT:
      Immediate click.
    */
    link.click();

    link.remove();


    /*
      Give mobile browsers enough time
      before releasing the Blob URL.
    */
    setTimeout(
      () => {
        URL.revokeObjectURL(
          url
        );
      },
      10000
    );

    return true;

  } catch (error) {

    console.error(
      "vCard Blob download failed:",
      error
    );

    return false;
  }
}


/* =========================================================
   DATA URL FALLBACK
========================================================= */

/*
  Some mobile browsers don't properly download
  Blob URLs.

  This provides another fallback.

  It is only reached when the normal Blob
  download isn't available.
*/

function openVCardDataUrl(
  vcard
) {

  try {

    const dataUrl =
      "data:text/vcard;charset=utf-8," +
      encodeURIComponent(
        vcard
      );

    const link =
      document.createElement(
        "a"
      );

    link.href =
      dataUrl;

    link.setAttribute(
      "download",
      safeFilename(
        businessProfile.name,
        ".vcf"
      )
    );

    link.target =
      "_blank";

    link.rel =
      "noopener";

    link.style.display =
      "none";

    document.body.appendChild(
      link
    );

    link.click();

    link.remove();

    return true;

  } catch (error) {

    console.error(
      "vCard data URL failed:",
      error
    );

    return false;
  }
}


/* =========================================================
   SAVE CONTACT
========================================================= */

/*
  IMPORTANT:
  This function is intentionally NOT async.

  The browser must see the share/download
  operation as part of the original user's tap.
*/

function saveContact() {

  try {

    /*
      ---------------------------------------------
      1. Generate vCard immediately.
      ---------------------------------------------
    */

    const vcard =
      generateVCard(
        businessProfile
      );


    if (!vcard) {

      showToast(
        "Unable to create contact."
      );

      return;
    }


    /*
      ---------------------------------------------
      2. Create contact file immediately.
      ---------------------------------------------
    */

    const filename =
      safeFilename(
        businessProfile.name,
        ".vcf"
      );


    const blob =
      new Blob(
        [vcard],
        {
          type:
            "text/vcard;charset=utf-8"
        }
      );


    const file =
      new File(
        [blob],
        filename,
        {
          type:
            "text/vcard"
        }
      );


    /*
      ---------------------------------------------
      3. Try native mobile sharing.
      ---------------------------------------------

      This is the best option on mobile because
      Android/iOS can hand the .vcf file directly
      to compatible apps.
    */

    if (
      typeof navigator.share ===
        "function"
    ) {

      /*
        Check whether this browser allows
        sharing files.
      */
      let fileSharingSupported =
        false;

      try {

        if (
          typeof navigator.canShare ===
            "function"
        ) {

          fileSharingSupported =
            navigator.canShare({
              files: [file]
            });
        }

      } catch (error) {

        fileSharingSupported =
          false;
      }


      if (
        fileSharingSupported
      ) {

        /*
          VERY IMPORTANT:

          Do NOT use:

            await navigator.share(...)

          here.

          Calling navigator.share() immediately
          keeps it attached to the original
          user interaction.
        */

        navigator
          .share({
            title:
              `${businessProfile.name} Contact`,

            text:
              businessProfile.company
                ? `${businessProfile.name} - ${businessProfile.company}`
                : businessProfile.name,

            files: [file]
          })

          .then(
            () => {

              showToast(
                "Contact sharing opened."
              );
            }
          )

          .catch(
            (error) => {

              /*
                User cancelled.
              */
              if (
                error &&
                error.name ===
                  "AbortError"
              ) {
                return;
              }


              /*
                Native sharing failed.
                Try normal .vcf download.
              */

              const downloaded =
                downloadVCard(
                  blob,
                  filename
                );


              if (
                downloaded
              ) {

                showToast(
                  "Contact file created. Open the .vcf file to save the contact."
                );

                return;
              }


              /*
                Last fallback.
              */

              const opened =
                openVCardDataUrl(
                  vcard
                );


              if (opened) {

                showToast(
                  "Opening contact file..."
                );

              } else {

                showToast(
                  "Your browser blocked the contact file."
                );
              }
            }
          );

        return;
      }
    }


    /*
      ---------------------------------------------
      4. Blob download fallback
      ---------------------------------------------
    */

    const downloaded =
      downloadVCard(
        blob,
        filename
      );


    if (
      downloaded
    ) {

      showToast(
        "Contact file created. Open the .vcf file to save the contact."
      );

      return;
    }


    /*
      ---------------------------------------------
      5. Data URL fallback
      ---------------------------------------------
    */

    const opened =
      openVCardDataUrl(
        vcard
      );


    if (opened) {

      showToast(
        "Opening contact file..."
      );

      return;
    }


    /*
      ---------------------------------------------
      6. Everything failed
      ---------------------------------------------
    */

    showToast(
      "Your browser could not create the contact file."
    );

  } catch (error) {

    console.error(
      "Save Contact Error:",
      error
    );

    showToast(
      "Could not create the contact."
    );
  }
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
   DOWNLOAD EXISTING BUSINESS CARD
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

        /*
          Prevent form submission if the
          button happens to be inside a form.
        */
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


  /* -----------------------------------------
     External Links
  ----------------------------------------- */

  document
    .querySelectorAll("a")
    .forEach(
      (link) => {

        link.addEventListener(
          "click",
          function () {

            if (
              link.href === "#" ||
              !link.href
            ) {
              return;
            }
          }
        );
      }
    );
}


/* =========================================================
   INITIALIZE
========================================================= */

renderProfile(
  businessProfile
);

setupInteractions();