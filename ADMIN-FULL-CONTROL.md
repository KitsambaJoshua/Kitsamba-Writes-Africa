# Administrator content controls

The website currently uses Firebase project `kitsamba-writes-ug-2026` (see `firebase-config.js`). The administrator membership document and published Firestore rules must be in this same project. A role created in an older Firebase project does not transfer.

## Activate the intended owner

1. In this project's Authentication → Users, locate the owner's website login and verify its email. Copy its UID from this project; do not assume an older project's UID still applies.
2. Using the project-owner Firebase Console, create `siteAdmins/{that UID}` with `enabled` of type **boolean**, value `true`.
3. In this project's Firestore → Rules, merge and publish `firebase-stories.rules`, preserving any unrelated rules already in use. GitHub Pages deployment does not publish Firebase rules.
4. Sign in to the website with that verified account. The admin toolbar and Admin Dashboard profile-menu link appear after a server-verified role check. Readers cannot create or modify role documents from the website.

## Controls

- Books, Poems & Plays: edit existing titles, descriptions, cover paths, public text, section, drafts and publication state; add new writing.
- Add a Story: verified administrators can publish their own writing immediately after confirming. Reader submissions continue to require approval.
- Story Approvals: edit a submission's title, section and text while retaining its author, then approve publication or return it for changes.
- Stakeholders: add and edit profiles, ordering and visibility.
- Homepage: edit the website name and hero message.
- Page Content: edit existing editorial text, image URLs and links on 18 public pages. Publishing saves a `publicPages/{page}` record. Only changed fields are stored; the original HTML remains the fallback.

Page fields are annotated with stable `data-page-field` keys. Keep those attributes when updating HTML. New source fields must also be added to `admin-page-catalog.json` before they are editable. Do not place private text into public page records. These overrides do not remove original material from the public Git repository.

The content editor does not grant Firebase Console, GitHub, user-password, payment-provider or server configuration privileges. Paid content protection and checkout require their own backend. The website does not bypass those systems based on a client-side email or role flag.

## Verification before relying on publishing

1. With a regular reader, confirm that the admin toolbar is absent and admin writes are denied by Firestore.
2. With the verified owner, save a writing draft, refresh and reopen it; publish and verify the public listing.
3. Publish a poem through Add a Story and confirm that it appears without approval. Submit with a reader account and confirm it stays pending.
4. Edit a pending submission; confirm the author is retained, then approve it.
5. Change one page heading with Page Content, publish, and refresh the public page. Reset that field to its original value and publish to remove the override.
6. Sign out and confirm all admin controls disappear.

Authenticated publishing and role activation must be tested against the real Firebase project; source checks alone do not prove those operations work.
