CRCC '26 SOCIAL CARD GENERATOR
================================

CONTENTS
- index.html: responsive website interface
- styles: included in index.html
- app.js: photo processing, preview, PNG download and sharing
- official-crcc-convention-flyer.jpg: supplied original flyer asset

RUN LOCALLY
1. Extract the ZIP file.
2. Keep all four files in the same folder.
3. Open index.html in a modern browser (Chrome, Safari, Edge or Firefox).
4. Upload a photo to preview, download or share the card.

PUBLISH FREE WITH GITHUB PAGES
1. Create/sign in to a free GitHub account.
2. Create a new PUBLIC repository, e.g. crcc-26-card-generator.
3. Upload every file from this folder (not the ZIP itself) to the repository root.
4. Open repository Settings -> Pages.
5. Under Build and deployment, choose Deploy from a branch.
6. Select branch 'main' and folder '/ (root)', then Save.
7. Wait for GitHub Pages to publish. The public URL will appear in Settings -> Pages.
8. Share that one URL with everyone. Visitors do not need GitHub accounts.

ALTERNATIVE: NETLIFY DROP
1. Open https://app.netlify.com/drop
2. Sign in/create a free account if prompted.
3. Drag the extracted folder onto the page.
4. Netlify publishes it and provides a public URL you can share.

PRIVACY / TECHNICAL NOTES
- Photos are read locally by the visitor's browser using a temporary object URL.
- No photo is sent to a server, uploaded, or stored by this website.
- No login, database, API key, paid API or third-party JavaScript library is used.
- PNG output is 1080 x 1350 pixels (4:5 portrait).
- Direct image sharing depends on browser/device support. Download is available as a fallback.
- Keep official-crcc-convention-flyer.jpg in the same folder as index.html.

DESIGN IMPLEMENTATION NOTE
The original supplied flyer is used as the official artwork/background, preserving its CRCC logo/crown, event title, RHEMA theme, minister photographs and event details. A gold-framed personal portrait and attendance announcement are layered into the open upper-left cloud area. The participant's name is never requested or displayed.
