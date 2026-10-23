KITSAMBA WRITES AFRICA — UPDATE KIT
===================================

What this ZIP contains
----------------------
1. founder-profile-section.html
   A founder/CEO profile with your portrait, novels, literary influences, and a
   support invitation for sponsors, mentors, publishers, developers, and partners.

2. founder-profile.css
   Black-and-gold styling intended to fit the existing site.

3. copy-deterrent.js and copy-deterrent.css
   Optional deterrents against casual copying in public preview text.

IMPORTANT STATUS
----------------
This is a PATCH KIT, not a complete copy of the website. It does not contain all
of your existing repository files and has NOT been uploaded to GitHub. Your live
site remains unchanged until these changes are applied to the repository.

HOW TO APPLY THE PROFILE
-----------------------
1. Open your repository:
   https://github.com/KitsambaJoshua/Kitsamba-Writes-Africa
2. Open stakeholders.html and click the pencil (Edit) icon.
3. Open founder-profile-section.html from this ZIP and copy its complete contents.
4. Paste the section after the existing stakeholders-page hero section and before
   the next content section.
5. Open founder-profile.css, copy its contents, and paste them inside the existing
   <style> ... </style> area in stakeholders.html, before </style>.
6. Save the file with Commit changes.
7. Open index.html and remove only the homepage portrait block that contains:
   <div class="hero-photo-area"> ... </div>
   Keep the surrounding hero content and its closing tags. Preview the page after
   editing to ensure the headline still aligns correctly.

HOW TO APPLY THE COPY DETERRENT
-------------------------------
1. Upload copy-deterrent.js and copy-deterrent.css into the repository root.
2. On each public novel-preview page, include the CSS inside its existing style
   area or link the file:
   <link rel="stylesheet" href="copy-deterrent.css">
3. Add this before </body> on those pages:
   <script src="copy-deterrent.js" defer></script>
4. Test that links, navigation, and mobile reading still work.

CRITICAL BOOK-PROTECTION WARNING
-------------------------------
JavaScript and CSS cannot reliably prevent copying. A visitor can still use
screenshots, browser tools, or download public source files. The current novel
pages load chapter text from public raw GitHub HTML files. If full paid chapters
are stored in publicly accessible files, the content is not truly protected.
For meaningful paid access, keep full chapters on a private backend or a
payment/access service that checks the buyer before delivering the text. GitHub
Pages alone cannot securely hide paid book content.

SUPPORT LANGUAGE
----------------
The profile asks for help clearly but respectfully. It does not claim awards,
sales, funding, or achievements that have not been confirmed.
