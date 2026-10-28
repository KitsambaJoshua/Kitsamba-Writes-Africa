# Activate the owner’s administrator account

## Current state

The admin interface is at `admin.html`. It is deliberately closed until a server-verified role exists. An ordinary reader, the first person to sign in, and the browser’s local storage cannot grant administrator privileges.

This repository contains the interface and proposed database/storage rules. GitHub publication alone does **not** deploy Firebase rules or activate an administrator. Verify the currently deployed rules before enabling the dashboard; test them in the Firebase emulator or Rules Playground before publishing.

## One-time Firebase configuration

1. Connect the official Firebase plugin to the existing project `kitsamba-writes-africa`, or use that project’s Firebase console as its owner.
2. Identify Joshua’s intended administrator account in Firebase Authentication and confirm its exact UID. Do not infer the account from a display name, the first signed-in user or a public email string.
3. Enable Firestore if it is not enabled. Review existing rules and merge the appropriate blocks from `firebase-stories.rules`. Preserve unrelated collections’ rules. Make sure no broader existing rule grants unrestricted writes to these collections, especially `siteAdmins` and `communityStories`.
4. In the console or a trusted server-side operation, create `siteAdmins/<confirmed-UID>` with the boolean field `enabled: true`. The browser is never allowed to create that role. Revoke it by setting `enabled` to false or deleting this document in the console.
5. If using image uploads, enable Firebase Storage and merge `firebase-admin-storage.rules` into the existing rules. Enable the Firestore cross-service rules permission if prompted. Image URLs to existing repository assets remain supported without Storage uploads.
6. Keep Firebase Authentication’s existing providers and authorised website domain. Sign in at `login.html?next=admin.html`. Once the role is verified, the admin dashboard link also appears on signed-in Login and Settings pages.

## Permissions to verify before activation

- Signed-out readers may read public book/profile snapshots and approved stories, but cannot write anything.
- Ordinary signed-in readers may submit only `pending` stories for their own UID. Editing a previously published story returns it to pending review.
- Ordinary readers cannot approve stories, edit another person’s submissions, write managed catalogue/profile/settings data, or read private managed book drafts.
- Only the protected admin role may approve/reject submissions and save books, people or homepage settings.
- No client may create or change its administrator role.
- Invalid image types and images over 5 MB must be rejected by Storage rules.
- An unpublished book snapshot contains only its ID, a visibility flag and a timestamp; draft text must never appear in public snapshots.

## Content model

`managedBooks` and `managedStakeholders` are private working records. Saving in the dashboard atomically writes the working record and the safe `publicBooks` or `publicStakeholders` snapshot. Existing site content is shown as a starting point in the editor; no seed data is automatically written until the administrator saves it.

The dashboard manages catalogue titles, covers, descriptions, free/public text, stakeholder profiles, and homepage welcome text. Original paid chapters and PayPal checkout remain on their original HTML pages; the public preview field must not be used for paid or confidential chapters. Newly saved draft text is private. Existing static text already present in the public repository/HTML is still public even if its catalogue card is hidden; removing previously published static material requires a source edit.

## End-to-end acceptance test

Use a disposable test account and test content approved by the owner. Verify a non-admin cannot open dashboard data or approve a story. Submit a poem as a reader: it must not appear publicly until an admin approves it. Verify it appears on another device after approval. Return it for changes and verify it disappears. Verify draft book text is not present in `publicBooks`; publish the preview, then unpublish it. Add and hide a stakeholder; verify public ordering. Sign out and verify the dashboard immediately closes. Remove test data afterwards through an authorised account.

No credentials, service-account keys, or admin tokens belong in this repository.
